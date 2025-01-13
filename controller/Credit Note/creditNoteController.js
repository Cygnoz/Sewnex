const CreditNote = require('../../database/model/creditNote');
const Organization = require('../../database/model/organization');
const Invoice = require('../../database/model/salesInvoice');
const Customer = require('../../database/model/customer');
const Item = require('../../database/model/item');
const Settings = require("../../database/model/settings");
const ItemTrack = require("../../database/model/itemTrack");
const Prefix = require("../../database/model/prefix");
const DefAcc  = require("../../database/model/defaultAccount");
const Account = require("../../database/model/account");
const TrialBalance = require("../../database/model/trialBalance");


const mongoose = require('mongoose');

const { cleanData } = require("../../services/cleanData");
const { singleCustomDateTime, multiCustomDateTime } = require("../../services/timeConverter");

// Fetch existing data
const dataExist = async ( organizationId, customerId, invoiceId ) => {
    const [organizationExists, customerExist, invoiceExist, settings, existingPrefix, defaultAccount, customerAccount ] = await Promise.all([
      Organization.findOne({ organizationId }, { organizationId: 1, organizationCountry: 1, state: 1 }),
      Customer.findOne({ organizationId , _id:customerId}, { _id: 1, customerDisplayName: 1, taxType: 1 }),
      Invoice.findOne({ organizationId, _id:invoiceId }, { _id: 1, salesInvoice: 1, salesInvoiceDate: 1, salesOrderNumber: 1, customerId: 1, placeOfSupply: 1, items: 1 }),
      Settings.findOne({ organizationId }),
      Prefix.findOne({ organizationId }),
      DefAcc.findOne({ organizationId },{ outputCgst: 1, outputSgst: 1, outputIgst: 1 ,outputVat: 1 }),
      Account.findOne({ organizationId , accountId:customerId },{ _id:1, accountName:1 })
    ]);    
  return { organizationExists, customerExist, invoiceExist, settings, existingPrefix, defaultAccount, customerAccount };
};



// Fetch Acc existing data
const accDataExists = async ( organizationId, paidThroughAccountId ) => {
  const [ paidAccount ] = await Promise.all([
    Account.findOne({ organizationId , _id: paidThroughAccountId, accountHead: "Asset" }, { _id:1, accountName: 1 }),
  ]);
  return { paidAccount };};



//Fetch Item Data
const itemDataExists = async (organizationId, items) => {
  // Retrieve items with specified fields
  const itemIds = items.map(item => new mongoose.Types.ObjectId(item.itemId));

  const [newItems] = await Promise.all([
    Item.find({ organizationId, _id: { $in: itemIds } }, { _id: 1, itemName: 1, taxPreference: 1, sellingPrice: 1, costPrice: 1, returnableItem: 1,  taxRate: 1, cgst: 1, sgst: 1, igst: 1, vat: 1 }),
  ]);

  // Aggregate ItemTrack to get the latest entry for each itemId
  const itemTracks = await ItemTrack.aggregate([
    { $match: { itemId: { $in: itemIds } } },
    { $sort: { _id: -1 } },
    { $group: { _id: "$itemId", lastEntry: { $first: "$$ROOT" } } }
  ]);

  // Map itemTracks by itemId for easier lookup
  const itemTrackMap = itemTracks.reduce((acc, itemTrack) => {
    acc[itemTrack._id] = itemTrack.lastEntry;
    return acc;
  }, {});

  // Attach the last entry from ItemTrack to each item in newItems
  const itemTable = newItems.map(item => ({
    ...item._doc,
    currentStock: itemTrackMap[item._id.toString()]?.currentStock || null
  }));

  return { itemTable };
};


const creditDataExist = async ( organizationId, creditId ) => {    
  const [organizationExists, allCreditNote, creditNote ] = await Promise.all([
    Organization.findOne({ organizationId }, { organizationId: 1}),
    CreditNote.find({ organizationId }),
    CreditNote.findOne({ organizationId , _id: creditId })
  ]);
  return { organizationExists, allCreditNote, creditNote };
};



