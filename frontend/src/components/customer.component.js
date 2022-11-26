import React, {Component} from 'react';
import axios from 'axios';
import { Redirect, Link} from 'react-router-dom';

export default class Customer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            temp_user: null
        }
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout(event) {
        console.log('log out clicked')
        // localStorage.setItem('user', JSON.stringify(this.state.temp_user))
    }

    render () {
        this.state.temp_user = JSON.parse(localStorage.getItem('user'));
        // localStorage.setItem('user', null)
        if(this.state.temp_user === null) {
            // console.log('hello')
            return (
                <div>
                    <Redirect to="/"/>
                </div>
            )
        }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link to="/" className="navbar-brand">Basket</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/logout" className="nav-link" onClick={this.onLogout}>Log Out</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}