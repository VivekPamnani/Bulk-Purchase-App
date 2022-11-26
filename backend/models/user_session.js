const mongoose = require('mongoose');
const User_Session = new mongoose.Schema({
  userId: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  dead: {
    type: Boolean,
    default: false
  }
});
module.exports = mongoose.model('UserSession', User_Session);