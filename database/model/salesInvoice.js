const mongoose = require('mongoose')
const { Schema } = mongoose

const itemsSchema = new Schema({

    itemId: {type:String},
    itemName: {type:String},

    quantity: {type:String},
    sellingPrice: {type:Number},

    taxGroup: {type:String},
    cgst: { type: Number },
    sgst: { type: Number },
    igst: { type: Number },
    vat: { type: Number },
    itemTotaltax: {type:Number},

    discountType: {type:String}, //$,%
    discountAmopunt: {type:Number}, 
    amount: {type:Number},

  }, { _id: false });

const SalesInvoiceSchema = new Schema ({

  organizationId: { type: String, index: true },
  
  customerId: { type: String },
  customerName: { type: String },
  placeOfSupply: { type: String },  
  reference: { type: String },

  salesOrder: { type: String }, //prefix
  //salesPersonId: { type: String }, //next phase
  //salesPersonName: { type: String }, //next phase

  salesOrderDate: { type: String },  
  expiryDate: { type: String },

  subject: { type: String },
  
  items: [itemsSchema],  
  
  note: { type: String },
  tc: { type: String },


  //not in ui
  discountType: { type: String }, // item, tran, both 
  discountTransactionType: { type: String }, // $, %
  discountTransactionAmount: { type: Number },
  discountTax: { type: String }, // after, before
  taxtype: { type: String }, //intra, inter, non-tax 

  
  
  subTotal: { type: Number },
  totalItem: { type: Number },

  cgst: { type: Number },
  sgst: { type: Number },
  igst: { type: Number },
  vat: { type: Number },
  totalTax: { type: Number },
  totalAmount: { type: Number },

  createdDate: { type: String },
  userId: { type: String },
  userName: { type: String },
})


const SalesInvoice = mongoose.model("SalesInvoice", SalesInvoiceSchema);

module.exports = SalesInvoice;



