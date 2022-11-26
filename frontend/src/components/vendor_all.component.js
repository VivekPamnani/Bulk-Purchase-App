import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

export default class VendorAll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prods: []
        }
        this.onDispatch = this.onDispatch.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/vendors/list/' + localStorage.getItem('venId'))
            .then(prolist => {
                // console.log(prolist)
                this.setState({prods: prolist.data})
            })
            .catch(function(err) {
                console.log(err);
            })
    }

    onDispatch(e, i) {
        // e.preventDefault();
        console.log(i);
        axios.post('http://localhost:4000/vendors/dispatch/' + i);
    }
    onCancel(e, i) {
        // e.preventDefault();
        console.log(i);
        axios.post('http://localhost:4000/vendors/cancel/' + i);
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Booked</th>
                            <th>Dispatch</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.prods.map((curr_prod, i) => {
                                return (
                                    <tr>
                                        <td>{curr_prod.name}</td>
                                        <td>{curr_prod.quant}</td>
                                        <td>{curr_prod.price}</td>
                                        <td>{curr_prod.status}</td>
                                        <td>{curr_prod.booked}</td>
                                        <td>
                                            <form onSubmit={(e => {
                                                {this.onDispatch(e, curr_prod._id)}
                                            })}>
                                                <div className="form-group">
                                                <input type="submit" value="Dispatch" className="btn btn-primary"/>
                                                </div>
                                            </form>
                                        </td>
                                        <td>
                                            <form onSubmit={(e => {
                                                {this.onCancel(e, curr_prod._id)}
                                            })}>
                                                <div className="form-group">
                                                <input type="submit" value="Cancel" className="btn btn-primary"/>
                                                </div>
                                            </form>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}