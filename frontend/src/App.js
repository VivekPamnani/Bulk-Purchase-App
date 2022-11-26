import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'

import UsersList from './components/users-list.component';
import Home from './components/home.component';
import CreateCustomer from './components/create-customer.component';
import CreateVendor from './components/create-vendor.component';
import SignUser from './components/login.component';
import Customer from './components/customer.component';
import Vendor from './components/vendor.component';
import Logout from './components/logout.component';
import VendorAdd from './components/vendor_add.component';
import VendorAll from './components/vendor_all.component';


function App() {
  // const root = "/";
  // if(localStorage.getItem('user' === '')) {
  //   // logged_in = false;
  // }
  // else {
  //   // logged_in = true;
  // }

  return (
    <Router>
      <div className="container">

        <br/>
        {/* <Route path="/" exact component={UsersList}/> */}
        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={SignUser}/>
        <Route path="/create/customer" component={CreateCustomer}/>
        <Route path="/create/vendor" component={CreateVendor}/>
        <Route path="/customer" component={Customer} />
        <Route path="/vendor" component={Vendor}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/vendor/add_item" component={VendorAdd}/>
        <Route path="/vendor/show_all" component={VendorAll}/>
        {/* <Route path="/vendor" component={Vendor} /> */}
        {JSON.parse(localStorage.getItem('user') === null) ?
          <Redirect to="/"/> : null
        }
      </div>
    </Router>
  );
}

export default App;
