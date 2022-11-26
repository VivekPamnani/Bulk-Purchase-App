import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

export default class SignUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            vendor: false,
            redir: false
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onVendorClick = this.onVendorClick.bind(this);
        this.onCustomerClick = this.onCustomerClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onCustomerClick(event) {
        this.setState({ vendor: false })
    }
    onVendorClick(event) {
        this.setState({ vendor: true })
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            // username: this.state.username,
            email: this.state.email,
            password: this.state.password
            // vendor: this.state.vendor
        }
        if(this.state.vendor) {
            axios.post('http://localhost:4000/vendors/login', newUser)
                .then(res => {
                    console.log(res.data);
                    const save = JSON.stringify(res.data)
                    localStorage.setItem('user', save)
                    console.log(res.status);
                    if(res.status === 200) {
                        this.setState({
                            redir: true
                        })
                    }
                });
        }
        else {
            axios.post('http://localhost:4000/customers/login', newUser)
                .then(res => {
                    console.log(res.data);
                    const save = JSON.stringify(res.data)
                    localStorage.setItem('user', save)
                    console.log(res.status);
                    if(res.status === 200) {
                        this.setState({
                            redir: true
                        })
                        // this.state.redir = true;
                    };
                    // console.log(this.state.redir)
                });
        }

        this.setState({
            email: '',
            password:''
        });
    }

    render() {
        const redir = this.state.redir
        console.log(redir)
        if(redir === true) {
            console.log('hello')
            if(this.state.vendor === false) {
                return (
                    <Redirect to="/customer"/>
                )
            }
            else {
                return (
                    <Redirect to="/vendor" />
                )
            }
        }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link to="/" className="navbar-brand">Basket</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                               className="form-control"
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />
                    </div>
                    <div className="radio">
                    <label>
                        <input type="radio" 
                                value={false} 
                                checked={this.state.vendor === false}   
                                onChange={this.onCustomerClick}
                            />
                        Customer
                    </label>
                    </div>
                    <div className="radio">
                    <label>
                        <input type="radio" 
                                value={true} 
                                checked={this.state.vendor === true}   
                                onChange={this.onVendorClick}
                            />
                        Vendor
                    </label>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Sign In" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}