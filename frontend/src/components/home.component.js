import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render () {
        return (
            <div>
                 <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link to="/" className="navbar-brand">Basket</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create/customer" className="nav-link">New User</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create/vendor" className="nav-link">New Vendor</Link>
                        </li>
                        </ul>
                    </div>
                </nav>
                {JSON.parse(localStorage.getItem('user') === null) ?
                    <Redirect to="/"/> : null
                }
            </div>
        )
    }
}