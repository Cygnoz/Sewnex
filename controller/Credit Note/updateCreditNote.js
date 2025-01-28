
const mongoose = require('mongoose');
const CreditNote = require('../../database/model/creditNote');
const Invoice = require('../../database/model/salesInvoice');
const TrialBalance = require("../../database/model/trialBalance");
const ItemTrack = require("../../database/model/itemTrack");
const { dataExist, validation, calculation, accounts } = require("../Credit Note/creditNoteController");
const { cleanData } = require("../../services/cleanData");




// Update Credit Note 
exports.updateCreditNote = async (req, res) => {
    console.log("Update credit note:", req.body);
  
    try {
      const { organizationId } = req.user;
      const { creditId } = req.params;   
      
      // Fetch existing credit note
      const existingCreditNote = await getExistingCreditNote(creditId, organizationId);

      const existingCreditNoteItems = existingCreditNote.items;      

      // Clean input data
      const cleanedData = cleanData(req.body);

      const { items, customerId, invoiceId } = cleanedData;

      const itemIds = items.map(item => item.itemId);

      // Fetch the latest credit note for the given customerId and organizationId
      await getLatestCreditNote(creditId, organizationId, customerId, invoiceId, itemIds, res);
    
      // Validate _id's
      const validateAllIds = validateIds({
        customerId,
        invoiceId,
        itemIds,
        cleanedData,
        existingCreditNote
      });
      if (validateAllIds) {
        return res.status(400).json({ message: validateAllIds });
      }

      // Fetch related data
      const { organizationExists, customerExist, invoiceExist, defaultAccount, customerAccount } = await dataExist.dataExist( organizationId, customerId, invoiceId );  
      
      //Data Exist Validation
      if (!validation.validateOrganizationTaxCurrency( organizationExists, customerExist, invoiceExist, res )) return;

      const { itemTable } = await dataExist.itemDataExists( organizationId, items );

      const validationData = {cleanedData, customerExist, invoiceExist, items, itemTable, organizationExists, existingCreditNoteItems};

      // Validate Inputs
      if (!validateInputs(validationData, res)) return;
  
      // Tax Type 
      calculation.taxType(cleanedData, customerExist, organizationExists);

      //Default Account
      const { defAcc, paidThroughAccount, error } = await accounts.defaultAccounting( cleanedData, defaultAccount, organizationExists );
      if (error) { 
        res.status(400).json({ message: error }); 
        return false; 
      }
  
      // Calculate Credit Note
      if (!calculation.calculateCreditNote(cleanedData, res)) return;

      //Sales Journal      
      if (!accounts.salesJournal( cleanedData, res )) return; 

      const mongooseDocument = CreditNote.hydrate(existingCreditNote);
      Object.assign(mongooseDocument, cleanedData);
      const savedCreditNote = await mongooseDocument.save();
      if (!savedCreditNote) {
        return res.status(500).json({ message: "Failed to update credit note" });
      }

      //Journal
      await journal( savedCreditNote, defAcc, customerAccount, paidThroughAccount );
      
      //Item Track
      await itemTrack( savedCreditNote, itemTable, organizationId, creditId );

      // Update Sales Invoice
      await updateSalesInvoiceWithCreditNote(invoiceId, items, organizationId, customerId, creditId);
  
      res.status(200).json({ message: "Credit note updated successfully", savedCreditNote });
      // console.log("Credit Note updated successfully:", savedCreditNote);  
    } catch (error) {
      console.error("Error updating credit note:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };






  // Get Existing Credit Note
async function getExistingCreditNote(creditId, organizationId) {
  const existingCreditNote = await CreditNote.findOne({ _id: creditId, organizationId });
  if (!existingCreditNote) {
      console.log("Credit note not found with ID:", creditId);
      return res.status(404).json({ message: "Credit note not found" });
  }
  return existingCreditNote;
}




// Get Latest Credit Note
async function getLatestCreditNote(creditId, organizationId, customerId, invoiceId, itemIds, res) {
  const latestCreditNote = await CreditNote.findOne({ 
      organizationId, 
      customerId,
      invoiceId, 
      "items.itemId": { $in: itemIds },
  }).sort({ createdDateTime: -1 }); // Sort by createdDateTime in descending order

  if (!latestCreditNote) {
      console.log("No credit note found for this customer.");
      return res.status(404).json({ message: "No credit note found for this customer." });
  }

  // Check if the provided creditId matches the latest one
  if (latestCreditNote._id.toString() !== creditId) {
    return res.status(400).json({
      message: "Only the latest credit note can be edited."
    });
  }

  return latestCreditNote;
}





  function validateIds({ customerId, invoiceId, itemIds, cleanedData, existingCreditNote }) {
    // Validate Customer ID
    if (!mongoose.Types.ObjectId.isValid(customerId) || customerId.length !== 24) {
      return `Invalid Customer ID: ${customerId}`;
    }
  
    // Validate Invoice ID
    if (!mongoose.Types.ObjectId.isValid(invoiceId) || invoiceId.length !== 24) {
      return res.status(400).json({ message: `Invalid Invoice ID: ${invoiceId}` });
    }
  
    // Validate Item IDs
    const invalidItemIds = itemIds.filter(itemId => !mongoose.Types.ObjectId.isValid(itemId) || itemId.length !== 24);
    if (invalidItemIds.length > 0) {
      return `Invalid item IDs: ${invalidItemIds.join(', ')}`;
    }
  
    // Check for duplicate Item IDs
    const uniqueItemIds = new Set(itemIds);
    if (uniqueItemIds.size !== itemIds.length) {
      return "Duplicate Item found in the list.";
    }

    // Ensure `creditNote` field matches the existing order
    if (cleanedData.creditNote !== existingCreditNote.creditNote) {
      return res.status(400).json({
        message: `The provided creditNote does not match the existing record. Expected: ${existingCreditNote.creditNote}`,
      });
    }
  
    // Return null if all validations pass
    return null;
  }







  const updateSalesInvoiceWithCreditNote = async (invoiceId, items, organizationId, customerId, creditId) => {
    try {
      for (const item of items) {
        // Step 1: Fetch all credit notes matching the organizationId, customerId, invoiceId, and itemId,
        // excluding the current creditId
        const matchingCreditNotes = await CreditNote.find({
          organizationId,
          customerId,
          invoiceId,
          "items.itemId": item.itemId,
          _id: { $ne: creditId }, // Exclude the current creditId
        });
  
        // Step 2: Calculate the total quantity from the matched credit notes
        let previousReturnQuantity = 0;
        for (const creditNote of matchingCreditNotes) {
          const matchedItem = creditNote.items.find(i => i.itemId.toString() === item.itemId.toString());
          if (matchedItem) {
            previousReturnQuantity += matchedItem.quantity; // Sum up quantities
          }
        }
  
        // Step 3: Add the quantity of the item being updated to the previous return quantity
        const newReturnQuantity = previousReturnQuantity + item.quantity;
  
        // Step 4: Update the returnQuantity in the sales invoice
        await Invoice.findOneAndUpdate(
          { _id: invoiceId, 'items.itemId': item.itemId },
          {
            $set: { 'items.$.returnQuantity': newReturnQuantity },
          }
        );
      }
    } catch (error) {
      console.error("Error updating salesInvoice with returnQuantity:", error);
      throw new Error("Failed to update Sales Invoice with Credit Note details.");
    }
  };
  








//Validate inputs
function validateInputs( validationData, res) {

  const validationErrors = validateCreditNoteData(validationData);  

  if (validationErrors.length > 0) {
    res.status(400).json({ message: validationErrors.join(", ") });
    return false;
  }
  return true;
}

//Validate Data
function validateCreditNoteData({ cleanedData, customerExist, invoiceExist, items, itemTable, organizationExists, existingCreditNoteItems }) {
  
  const errors = [];

  //Basic Info
  validateReqFields( cleanedData, customerExist, errors );
  validateItemTable(items, itemTable, errors);
  validateInvoiceData(cleanedData, items, invoiceExist, existingCreditNoteItems, errors);

  //OtherDetails
  validateIntegerFields(['totalItem'], cleanedData, errors);
  validateFloatFields(['subTotal','cgst','sgst','igst','vat','totalTax','totalAmount'], cleanedData, errors);
  //validateAlphabetsFields(['department', 'designation'], cleanedData, errors);

  //Tax Details
  //validateTaxType(cleanedData.taxType, validTaxTypes, errors);
  validatePlaceOfSupply(cleanedData.placeOfSupply, organizationExists, errors);
  validateInvoiceType(cleanedData.invoiceType, errors);
  validatePaymentMode(cleanedData.paymentMode, errors);
  //validateGSTorVAT(cleanedData, errors);

  return errors;
}



// Field validation utility
function validateField(condition, errorMsg, errors) {
  if (condition) errors.push(errorMsg);
}


//Valid Req Fields
function validateReqFields( data, customerExist, errors ) {
  validateField( typeof data.customerId === 'undefined' , "Please select a customer", errors  );
  validateField( customerExist.taxType == 'GST' && typeof data.placeOfSupply === 'undefined', "Place of supply is required", errors  );
  
  validateField( typeof data.items === 'undefined', "Select an item", errors  );
  validateField( Array.isArray(data.items) && data.items.length === 0, "Select an item", errors );
  
  validateField( data.invoiceNumber === 'undefined', "Select an invoice number", errors  );
  validateField( typeof data.paymentMode === 'undefined', "Select payment mode", errors  );
  validateField( data.paymentMode === 'Cash' && typeof data.totalAmount === 'undefined', "Enter the amount paid", errors  );
  validateField( data.paymentMode === 'Cash' && typeof data.paidThroughAccountId === 'undefined', "Select an paid through account", errors  );  
}


// Function to Validate Item Table 
function validateItemTable(items, itemTable, errors) {
  // Check for item count mismatch
  validateField( items.length !== itemTable.length, "Mismatch in item count between request and database.", errors  );
  
  // Iterate through each item to validate individual fields
  items.forEach((item) => {
    const fetchedItem = itemTable.find(it => it._id.toString() === item.itemId);


    validateField( fetchedItem.returnableItem !== true, "Non-returnable items found. Credit note can only be added for returnable items.", errors );
  
    // Check if item exists in the item table
    validateField( !fetchedItem, `Item with ID ${item.itemId} was not found.`, errors );
    if (!fetchedItem) return; 
  
    // Validate CGST
    validateField( item.cgst !== fetchedItem.cgst, `CGST Mismatch for ${item.itemName}: ${item.cgst}`, errors );
  
    // Validate SGST
    validateField( item.sgst !== fetchedItem.sgst, `SGST Mismatch for ${item.itemName}: ${item.sgst}`, errors );
  
    // Validate IGST
    validateField( item.igst !== fetchedItem.igst, `IGST Mismatch for ${item.itemName}: ${item.igst}`, errors );
  
    // Validate tax preference
    validateField( item.taxPreference !== fetchedItem.taxPreference, `Tax Preference mismatch for ${item.itemName}: ${item.taxPreference}`, errors );
  
    // Validate integer fields
    validateIntegerFields(['itemQuantity'], item, errors);
    
    // Validate float fields
    validateFloatFields(['sellingPrice', 'itemTotalTax', 'itemAmount'], item, errors);
  });
  }



  // validate invoice data
function validateInvoiceData(data, items, invoiceExist, existingCreditNoteItems, errors) {  

  // const existingItem = existingCreditNoteItems[0].stock;
  
  // Validate basic fields
  // validateField( invoiceExist.salesInvoiceDate !== data.invoiceDate, `Invoice Date mismatch for ${invoiceExist.salesInvoiceDate}`, errors  );
  // validateField( invoiceExist.salesOrderNumber !== data.orderNumber, `Order Number mismatch for ${invoiceExist.salesOrderNumber}`, errors  );
  // validateField( invoiceExist.salesInvoice !== data.invoiceNumber, `Order Number mismatch for ${invoiceExist.salesInvoice}`, errors  );


  // Validate only the items included in the credit note
  items.forEach(CNItem => {
    const invoiceItem = invoiceExist.items.find((item) => item.itemId.toString() === CNItem.itemId);

    if (!invoiceItem) {
      errors.push(`Item ID ${CNItem.itemId} not found in the invoice.`); 
    } else {
      validateField(CNItem.sellingPrice !== invoiceItem.sellingPrice, 
                    `Item selling price mismatch for ${invoiceItem.itemId}: Expected ${invoiceItem.sellingPrice}, got ${CNItem.sellingPrice}`, 
                    errors);
      validateField(CNItem.cgst !== invoiceItem.cgst, 
                    `Item CGST mismatch for ${invoiceItem.itemId}: Expected ${invoiceItem.cgst}, got ${CNItem.cgst}`, 
                    errors);
      validateField(CNItem.sgst !== invoiceItem.sgst, 
                    `Item SGST mismatch for ${invoiceItem.itemId}: Expected ${invoiceItem.sgst}, got ${CNItem.sgst}`, 
                    errors);
      validateField(CNItem.igst !== invoiceItem.igst, 
                    `Item IGST mismatch for ${invoiceItem.itemId}: Expected ${invoiceItem.igst}, got ${CNItem.igst}`, 
                    errors);     
      // validateField(CNItem.stock !== invoiceItem.quantity, 
      //               `Stock mismatch for ${invoiceItem.itemId}: Expected ${invoiceItem.quantity}, got ${CNItem.stock}`, 
      //               errors);
      validateField(CNItem.quantity > invoiceItem.quantity, 
                    `Provided quantity (${CNItem.quantity}) cannot exceed invoice quantity (${invoiceItem.quantity}).`, 
                    errors);
      validateField(CNItem.quantity <= 0, 
                    `Quantity must be greater than 0 for item ${CNItem.itemId}.`, 
                    errors);
      validateField(CNItem.quantity > CNItem.stock, 
                    `Provided quantity (${CNItem.quantity}) cannot exceed stock available (${CNItem.stock}) for item ${CNItem.itemId}.`, 
                    errors);
    }
  });

}



// Validate Place Of Supply
function validatePlaceOfSupply(placeOfSupply, organization, errors) {
  validateField(
    placeOfSupply && !validation.validCountries[organization.organizationCountry]?.includes(placeOfSupply),
    "Invalid Place of Supply: " + placeOfSupply, errors );
}

// Validate Invoice Type
function validateInvoiceType(invoiceType, errors) {
  validateField(
    invoiceType && !validation.validInvoiceType.includes(invoiceType),
    "Invalid Invoice Type: " + invoiceType, errors );
}


// Validate Payment Mode
function validatePaymentMode(paymentMode, errors) {
  validateField(
    paymentMode && !validation.validPaymentMode.includes(paymentMode),
    "Invalid Payment Mode: " + paymentMode, errors );
}



//Valid Alphanumeric Fields
function validateAlphanumericFields(fields, data, errors) {
  fields.forEach((field) => {
    validateField(data[field] && !isAlphanumeric(data[field]), "Invalid " + field + ": " + data[field], errors);
  });
}
// Validate Integer Fields
function validateIntegerFields(fields, data, errors) {
fields.forEach(field => {
  validateField(data[field] && !isInteger(data[field]), `Invalid ${field}: ${data[field]}`, errors);
});
}
//Valid Float Fields  
function validateFloatFields(fields, data, errors) {
  fields.forEach((balance) => {
    validateField(data[balance] && !isFloat(data[balance]),
      "Invalid " + balance.replace(/([A-Z])/g, " $1") + ": " + data[balance], errors);
  });
}
//Valid Alphabets Fields 
function validateAlphabetsFields(fields, data, errors) {
  fields.forEach((field) => {
    if (data[field] !== undefined) {
      validateField(!isAlphabets(data[field]),
        field.charAt(0).toUpperCase() + field.slice(1) + " should contain only alphabets.", errors);
    }
  });
}



// Helper functions to handle formatting
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
  }
  
  function formatCamelCase(word) {
  return word.replace(/([A-Z])/g, " $1");
  }
  
  // Validation helpers
  function isAlphabets(value) {
  return /^[A-Za-z\s]+$/.test(value);
  }
  
  function isFloat(value) {
  return /^-?\d+(\.\d+)?$/.test(value);
  }
  
  function isInteger(value) {
  return /^\d+$/.test(value);
  }
  
  function isAlphanumeric(value) {
  return /^[A-Za-z0-9]+$/.test(value);
  }
  
  function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }














  

  // Item Track Function
  async function itemTrack( savedCreditNote, itemTable, organizationId, creditId ) {

    // Fetch existing itemTrack entries
    const existingItemTracks = await ItemTrack.find({ organizationId, operationId: creditId });
    
    const createdDateTime = existingItemTracks[0] ? existingItemTracks[0].createdDateTime : null; 

    const { items } = savedCreditNote;
  
    for (const item of items) {
      const matchingItem = itemTable.find((entry) => 
        entry._id.toString() === item.itemId.toString() 
      );
  
      if (!matchingItem) {
        console.error(`Item with ID ${item.itemId} not found in itemTable`);
        continue; 
      }
  
      // Calculate the new stock level after the purchase
      // const newStock = matchingItem.currentStock + item.quantity;
  
  
      // Create a new entry for item tracking
      const newTrialEntry = new ItemTrack({
        organizationId: savedCreditNote.organizationId,
        operationId: savedCreditNote._id,
        transactionId: savedCreditNote.creditNote,
        action: "Credit Note",
        itemId: matchingItem._id,
        sellingPrice: matchingItem.sellingPrice || 0,
        costPrice: matchingItem.costPrice || 0, 
        debitQuantity: item.quantity, 
        createdDateTime: createdDateTime // Preserve the original createdDateTime
      });  

      await newTrialEntry.save();

      // Delete existing itemTrack entries for the operation
      if (existingItemTracks.length > 0) {
        await ItemTrack.deleteMany({ organizationId, operationId: creditId });
        console.log(`Deleted existing itemTrack entries for operationId: ${creditId}`);
      }
  
    }
  }











  async function journal( savedCreditNote, defAcc, customerAccount, paidThroughAccount ) {  

    // Fetch existing TrialBalance's createdDateTime
    const existingTrialBalance = await TrialBalance.findOne({
      organizationId: savedCreditNote.organizationId,
      operationId: savedCreditNote._id,
    });  

    const createdDateTime = existingTrialBalance ? existingTrialBalance.createdDateTime : null;

    // If there are existing entries, delete them
    if (existingTrialBalance) {
      await TrialBalance.deleteMany({
        organizationId: savedCreditNote.organizationId,
        operationId: savedCreditNote._id,
      });
      console.log(`Deleted existing TrialBalance entries for operationId: ${savedCreditNote._id}`);
    }

    const cgst = {
      organizationId: savedCreditNote.organizationId,
      operationId: savedCreditNote._id,
      transactionId: savedCreditNote.creditNote,
      date: savedCreditNote.createdDate,
      accountId: defAcc.outputCgst || undefined,
      action: "Sales Return",
      debitAmount: savedCreditNote.cgst || 0,
      creditAmount:  0,
      remark: savedCreditNote.note,
    };
    const sgst = {
      organizationId: savedCreditNote.organizationId,
      operationId: savedCreditNote._id,
      transactionId: savedCreditNote.creditNote,
      date: savedCreditNote.createdDate,
      accountId: defAcc.outputSgst || undefined,
      action: "Sales Return",
      debitAmount: savedCreditNote.sgst || 0,
      creditAmount: 0,
      remark: savedCreditNote.note,
    };
    const igst = {
      organizationId: savedCreditNote.organizationId,
      operationId: savedCreditNote._id,
      transactionId: savedCreditNote.creditNote,
      date: savedCreditNote.createdDate,
      accountId: defAcc.outputIgst || undefined,
      action: "Sales Return",
      debitAmount: savedCreditNote.igst || 0,
      creditAmount: 0,
      remark: savedCreditNote.note,
    };
    const vat = {
      organizationId: savedCreditNote.organizationId,
      operationId: savedCreditNote._id,
      transactionId: savedCreditNote.creditNote,
      date: savedCreditNote.createdDate,
      accountId: defAcc.outputVat || undefined,
      action: "Sales Return",
      debitAmount: savedCreditNote.vat || 0,
      creditAmount: 0,
      remark: savedCreditNote.note,
    };
    const customerCredit = {
      organizationId: savedCreditNote.organizationId,
      operationId: savedCreditNote._id,
      transactionId: savedCreditNote.creditNote,
      date: savedCreditNote.createdDate,
      accountId: customerAccount._id || undefined,
      action: "Sales Return",
      debitAmount: 0,
      creditAmount: savedCreditNote.totalAmount || 0,
      remark: savedCreditNote.note,
    };
    
    const customerReceived = {
      organizationId: savedCreditNote.organizationId,
      operationId: savedCreditNote._id,
      transactionId: savedCreditNote.creditNote,
      date: savedCreditNote.createdDate,
      accountId: customerAccount._id || undefined,
      action: "Credit Note",
      debitAmount: savedCreditNote.totalAmount || 0,
      creditAmount: 0,
      remark: savedCreditNote.note,
    };
    const paidThroughAccounts = {
      organizationId: savedCreditNote.organizationId,
      operationId: savedCreditNote._id,
      transactionId: savedCreditNote.creditNote,
      date: savedCreditNote.createdDate,
      accountId: paidThroughAccount.paidAccount._id || undefined,
      action: "Credit Note",
      debitAmount: 0,
      creditAmount: savedCreditNote.totalAmount || 0,
      remark: savedCreditNote.note,
    };
  
    let salesTotalDebit = 0;
    let salesTotalCredit = 0;
  
    if (Array.isArray(savedCreditNote.salesJournal)) {
      savedCreditNote.salesJournal.forEach((entry) => {
  
        console.log( "Account Log",entry.accountId, entry.debitAmount, entry.creditAmount );      
  
        salesTotalDebit += entry.debitAmount || 0;
        salesTotalCredit += entry.creditAmount || 0;
  
      });
  
      console.log("Total Debit Amount from saleJournal:", salesTotalDebit);
      console.log("Total Credit Amount from saleJournal:", salesTotalCredit);
    } else {
      console.error("SaleJournal is not an array or is undefined.");
    }
    
  
  
    console.log("cgst", cgst.debitAmount,  cgst.creditAmount);
    console.log("sgst", sgst.debitAmount,  sgst.creditAmount);
    console.log("igst", igst.debitAmount,  igst.creditAmount);
    console.log("vat", vat.debitAmount,  vat.creditAmount);
  
    console.log("customerCredit", customerCredit.debitAmount,  customerCredit.creditAmount);
  
    console.log("customerReceived", customerReceived.debitAmount,  customerReceived.creditAmount);
    console.log("paidThroughAccount", paidThroughAccounts.debitAmount,  paidThroughAccounts.creditAmount);
  
    const  debitAmount = customerCredit.debitAmount + salesTotalDebit + cgst.debitAmount  + sgst.debitAmount + igst.debitAmount +  vat.debitAmount + customerReceived.debitAmount + paidThroughAccounts.debitAmount ;
    const  creditAmount = customerCredit.creditAmount + salesTotalCredit + cgst.creditAmount  + sgst.creditAmount + igst.creditAmount +  vat.creditAmount + customerReceived.creditAmount + paidThroughAccounts.creditAmount ;
  
    console.log("Total Debit Amount: ", debitAmount );
    console.log("Total Credit Amount: ", creditAmount );
  
    // console.log( cgst, sgst, igst, vat, customerCredit, customerReceived, paidThroughAccount );
  
  
    //Sales
      savedCreditNote.salesJournal.forEach((entry) => {
  
        const data = {
          organizationId: savedCreditNote.organizationId,
          operationId: savedCreditNote._id,
          transactionId: savedCreditNote.creditNote,
          date: savedCreditNote.createdDateTime,
          accountId: entry.accountId || undefined,
          action: "Sales Return",
          debitAmount: entry.debitAmount || 0,
          creditAmount: entry.creditAmount || 0,
          remark: savedCreditNote.note,
        };
        
        createTrialEntry( data, createdDateTime )
  
      });
  
      
   
  
  
  
    //Tax
    if(savedCreditNote.cgst){
      createTrialEntry( cgst, createdDateTime )
    }
    if(savedCreditNote.sgst){
      createTrialEntry( sgst, createdDateTime )
    }
    if(savedCreditNote.igst){
      createTrialEntry( igst, createdDateTime )
    }
    if(savedCreditNote.vat){
      createTrialEntry( vat, createdDateTime )
    }
  
    if(savedCreditNote.paymentMode === 'Credit'){
      createTrialEntry( customerCredit, createdDateTime )
    }
   
    
    //Paid
    if(savedCreditNote.paymentMode === 'Cash'){
      createTrialEntry( customerReceived, createdDateTime )
      createTrialEntry( paidThroughAccounts, createdDateTime )
    }
  }
  
  
  
  async function createTrialEntry( data, createdDateTime ) {
    const newTrialEntry = new TrialBalance({
        organizationId:data.organizationId,
        operationId:data.operationId,
        transactionId: data.transactionId,
        date:data.date,
        accountId: data.accountId,
        action: data.action,
        debitAmount: data.debitAmount,
        creditAmount: data.creditAmount,
        remark: data.remark,
        createdDateTime: createdDateTime
  });
  await newTrialEntry.save();
  }