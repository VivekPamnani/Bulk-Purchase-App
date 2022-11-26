import React, {Component} from 'react';
import axios from 'axios';
import { Redirect} from 'react-router-dom';

export default class Logout extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render () {
        console.log(JSON.parse(localStorage.getItem('user'))._id)
        axios.get('http://localhost:4000/customers/logout/' + JSON.parse(localStorage.getItem('user'))._id)
        localStorage.setItem('user', null);
        // console.log(JSON.parse(localStorage.getItem('user')))
        return (
            <div>
                 <Redirect to="/"/>
            </div>
        )
    }
}