const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

let Vendor = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lol: {
        type: String
    },
    dead: {
        type: Boolean,
        default: false
    }
});

Vendor.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
Vendor.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

module.exports = mongoose.model('Vendor', Vendor);