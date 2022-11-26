import React, {Component} from 'react';
import axios from 'axios';
import { Redirect, Link} from 'react-router-dom';

export default class Vendor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            temp_user: null
        }
        this.onLogout = this.onLogout.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onShow = this.onShow.bind(this);
    }

    onLogout(event) {
        console.log('log out clicked')
        // localStorage.setItem('user', JSON.stringify(this.state.temp_user))
    }

    onAdd(event) {
        localStorage.setItem('venId', this.state.id);
    }

    onShow(event) {
        
    }

    render () {
        // console.log(this.state.temp_user)
        // this.state.id = JSON.parse(localStorage.getItem('user'))._id;
        // this.state.id = this.state.temp_user._id
        this.state.temp_user = JSON.parse(localStorage.getItem('user'));
        // console.log(temp_id)
        // this.setState({
        //     temp_user: temp_id,
        //     // id: temp_id._id
        // })
        this.state.id = this.state.temp_user._id
        // console.log(this.state.id)
        localStorage.setItem('venId', this.state.id);
        // console.log(JSON.parse(localStorage.getItem('user'))._id)
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
                                <Link to="/vendor/add_item" className="nav-link" onClick={this.onAdd}>Add Item</Link>
                            </li>
                            <li className="navbat-item">
                                <Link to="/vendor/show_all" className="nav-link" onClick={this.onShow}>Show All</Link>
                            </li>
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