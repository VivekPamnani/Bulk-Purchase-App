import React, {Component} from 'react';
import axios from 'axios';
import { Redirect, Link} from 'react-router-dom';

export default class VendorAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            quantity: 0,
            price: 0
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeQuant = this.onChangeQuant.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    onChangeQuant(event) {
        this.setState({ quantity: event.target.value });
    }

    onChangePrice(event) {
        this.setState({ price: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newProd = {
            name: this.state.name,
            quant: this.state.quantity,
            price: this.state.price
        }
        console.log(this.state.name)
        axios.post('http://localhost:4000/vendors/new/' + localStorage.getItem('venId'), newProd)
             .then(res => {
                 
             })

        this.setState({
            name: '',
            quantity: 0,
            price: 0
        })
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Quantity: </label>
                        <input type="number"
                               className="form-control"
                               value={this.state.quantity}
                               onChange={this.onChangeQuant}
                               />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input type="number"
                               className="form-control"
                               value={this.state.price}
                               onChange={this.onChangePrice}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Product" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
