const mongoose = require('mongoose');
const Product = new mongoose.Schema({
  vendorId: {
    type: String,
    default: ''
  },
  name: {
    type: String
  },
  quant: {
    type: Number
  },
  price: {
    type: Number
  },
  booked: {
      type: Number,
      default: 0 
  },
  status: {
    type: Number, 
    default: 1
    // 0: Cancelled
    // 1: Available
    // 2: Ready to dispatch
    // 3: Dispatched
  }
});
module.exports = mongoose.model('Product', Product);