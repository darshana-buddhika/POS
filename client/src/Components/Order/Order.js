import React, { Component } from 'react';
import axios from 'axios'

import './Order.css'

import Item from '../Item/Item'
import AddItem from '../Item/AddItem'


class Order extends Component {
    constructor(props) {
        super(props)

        this.state = {
            status: false,
            addNew: false,
            order: null,
            error: ""
        }
    }

    getOrder = () => {
        console.log(this.props)
        const { match: { params } } = this.props;

        axios.get(`http://localhost:5000/api/order/${params.id}`, {
            headers: {
                Authorization: `Bearar ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                // console.log(response.data)
                const { status, message } = response.data

                status === 200 ? this.setState({ order: message, status: true }) : this.setState({ error: message })
            })
            .catch(err => console.log(err))

    }
    addItem = (item, new_total) => {
        const { match: { params } } = this.props;
        axios.post(`http://localhost:5000/api/order/${params.id}/addItem`, { item: item, new_total: new_total }, {
            headers: {
                Authorization: `Bearar ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                // console.log(response.data)
                response.data.status === 200 ? this.getOrder() : this.setState({ error: `Item could not be added ${response.data.message}` })
            })
            .catch((error) => console.error(error))

    }

    updateItem = (item, new_total) => {
        const { match: { params } } = this.props;
        axios.put(`http://localhost:5000/api/order/${params.id}/updateItem`, { item: item, new_total: new_total }, {
            headers: {
                Authorization: `Bearar ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log(response.data)
                response.data.status === 200 ? this.getOrder() : this.setState({ error: `Item could not be updated ${response.data.message}` })
            })
            .catch((error) => console.error(error))
    }

    deleteItem = (item, new_total) => {
        const { match: { params } } = this.props;
        axios.put(`http://localhost:5000/api/order/${params.id}/deleteItem`, { item: item, new_total: new_total }, {
            headers: {
                Authorization: `Bearar ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log(response.data)
                response.data.status === 200 ? this.getOrder() : this.setState({ error: `Item could not be deleted ${response.data.message}` })
            })
            .catch((error) => console.error(error))
    }


    handleItemUpdate = (item, current_amount) => {
        const { item_name, item_quantity, item_price } = item;

        let current_total = this.state.order.order_amount;
        current_total = current_total - current_amount
        const new_total = current_total + item_quantity * item_price;
        console.log(new_total)
        console.log(item)
        this.updateItem(item, new_total);

    }

    handleAddItem = (item) => {
        const { item_name, item_quantity, item_price } = item;
        console.log(item_name, item_quantity, item_price);

        const current_total = this.state.order.order_amount;
        const new_total = current_total + item_quantity * item_price;

        this.addItem(item, new_total)
        this.handleCancel()
    }

    handleDeleteItem = (item, current_amount) => {

        let current_total = this.state.order.order_amount;
        const new_total = current_total - current_amount
        console.log(new_total)
        console.log(item)
        const conf = window.confirm("Are you sure to delete the Item?")

        if (conf) {
            this.deleteItem(item, new_total);
        }

    }

    handleAddItemButton = () => {
        this.setState({ addNew: true })
    }

    // Close add Item window
    handleCancel = () => {
        this.setState({ addNew: false })
    }

    componentDidMount() {
        this.getOrder()

    }

    render() {
        // Status will be true when the orders get loaded
        if (!this.state.status) { return <p>Loading orders...</p> }

        if (this.state.addNew) {
            return <AddItem handleCancel={this.handleCancel} handleAddItem={this.handleAddItem} />
        }

        return (
            <div className="orders">

                <React.Fragment>
                    <div className="orderHeaderWrapper">
                        <h1 className="orderHeader">Order #{this.state.order.id}</h1>
                        <h1 className="orderHeader left">Total ${this.state.order.order_amount}.00</h1>
                    </div>
                    < hr />
                    <div className="itemList">
                        {this.state.order.items.length !== 0 ? this.state.order.items.map((item, index) => {
                            return <Item onUpdate={this.handleItemUpdate} handleDelete={this.handleDeleteItem} key={index} item={item} total={item.item_quantity * item.item_price} />
                        }) : ""}
                    </div>
                    <div className="addOrder">
                        <button onClick={this.handleAddItemButton}>+</button>
                    </div>

                    {this.state.error != "" ? <div className="error">{this.state.error}</div> : ""}

                </React.Fragment>

            </div >

        )
    }
}


export default Order