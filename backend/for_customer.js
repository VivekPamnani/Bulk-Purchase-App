const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;
const customerRoutes = express.Router();
let Customer = require('./models/customer');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

customerRoutes.route('/add').post(function(req, res) {
    let customer = new Customer();
    const { body } = req;
    let { password } = body;
    let { username } = body;
    let { email } = body;
    customer.username = username;
    customer.email = email;
    customer.password = customer.generateHash(password);

    Customer.find({"email": email}, (err, custom) => {
        if(err)
            console.log('Error');
        cust = custom[0];
        if(!cust) {
            customer.save()
                    .then(customer => {
                        res.status(200).json({'Customer': 'Customer added successfully!'});
                    })
                    .catch(err   => {
                        res.status(400).send('Error');
                    });
        }
        else {
            return res.status(400).send('Email already exists!')
        }
    });
}); 

app.use('/customers/', customerRoutes);

module.exports = 