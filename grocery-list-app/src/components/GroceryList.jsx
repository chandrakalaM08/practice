import React, { Component } from 'react';
import axios from 'axios';


class GroceryList extends Component {
    state = {
        groceries: [],
        currentPage: 1,
        itemsPerPage: 10,
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const { currentPage } = this.state;
        axios
            .get(`http://localhost:8080/groceries?_page=${currentPage}&_limit=10`)
            .then((response) => {
                const totalCount = +(response.headers['x-total-count']) || 0;
                this.setState({ groceries: response.data, totalCount });
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    };

    // Implement functions for editing here
    openEditModal = (grocery) => {
        this.setState({
            editModalIsOpen: true,
            editedGrocery: { ...grocery },
        });
    };

    // Function to close the edit modal
    closeEditModal = () => {
        this.setState({
            editModalIsOpen: false,
            editedGrocery: {
                id: null,
                name: '',
                quantity: 0,
                price: 0.0,
                description: '',
                image: '',
            },
        });
    };

    // Function to handle changes in the edit modal
    handleEditChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            editedGrocery: {
                ...prevState.editedGrocery,
                [name]: value,
            },
        }));
    };



    // Delete

    deleteGrocery = (groceryId) => {
        // Make an Axios DELETE request to delete the grocery item with the given ID
        axios
            .delete(`http://localhost:8080/groceries/${groceryId}`)
            .then((response) => {
                // Handle the successful response (e.g., show a success message)
                console.log('Grocery deleted successfully.');

                // Update the state to remove the deleted item from the list
                this.setState((prevState) => ({
                    groceries: prevState.groceries.filter((grocery) => grocery.id !== groceryId),
                }));
            })
            .catch((error) => {
                console.error('Error deleting grocery:', error);
            });
    };

    editGrocery = () => {
        alert("Will implement this soon..")
    }

    // Implement pagination functions here
    // Function to handle page changes
    handlePageChange = (newPage) => {
        this.setState(
            {
                currentPage: newPage,
            },
            () => {
                this.fetchData(); // Fetch data for the new page after updating state
            }
        );
    };

    render() {
        const { groceries, currentPage, totalCount } = this.state;

        console.log("groceries here", totalCount)
        // Calculate the total number of pages
        const totalPages = Math.ceil(totalCount / 10);
        return (
            <div>
                <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Grocery List</h2>
                <ul style={{ listStyle: 'none', margin: "5px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}>
                    {groceries.map((grocery) => (
                        <li key={grocery.id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
                            <div>
                                <strong style={{ fontSize: '18px', color: 'blue' }}>Name:</strong> {grocery.name} <strong>Id : {grocery.id}</strong>
                            </div>
                            <div>
                                <strong style={{ fontSize: '16px' }}>Quantity:</strong> {grocery.quantity}
                            </div>
                            <div>
                                <strong style={{ fontSize: '16px' }}>Price:</strong> Rs.{grocery.price}
                            </div>
                            <div>
                                <strong style={{ fontSize: '16px' }}>Description:</strong> {grocery.description}
                            </div>
                            <div>
                                <img src={grocery.image} alt={grocery.name} style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '5px', marginTop: '5px' }} />
                            </div>
                            <button
                                onClick={() => this.editGrocery(grocery)}
                                style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', borderRadius: '5px', margin: '5px' }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => this.deleteGrocery(grocery.id)}
                                style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '5px', margin: '5px' }}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                <hr />
                <div>
                    <button
                        onClick={() => this.handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => this.handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
                <hr />
            </div>
        );
    }


}
export default GroceryList;
