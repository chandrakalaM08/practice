import React, { Component } from 'react';

class EditGrocery extends Component {
    state = {
        editedGrocery: {
            id: null,
            name: '',
            quantity: 0,
            price: 0.0,
            description: '',
            image: '',
        },
    };

    componentDidMount() {
        const { groceryToEdit } = this.props;

        // Set the initial state with the data of the grocery to be edited
        this.setState({ editedGrocery: { ...groceryToEdit } });
    }

    handleEditChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            editedGrocery: {
                ...prevState.editedGrocery,
                [name]: value,
            },
        }));
    };

    saveEditedGrocery = () => {
        const { editedGrocery } = this.state;
        this.props.onSave(editedGrocery); // Call a callback function to save the edited grocery
    };

    render() {
        const { editedGrocery } = this.state;

        return (
            <div>
                <h2>Edit Grocery</h2>
                <form>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={editedGrocery.name}
                            onChange={this.handleEditChange}
                        />
                    </div>
                    <div>
                        <label>Quantity:</label>
                        <input
                            type="number"
                            name="quantity"
                            value={editedGrocery.quantity}
                            onChange={this.handleEditChange}
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            step="0.01"
                            value={editedGrocery.price}
                            onChange={this.handleEditChange}
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={editedGrocery.description}
                            onChange={this.handleEditChange}
                        />
                    </div>
                    <div>
                        <label>Image URL:</label>
                        <input
                            type="text"
                            name="image"
                            value={editedGrocery.image}
                            onChange={this.handleEditChange}
                        />
                    </div>
                    <button type="button" onClick={this.saveEditedGrocery}>
                        Save
                    </button>
                    <button type="button" onClick={this.props.onCancel}>
                        Cancel
                    </button>
                </form>
            </div>
        );
    }
}

export default EditGrocery;