// Add credit note
exports.addCreditNote = async (req, res) => {
  console.log("Add credit note:", req.body);
  try {
    const { organizationId, id: userId, userName } = req.user;

    //Clean Data
    const cleanedData = cleanData(req.body);
    cleanedData.items = cleanedData.items?.map(data => cleanData(data)) || [];

    cleanedData.items = cleanedData.items
      ?.map(data => cleanData(data))
      .filter(item => item.itemId !== undefined && item.itemId !== '') || []; 


    const { items, customerId, invoiceId } = cleanedData;    
    const itemIds = items.map(item => item.itemId);
    
    // Check for duplicate itemIds
    const uniqueItemIds = new Set(itemIds);
    if (uniqueItemIds.size !== itemIds.length) {
      return res.status(400).json({ message: "Duplicate Item found" });
    }

    //Validate Customer
    if (!mongoose.Types.ObjectId.isValid(customerId) || customerId.length !== 24) {
      return res.status(400).json({ message: `Invalid supplier ID: ${customerId}` });
    }

    //Validate invoice
    if (!mongoose.Types.ObjectId.isValid(invoiceId) || invoiceId.length !== 24) {
      return res.status(400).json({ message: `Invalid bill ID: ${invoiceId}` });
    }

    // Validate ItemIds
    const invalidItemIds = itemIds.filter(itemId => !mongoose.Types.ObjectId.isValid(itemId) || itemId.length !== 24);
    if (invalidItemIds.length > 0) {
      return res.status(400).json({ message: `Invalid item IDs: ${invalidItemIds.join(', ')}` });
    }   

    const { organizationExists, customerExist, invoiceExist, existingPrefix, defaultAccount, customerAccount } = await dataExist( organizationId, customerId, invoiceId );


    console.log("customerAccount", customerAccount,customerId);
    //Data Exist Validation
    if (!validateOrganizationTaxCurrency( organizationExists, customerExist, invoiceExist, existingPrefix, res )) return;

    const { itemTable } = await itemDataExists( organizationId, items );   
 
    //Validate Inputs  
    if (!validateInputs( cleanedData, customerExist, invoiceExist, items, itemTable, organizationExists, res)) return;


    //Tax Type
    taxType(cleanedData, customerExist, organizationExists );

    //Default Account
    const { defAcc, error } = await defaultAccounting( cleanedData, defaultAccount, organizationExists );
    if (error) { 
      res.status(400).json({ message: error }); 
      return false; 
    }
    
    // Calculate Credit Note 
    if (!calculateCreditNote( cleanedData, res )) return;

    //Sales Journal      
    if (!salesJournal( cleanedData, res )) return; 

    //Prefix
    await creditNotePrefix(cleanedData, existingPrefix );

    const savedCreditNote = await createNewCreditNote(cleanedData, organizationId, userId, userName );

    //Journal
    await journal( savedCreditNote, defAcc, customerAccount );

    //Item Track
    await itemTrack( savedCreditNote, itemTable );

    // Update Sales Invoice
    await updateSalesInvoiceWithCreditNote(invoiceId, items);
      
    res.status(201).json({ message: "Credit Note created successfully",savedCreditNote });
    // console.log( "Credit Note created successfully:", savedCreditNote );
  } catch (error) {
    console.error("Error Creating Credit Note:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}



// Get All Credit Note
exports.getAllCreditNote = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;

    const { organizationExists, allCreditNote } = await creditDataExist(organizationId);

    if (!organizationExists) {
      return res.status(404).json({ message: "Organization not found" });
    }

    if (!allCreditNote.length) {
      return res.status(404).json({ message: "No Debit Note found" });
    }

    // Process and filter credit notes using the helper function
    const updatedCreditNotes = (
      await Promise.all(allCreditNote.map((creditNote) => calculateStock(creditNote)))
    ).filter((creditNote) =>
      creditNote.items.some((item) => item.stock > 0)
    );

    if (!updatedCreditNotes.length) {
      return res.status(404).json({
        message: "No valid Credit Notes with available stock found",
      });
    }

    res.status(200).json(updatedCreditNotes);
  } catch (error) {
    console.error("Error fetching credit note:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


// Get One Credit Note
exports.getOneCreditNote = async (req, res) => {
try {
  const organizationId = req.user.organizationId;
  const creditId = req.params.creditId;

  const { organizationExists, creditNote } = await creditDataExist(organizationId, creditId);

  if (!organizationExists) {
    return res.status(404).json({
      message: "Organization not found",
    });
  }

  if (!creditNote) {
    return res.status(404).json({
      message: "No Debit Note found",
    });
  }

  // Fetch item details associated with the creditNote
  const itemIds = creditNote.items.map(item => item.itemId);

  // Retrieve items including itemImage
  const itemsWithImages = await Item.find(
    { _id: { $in: itemIds }, organizationId },
    { _id: 1, itemName: 1, itemImage: 1 } 
  );

  // Map the items to include item details
  const updatedItems = creditNote.items.map(creditNoteItem => {
    const itemDetails = itemsWithImages.find(item => item._id.toString() === creditNoteItem.itemId.toString());
    return {
      ...creditNoteItem.toObject(),
      itemName: itemDetails ? itemDetails.itemName : null,
      itemImage: itemDetails ? itemDetails.itemImage : null,
    };
  });

  // Attach updated items back to the creditNote
  const updatedCreditNote = {
    ...creditNote.toObject(),
    items: updatedItems,
  };

  updatedCreditNote.organizationId = undefined;

  res.status(200).json(updatedCreditNote);
} catch (error) {
  console.error("Error fetching credit note:", error);
  res.status(500).json({ message: "Internal server error." });
}
};



// Get last credit note prefix
exports.getLastCreditNotePrefix = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;

      // Find all accounts where organizationId matches
      const prefix = await Prefix.findOne({ organizationId:organizationId,'series.status': true });

      if (!prefix) {
          return res.status(404).json({
              message: "No Prefix found for the provided organization ID.",
          });
      }
      
      const series = prefix.series[0];     
      const lastPrefix = series.creditNote + series.creditNoteNum;

      lastPrefix.organizationId = undefined;

      res.status(200).json(lastPrefix);
  } catch (error) {
      console.error("Error fetching accounts:", error);
      res.status(500).json({ message: "Internal server error." });
  }
};

// Credit Note Prefix
function creditNotePrefix( cleanData, existingPrefix ) {
  const activeSeries = existingPrefix.series.find(series => series.status === true);
  if (!activeSeries) {
      return res.status(404).json({ message: "No active series found for the organization." });
  }
  cleanData.creditNote = `${activeSeries.creditNote}${activeSeries.creditNoteNum}`;

  activeSeries.creditNoteNum += 1;

  existingPrefix.save()
}




// Create New Credit Note
function createNewCreditNote( data, organizationId, userId, userName ) {
  const newCreditNote = new CreditNote({ ...data, organizationId, userId, userName });
  return newCreditNote.save();
}






// Validate Organization Customer Invoice Prefix
function validateOrganizationTaxCurrency( organizationExists, customerExist, invoiceExist, existingPrefix, res ) {
  if (!organizationExists) {
    res.status(404).json({ message: "Organization not found" });
    return false;
  }
  if (!customerExist) {
    res.status(404).json({ message: "Customer not found." });
    return false;
  }
  if (!invoiceExist) {
    res.status(404).json({ message: "Invoice not found" });
    return false;
  }
  if (!existingPrefix) {
    res.status(404).json({ message: "Prefix not found" });
    return false;
  }
  return true;
}



// Tax Type
function taxType( cleanedData, customerExist, organizationExists ) {
  if(customerExist.taxType === 'GST' ){
    if(cleanedData.placeOfSupply === organizationExists.state){
      cleanedData.taxType ='Intra';
    }
    else{
      cleanedData.taxType ='Inter';
    }
  }
  if(customerExist.taxType === 'VAT' ){
    cleanedData.taxType ='VAT';
  }
  if(customerExist.taxType === 'Non-Tax' ){
    cleanedData.taxType ='Non-Tax';
  }  
}


//Default Account
async function defaultAccounting(data, defaultAccount, organizationExists) {
  // 1. Fetch required accounts
  const accounts = await accDataExists(
    organizationExists.organizationId, 
    data.paidThroughAccountId
  );
  
  // 2. Check for missing required accounts
  const errorMessage = getMissingAccountsError(data, defaultAccount, accounts);
  if (errorMessage) {
    return { defAcc: null, error: errorMessage };
  }

  // 3. Update account references
  assignAccountReferences(data, defaultAccount, accounts);
  
  return { defAcc: defaultAccount, error: null };
}

function getMissingAccountsError(data, defaultAccount, accounts) {
  const accountChecks = [
    // Tax account checks
    { condition: data.cgst, account: defaultAccount.outputCgst, message: "CGST Account" },
    { condition: data.sgst, account: defaultAccount.outputSgst, message: "SGST Account" },
    { condition: data.igst, account: defaultAccount.outputIgst, message: "IGST Account" },
    { condition: data.vat, account: defaultAccount.outputVat, message: "VAT Account" },
    
    // Transaction account checks
    { condition: data.paidAmount, account: accounts.paidAccount, message: "Paid Through Account" }
  ];

  const missingAccounts = accountChecks
    .filter(({ condition, account }) => condition && !account)
    .map(({ message }) => `${message} not found`);

  return missingAccounts.length ? missingAccounts.join(". ") : null;
}

function assignAccountReferences(data, defaultAccount, accounts) {
  if (data.paidAmount) {
    defaultAccount.paidThroughAccountId = accounts.paidAccount?._id;
  }
}














function salesJournal(cleanedData, res) {
  const errors = [];
  

  // Utility function to round values to two decimal places
  const roundToTwoDecimals = (value) => Number(value.toFixed(2));

  // Group items by salesAccountId and calculate debit amounts
  const accountEntries = {};


  cleanedData.items.forEach(item => {
          
          const accountId = item.salesAccountId;

          if (!accountId) {

            errors.push({
              message: `Sales Account not found for item ${item.itemName}`,
            });
            return; 
          }
    
          const debitAmount = roundToTwoDecimals(item.sellingPrice * item.quantity);

          if (!accountEntries[accountId]) {
            accountEntries[accountId] = { accountId, debitAmount: 0 };
          }
          // Accumulate the debit amount
          accountEntries[accountId].debitAmount += debitAmount;
  });

  // Push the grouped entries into cleanedData.journal
  cleanedData.salesJournal = Object.values(accountEntries);
    
  // Handle response or further processing
  if (errors.length > 0) {
    res.status(400).json({ success: false, message:"Sales journal error", errors });
    return false;
  }
  return true;
}



























function calculateCreditNote(cleanedData, res) {
  const errors = [];

  let subTotal = 0;
  let totalTax = 0;
  let totalItem = 0;
  let totalAmount = 0;

  // Utility function to round values to two decimal places
  const roundToTwoDecimals = (value) => Number(value.toFixed(2));  

  cleanedData.items.forEach(item => {

    let calculatedCgstAmount = 0;
    let calculatedSgstAmount = 0;
    let calculatedIgstAmount = 0;
    let calculatedVatAmount = 0;
    let calculatedTaxAmount = 0;
    let itemAmount = 0;
    let taxType = cleanedData.taxType;

    totalItem +=  parseInt(item.quantity);
    subTotal += parseFloat(item.quantity * item.sellingPrice);

    let withoutTaxAmount = (item.sellingPrice * item.quantity);

    // Handle tax calculation only for taxable items
    if (item.taxPreference === 'Taxable') {
      switch (taxType) {
        
        case 'Intra':
          calculatedCgstAmount = roundToTwoDecimals((item.cgst / 100) * withoutTaxAmount);
          calculatedSgstAmount = roundToTwoDecimals((item.sgst / 100) * withoutTaxAmount);
        break;

        case 'Inter':
          calculatedIgstAmount = roundToTwoDecimals((item.igst / 100) * withoutTaxAmount);
        break;
        
        case 'VAT':
          calculatedVatAmount = roundToTwoDecimals((item.vat / 100) * withoutTaxAmount);
        break;

      }

      calculatedTaxAmount =  calculatedCgstAmount + calculatedSgstAmount + calculatedIgstAmount + calculatedVatAmount;
      
      // Check tax amounts
      checkAmount(calculatedCgstAmount, item.cgstAmount, item.itemName, 'CGST',errors);
      checkAmount(calculatedSgstAmount, item.sgstAmount, item.itemName, 'SGST',errors);
      checkAmount(calculatedIgstAmount, item.igstAmount, item.itemName, 'IGST',errors);
      checkAmount(calculatedVatAmount, item.vatAmount, item.itemName, 'VAT',errors);
      checkAmount(calculatedTaxAmount, item.itemTotalTax, item.itemName, 'Item tax',errors);

      totalTax += calculatedTaxAmount;     

    } else {
      console.log(`Skipping Tax for Non-Taxable item: ${item.itemName}`);
    }

    itemAmount = (withoutTaxAmount + calculatedTaxAmount);

    checkAmount(itemAmount, item.itemAmount, item.itemName, 'Item Total',errors);

    console.log(`${item.itemName} Item Total: ${itemAmount} , Provided ${item.itemAmount}`);
    console.log(`${item.itemName} Total Tax: ${calculatedTaxAmount} , Provided ${item.itemTotalTax || 0 }`);
    console.log("");
  });

  const total = ((parseFloat(subTotal) + parseFloat(totalTax)));

  console.log(`SubTotal: ${subTotal} , Provided ${cleanedData.subTotal}`);
 
  totalAmount = total; 

  // Round the totals for comparison
  const roundedSubTotal = roundToTwoDecimals(subTotal); 
  const roundedTotalTax = roundToTwoDecimals(totalTax);
  const roundedTotalAmount = roundToTwoDecimals(totalAmount);

  console.log(`Final Sub Total: ${roundedSubTotal} , Provided ${cleanedData.subTotal}` );
  console.log(`Final Total Tax: ${roundedTotalTax} , Provided ${cleanedData.totalTax}` );
  console.log(`Final Total Amount: ${roundedTotalAmount} , Provided ${cleanedData.totalAmount}` );

  validateAmount(roundedSubTotal, cleanedData.subTotal, 'SubTotal', errors);
  validateAmount(roundedTotalTax, cleanedData.totalTax, 'Total Tax Amount', errors);
  validateAmount(roundedTotalAmount, cleanedData.totalAmount, 'Grand Total', errors);
  validateAmount(totalItem, cleanedData.totalItem, 'Total Item count', errors);

  if (errors.length > 0) {
    res.status(400).json({ message: errors.join(", ") });
    return false;
  }

  return true;
}



//Mismatch Check
function checkAmount(calculatedAmount, providedAmount, itemName, taxType, errors) {
  const roundToTwoDecimals = (value) => Number(value.toFixed(2)); // Round to two decimal places
  const roundedAmount = roundToTwoDecimals(calculatedAmount);
  console.log(`Item: ${itemName}, Calculated ${taxType}: ${roundedAmount}, Provided data: ${providedAmount}`);

  if (Math.abs(roundedAmount - providedAmount) > 0.01) {
    const errorMessage = `Mismatch in ${taxType} for item ${itemName}: Calculated ${calculatedAmount}, Provided ${providedAmount}`;
    errors.push(errorMessage);
    console.log(errorMessage);
  }
}


//Final Item Amount check
const validateAmount = ( calculatedValue, cleanedValue, label, errors ) => {
  const isCorrect = calculatedValue === parseFloat(cleanedValue);
  if (!isCorrect) {
    const errorMessage = `${label} is incorrect: ${cleanedValue}`;
    errors.push(errorMessage);
    console.log(errorMessage);
  }
};







//Validate inputs
function validateInputs( data, customerExist, invoiceExist, items, itemExists, organizationExists, res) {

  const validationErrors = validateCreditNoteData(data, customerExist, invoiceExist, items, itemExists, organizationExists);  

  if (validationErrors.length > 0) {
    res.status(400).json({ message: validationErrors.join(", ") });
    return false;
  }
  return true;
}

//Validate Data
function validateCreditNoteData( data, customerExist, invoiceExist, items, itemTable, organizationExists ) {
  
  const errors = [];

  // console.log("Item Request :",items);
  // console.log("Item Fetched :",itemTable);

  //Basic Info
  validateReqFields( data, customerExist, errors );
  validateItemTable(items, itemTable, errors);
  validateInvoiceData(data, items, invoiceExist, errors);

  //OtherDetails
  validateIntegerFields(['totalItem'], data, errors);
  validateFloatFields(['subTotal','cgst','sgst','igst','vat','totalTax','totalAmount'], data, errors);
  //validateAlphabetsFields(['department', 'designation'], data, errors);

  //Tax Details
  //validateTaxType(data.taxType, validTaxTypes, errors);
  validatePlaceOfSupply(data.placeOfSupply, organizationExists, errors);
  validateInvoiceType(data.invoiceType, errors);
  validatePaymentMode(data.paymentMode, errors);
  //validateGSTorVAT(data, errors);

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
  
  validateField( typeof data.invoiceNumber === 'undefined', "Select an invoice number", errors  );
  validateField( typeof data.invoiceType === 'undefined', "Select an invoice type", errors  );
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
  
    // Validate item name
    // validateField( item.itemName !== fetchedItem.itemName, `Item Name Mismatch : ${item.itemName}`, errors );
  
    // Validate selling price
    // validateField( item.sellingPrice !== fetchedItem.sellingPrice, `Cost price Mismatch for ${item.itemName}:  ${item.sellingPrice}`, errors );
  
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
function validateInvoiceData(data, items, invoiceExist, errors) {  
  // console.log("data:", data);
  // console.log("invoiceExist:", invoiceExist);
  // console.log("items:", items);

   // Initialize `invoiceExist.items` to an empty array if undefined
  //  invoiceExist.items = Array.isArray(invoiceExist.items) ? invoiceExist.items : [];
      //  console.log("invoiceExist.items......",invoiceExist.items);


  // Validate basic fields
  validateField( invoiceExist.salesInvoiceDate !== data.invoiceDate, `Invoice Date mismatch for ${invoiceExist.salesInvoiceDate}`, errors  );
  validateField( invoiceExist.salesOrderNumber !== data.orderNumber, `Order Number mismatch for ${invoiceExist.salesOrderNumber}`, errors  );
  validateField( invoiceExist.salesInvoice !== data.invoiceNumber, `Order Number mismatch for ${invoiceExist.salesInvoice}`, errors  );


  // Validate only the items included in the credit note
  items.forEach(CNItem => {
    const invoiceItem = invoiceExist.items.find((item) => item.itemId.toString() === CNItem.itemId);

    // const invoiceExistItem = invoiceExist.items.find(item => item);
    // const invoiceItem = invoiceExistItem.itemId.toString();

    // console.log("invoiceExistItem......",invoiceExistItem);
    // console.log("CNItem.......",CNItem);

    // console.log("invoiceItem.......",invoiceItem);

    // console.log("invoiceItem.itemId......",invoiceItem.itemId.toString());
    // console.log("CNItem.itemId......",CNItem.itemId); 
    // console.log("invoiceExist......",invoiceExist.items[0].itemId.toString());

    if (!invoiceItem) {
      errors.push(`Item ID ${CNItem.itemId} not found in the invoice.`); 
    } else {
      // validateField(CNItem.itemName !== invoiceItem.itemName, 
      //               `Item Name mismatch for ${invoiceItem.itemId}: Expected ${invoiceItem.itemName}, got ${CNItem.itemName}`, 
      //               errors);
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
      if (!invoiceItem.returnQuantity) {
        validateField(CNItem.stock !== invoiceItem.quantity, 
                    `Stock mismatch for ${invoiceItem.itemId}: Expected ${invoiceItem.quantity}, got ${CNItem.stock}`, 
                    errors);
      } else {
        const expectedReturnQuantity = invoiceItem.quantity - invoiceItem.returnQuantity;
        validateField(CNItem.stock !== expectedReturnQuantity, 
                    `Stock mismatch for ${invoiceItem.itemId}: Expected ${expectedReturnQuantity}, got ${CNItem.stock}`, 
                    errors);
      }
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
    placeOfSupply && !validCountries[organization.organizationCountry]?.includes(placeOfSupply),
    "Invalid Place of Supply: " + placeOfSupply, errors );
}

// Validate Invoice Type
function validateInvoiceType(invoiceType, errors) {
  validateField(
    invoiceType && !validInvoiceType.includes(invoiceType),
    "Invalid Invoice Type: " + invoiceType, errors );
}


// Validate Payment Mode
function validatePaymentMode(paymentMode, errors) {
  validateField(
    paymentMode && !validPaymentMode.includes(paymentMode),
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
  async function itemTrack(savedCreditNote, itemTable) {
    const { items } = savedCreditNote;
  
    for (const item of items) {
      // Find the matching item in itemTable by itemId
      const matchingItem = itemTable.find((entry) => entry._id.toString() === item.itemId);
  
      if (!matchingItem) {
        console.error(`Item with ID ${item.itemId} not found in itemTable`);
        continue; // Skip this entry if not found
      }
  
      // Calculate the new stock level after the purchase
      const newStock = matchingItem.currentStock + item.itemQuantity;
  
  
      // Create a new entry for item tracking
      const newTrialEntry = new ItemTrack({
        organizationId: savedCreditNote.organizationId,
        operationId: savedCreditNote._id,
        transactionId: savedCreditNote.creditNote,
        action: "Credit Note",
        date: savedCreditNote.billDate,
        itemId: matchingItem._id,
        itemName: matchingItem.itemName,
        sellingPrice: matchingItem.sellingPrice,
        costPrice: matchingItem.costPrice || 0, // Assuming cost price is in itemTable
        creditQuantity: item.quantity, // Quantity sold
        currentStock: newStock,
        remark: `Sold to ${savedCreditNote.customerDisplayName}`,
      });
  
      // Save the tracking entry and update the item's stock in the item table
      await newTrialEntry.save();
  
      console.log("1",newTrialEntry);
    }
  }



// Function to update salesInvoice with returnQuantity
const updateSalesInvoiceWithCreditNote = async (invoiceId, items) => {
  try {
    for (const item of items) {
      await Invoice.findOneAndUpdate(
        { _id: invoiceId, 'items.itemId': item.itemId },
        {
          $inc: { 'items.$.returnQuantity': item.quantity } // Increment returnQuantity for the matched itemId
        }
      );

      // If the itemId was not found and updated, add a new entry
      await Invoice.findOneAndUpdate(
        { _id: invoiceId, 'items.itemId': { $ne: item.itemId } },
        {
          $push: {
            items: {
              returnQuantity: item.quantity
            }
          }
        }
      );
    }
  } catch (error) {
    console.error("Error updating salesInvoice with returnQuantity:", error);
    throw new Error("Failed to update Sales Invoice with Credit Note details.");
  }
};




// Helper function to calculate stock
const calculateStock = async (creditNote) => {
  try {
    const { invoiceId, items } = creditNote;

    // Fetch corresponding salesInvoice
    const salesInvoice = await Invoice.findById(invoiceId);

    if (salesInvoice) {
      items.forEach((creditItem) => {
        const salesItem = salesInvoice.items.find(
          (item) => item.itemId.toString() === creditItem.itemId.toString()
        );

        if (salesItem) {
          // Calculate stock based on quantity and returnQuantity
          creditItem.stock = Math.max(salesItem.quantity - salesItem.returnQuantity, 0);
        } else {
          // If no matching item in salesInvoice, set stock to 0
          creditItem.stock = 0;
        }

        // Ensure stock is never negative
        if (creditItem.stock < 0) {
          creditItem.stock = 0;
        }
      });
    } else {
      console.warn(`Sales Invoice with ID ${invoiceId} not found.`);
    }

    // Update stock in the creditNote schema
    await CreditNote.findByIdAndUpdate(
      creditNote._id,
      { items },
      { new: true }
    );

    // Remove organizationId before returning
    const { organizationId, ...rest } = creditNote.toObject();
    return rest;
    
  } catch (error) {
    console.error("Error in calculateStock:", error);
    throw new Error("Failed to calculate stock for Credit Note.");
  }
};







  // Utility functions
const validPaymentMode = [ "Cash", "Credit" ]
const validInvoiceType = [
  "Registered", 
  "Deemed Export", 
  "SEZ With Payment", 
  "SEZ Without Payment", 
  "SEZ Without Payment", 
  "Export With Payment", 
  "Export Without Payment", 
  "B2C (Large)", "B2C Others"
];
const validCountries = {
  "United Arab Emirates": [
    "Abu Dhabi",
    "Dubai",
    "Sharjah",
    "Ajman",
    "Umm Al-Quwain",
    "Fujairah",
    "Ras Al Khaimah",
  ],
  "India": [
    "Andaman and Nicobar Island",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ],
  "Saudi Arabia": [
    "Asir",
    "Al Bahah",
    "Al Jawf",
    "Al Madinah",
    "Al-Qassim",
    "Eastern Province",
    "Hail",
    "Jazan",
    "Makkah",
    "Medina",
    "Najran",
    "Northern Borders",
    "Riyadh",
    "Tabuk",
  ],
};































async function journal( savedCreditNote, defAcc, customerAccount ) {  
  const cgst = {
    organizationId: savedCreditNote.organizationId,
    operationId: savedCreditNote._id,
    transactionId: savedCreditNote.salesInvoice,
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
    transactionId: savedCreditNote.salesInvoice,
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
    transactionId: savedCreditNote.salesInvoice,
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
    transactionId: savedCreditNote.salesInvoice,
    date: savedCreditNote.createdDate,
    accountId: defAcc.outputVat || undefined,
    action: "Sales Return",
    debitAmount: savedCreditNote.vat || 0,
    creditAmount: 0,
    remark: savedCreditNote.note,
  };
  
  const customerReceived = {
    organizationId: savedCreditNote.organizationId,
    operationId: savedCreditNote._id,
    transactionId: savedCreditNote.salesInvoice,
    date: savedCreditNote.createdDate,
    accountId: customerAccount._id || undefined,
    action: "Credit Note",
    debitAmount: 0,
    creditAmount: savedCreditNote.totalAmount || 0,
    remark: savedCreditNote.note,
  };
  const paidThroughAccount = {
    organizationId: savedCreditNote.organizationId,
    operationId: savedCreditNote._id,
    transactionId: savedCreditNote.salesInvoice,
    date: savedCreditNote.createdDate,
    accountId: defAcc.paidThroughAccountId || undefined,
    action: "Credit Note",
    debitAmount: savedCreditNote.totalAmount || 0,
    creditAmount: 0,
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

  console.log("customerReceived", customerReceived.debitAmount,  customerReceived.creditAmount);
  console.log("paidThroughAccount", paidThroughAccount.debitAmount,  paidThroughAccount.creditAmount);

  const  debitAmount = salesTotalDebit + cgst.debitAmount  + sgst.debitAmount + igst.debitAmount +  vat.debitAmount + customerReceived.debitAmount + paidThroughAccount.debitAmount ;
  const  creditAmount = salesTotalCredit + cgst.creditAmount  + sgst.creditAmount + igst.creditAmount +  vat.creditAmount + customerReceived.creditAmount + paidThroughAccount.creditAmount ;

  console.log("Total Debit Amount: ", debitAmount );
  console.log("Total Credit Amount: ", creditAmount );

  // console.log( discount, sale, cgst, sgst, igst, vat, customer, otherExpense, freight, roundOff );


  //Sales
    savedCreditNote.salesJournal.forEach((entry) => {

      const data = {
        organizationId: savedCreditNote.organizationId,
        operationId: savedCreditNote._id,
        transactionId: savedCreditNote.salesInvoice,
        date: savedCreditNote.createdDateTime,
        accountId: entry.accountId || undefined,
        action: "Sales Return",
        debitAmount: 0,
        creditAmount: entry.creditAmount || 0,
        remark: savedCreditNote.note,
      };
      
      createTrialEntry( data )

    });

    
 



  //Tax
  if(savedCreditNote.cgst){
    createTrialEntry( cgst )
  }
  if(savedCreditNote.sgst){
    createTrialEntry( sgst )
  }
  if(savedCreditNote.igst){
    createTrialEntry( igst )
  }
  if(savedCreditNote.vat){
    createTrialEntry( vat )
  }
 
  
  //Paid
  if(savedCreditNote.totalAmount){
    createTrialEntry( customerReceived )
    createTrialEntry( paidThroughAccount )
  }
}



async function createTrialEntry( data ) {
  const newTrialEntry = new TrialBalance({
      organizationId:data.organizationId,
      operationId:data.operationId,
      transactionId: data.transactionId,
      date:data.date,
      accountId: data.accountId,
      action: data.action,
      debitAmount: data.debitAmount,
      creditAmount: data.creditAmount,
      remark: data.remark
});



await newTrialEntry.save();

}