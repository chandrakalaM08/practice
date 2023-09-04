import React, { Component } from 'react';
import axios from 'axios';

class AddGroceryForm extends Component {
    state = {
        name: '',
        quantity: 0,
        price: 0.0,
        description: '',
        image: '',
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, quantity, price, description, image } = this.state;

        // Validate the input fields here

        // Create a new grocery object
        const newGrocery = {
            name,
            quantity: parseInt(quantity),
            price: parseFloat(price),
            description,
            image,
        };


        axios
            .post('http://localhost:8080/groceries', newGrocery)
            .then((response) => {
                axios.get('http://localhost:8080/groceries')
            })
            .catch((error) => {

                console.error('Error adding grocery:', error);
            });


        this.setState({
            name: '',
            quantity: 0,
            price: 0.0,
            description: '',
            image: '',
        });
    };

    render() {
        const { name, quantity, price, description, image } = this.state;

        return (
            <div>
                <h2>Add a New Grocery Item</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={name} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Quantity:</label>
                        <input type="number" name="quantity" value={quantity} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input type="number" name="price" step="0.01" value={price} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea name="description" value={description} onChange={this.handleChange}></textarea>
                    </div>
                    <div>
                        <label>Image URL:</label>
                        <input type="text" name="image" value={image} onChange={this.handleChange} />
                    </div>
                    <button type="submit">Add Grocery</button>
                </form>
            </div>
        );
    }
}

export default AddGroceryForm;
