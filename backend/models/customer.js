const bcrypt = require('bcrypt')
const mongoose = require('mongoose');

let Customer = new mongoose.Schema({
    username: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    dead: {
        type: Boolean,
        default: false
    }
});

Customer.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
Customer.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Customer', Customer);