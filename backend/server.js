const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;
const customerRoutes = express.Router();
const vendorRoutes = express.Router();

let Customer = require('./models/customer');
let Vendor = require('./models/vendor');
let UserSession = require('./models/user_session')
let Product = require('./models/product')

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
customerRoutes.route('/').get(function(req, res) {
    Customer.find(function(err, customers) {
        if (err) {
            console.log(err);
        } else {
            res.json(customers);
        }
    });
});
vendorRoutes.route('/').get(function(req, res) {
    Vendor.find(function(err, vendors) {
        if(err) {
            console.log(err);
        } else {
            res.json(vendors)
        }
    });
});
customerRoutes.route('/sess').get(function(req,res) {
    UserSession.find(function(err, use) {
        if(err)
            console.log(err)
        else
            res.json(use)
    })
})

// Adding a new user
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

vendorRoutes.route('/add').post(function(req, res) {
    let vendor = new Vendor();
    const { body } = req;
    let { password } = body;
    let { username } = body;
    let { email } = body;
    vendor.username = username;
    vendor.email = email;
    vendor.password = vendor.generateHash(password);

    Vendor.find({"email": email}, (err, vend) => {
        if(err)
            console.log('Error');
        ven = vend[0];
        if(!ven) {
            vendor.save()
                    .then(ven => {
                        res.status(200).json({'Vendor': 'Vendor added successfully!'});
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

customerRoutes.route('/login').post(function(req, res) {
    const { body } = req;
    const { email } = body;
    const { password } = body;
    console.log(req.body)
    Customer.find({"email": email}, (err, custom) => {
            if(err) {
                console.log('Error');
                return res.status(400)
            }
            cust = custom[0];
            console.log(cust);
            if(!cust) {
                console.log('not found!!');
                return res.status(404).send('Email not found!');
            }
            else {
                console.log('FFOUne!!')
                if(cust.validPassword(password)) {
                    const userSession = new UserSession();
                    userSession.userId = cust._id;
                    userSession.save((err, doc) => {
                        if (err) {
                        console.log(err);
                        return res.status(400).send('Error')
                        }
                    console.log('Login Succesful!');
                    // res.json(cust)
                    // return res.status(200).json(cust).send('Login Successful!');
                    res.status(200);
                    res.json(cust)
                    // res.send("Login Successful!")
                    })
                }
                else {
                    console.log('Wrong password!');
                    return res.status(400).send('Wrong Password!');
                }
            }
        });
});
vendorRoutes.route('/login').post(function(req, res) {
    const { body } = req;
    const { password } = body;
    const { email } = body;

    Vendor.find({"email": email}, (err, vend) => {
        if(err) {
            console.log('Error');
            return res.status(400)
        }
        ven = vend[0];
        console.log(ven);
        if(!ven) {
            // console.log('not found!!');
            return res.status(404).send('Email not found!');
        }
        else {
            // console.log('FFOUne!!')
            if(ven.validPassword(password)) {
                const userSession = new UserSession();
                userSession.userId = ven._id;
                userSession.save((err, doc) => {
                    if (err) {
                    console.log(err);
                    return res.status(400).send('Error')
                    }
                console.log('Login Succesful!');
                res.status(200);
                res.json(ven)
                })
            }
            else {
                console.log('Wrong password!');
                return res.status(400).send('Wrong Password!')
            }
        }
    }); 
});

customerRoutes.route('/logout/:id').get(function(req, res, next) {
    const { query } = req;
    const { token } = query;

    // UserSession.findOneAndUpdate({"_id": token, "dead": false}, {$set: {"dead":true}}, null, (err, session) => {
    UserSession.findOneAndDelete({"userId": req.params.id}, null, (err, session) => {
        if(err) {
            console.log('Error');
            return res.status(400).send('Error');
        }
        if(!session) {
            return res.status(200).send('Error: User is not logged in.')
        }
        return res.status(200).send('User is now logged out.')

    })
});
vendorRoutes.route('/logout').get(function(req, res, next) {
    const { body } = req;
    const { token } = body;
    console.log(token)
    UserSession.findOneAndUpdate({"userId": token, "dead": false}, {$set: {"dead": true}}, null, (err, session) => {
        if(err) {
            console.log('Error');
            return res.status(400).send('Error');
        }
        sess = session
        console.log(session)
        if(sess)
            return res.status(200).send('User is now logged out.')
        else
            return res.status(200).send('User is not logged in.')

    })
});

// Getting a user by id
customerRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Customer.findById(id, function(err, customer) {
        res.json(customer);
    });
});
vendorRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Vendor.findById(id, function(err, vendor) {
        res.json(vendor)
    });
});

customerRoutes.route('/update/:id').post(function(req, res) {
    Customer.findById(req.params.id, function(err, user) {
        console.log(user)
        if(!user)
            res.status(404).send('data not found');
        else
            user.username = req.body.username;
            user.password = req.body.password;
            user.save()
                .then(user => {
                    res.json('Customer updated!')
                })
            .catch(err => {
                res.status(400).send("Update failed!")
            });
    });
});
vendorRoutes.route('/update/:id').post(function(req, res) {
    Vendor.findById(req.params.id, function(err, vendor) {
        if(!vendor)
            res.status(404).send('data not found');
        else
            vendor.username = req.body.username;
            vendor.password = req.body.password;
            vendor.save()
                .then(vendor => {
                    res.json('Vendor updated!')
                })
            .catch(err => {
                res.status(400).send("Update failed!")
            });
    });
});

vendorRoutes.route('/new/:id').post(function(req, res) {
    let product = new Product();
    const { body } = req;
    let { name, quant, price } = body;
    product.name = name;
    product.quant = quant;
    product.price = price;
    product.vendorId = req.params.id

    product.save()
           .then(pro => {
               res.status(200).send('Product addded successfully!');
           })
           .catch(err => {
               res.status(400).send('Error!')
           })
})
vendorRoutes.route('/list/:id').get(function(req, res) {
    Product.find({vendorId: req.params.id, status: {$lte: 2, $gte: 1}}, (err, pro) => {
        if(err) {   
            console.log('Error');
            return res.status(400)
        }
        res.json(pro);
    })
})
vendorRoutes.route('/dispatch/:id').post(function(req, res) {
    console.log(req.params.id)
    Product.findOneAndUpdate({_id: req.params.id}, {$set: {status: 3}}, (err, pro) => {
        if(err) {
            console.log('Error');
            return res.status(400);
        }
        // console.log(pro[0].status)
        // pro[0].status = 3
        // console.log(pro[0].status)
    })
})
vendorRoutes.route('/cancel/:id').post(function(req, res) {
    console.log(req.params.id)
    Product.findOneAndUpdate({_id: req.params.id}, {$set: {status: 0}},(err, pro) => {
        if(err) {
            console.log('Error');
            return res.status(400);
        }
        // console.log(pro[0].status)
        // pro[0].status = 3
        // console.log(pro[0].status)
    })
})

app.use('/customers/', customerRoutes);
app.use('/vendors/', vendorRoutes)

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
