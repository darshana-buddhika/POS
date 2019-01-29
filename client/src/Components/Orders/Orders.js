import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import OrderListItem from '../OrderListItem/OrderListItem'
import './Orders.css'


class Orders extends Component {
    constructor() {
        super()
        this.state = {
            status: false,
            orders: [],
            error: ""
        }
    }

    addOrder = () => {
        this.setState({ error: "" })
        const new_order = {

        }
        this.state.orders.length == 0 ? new_order.id = 1 : new_order.id = this.state.orders[this.state.orders.length - 1].id + 1

        axios.post('http://localhost:5000/api/order/addOrder', { order: new_order }, {
            headers: {
                Authorization: `Bearar ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log(response)
                response.data.status == 200 ? this.getOrders() : this.setState({ error: response.data.message })
            })
            .catch((err) => {
                console.error(err)
            })
    }

    handleOrderResponse = (data) => {
        const orders = data.message.sort((a, b) => a.id > b.id ? 1 : -1);
        console.log(orders)
        data.status === 200 ? this.setState({ orders: data.message, status: true }) : this.setState({ error: orders })
    }

    getOrders = () => {
        console.log("GET orders from the users")
        axios.get('http://localhost:5000/api/order/', {
            headers: {
                Authorization: `Bearar ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log("respose for GET Orders")
                console.log(response.data)
                this.handleOrderResponse(response.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    deleteOrder = (order_id) => {
        axios.delete(`http://localhost:5000/api/order/delete/${order_id}`, {
            headers: {
                Authorization: `Bearar ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                console.log(response.data)
                response.data.status == 200 ? this.getOrders() : this.setState({ error: "Couldnt delete Order" })
            })
    }

    handleDelete = (order_id) => {
        let conf = window.confirm("You sure you wanna delete this?");

        console.log(conf)

        if (conf) {
            this.deleteOrder(order_id)
        }

        // conf ? this.deleteOrder(order_id) : ""
        console.log(order_id)
    }

    componentDidMount() {
        this.getOrders();
    }

    render() {

        console.log(this.state.orders)
        return (
            <div className="orders">
                <h1 className="orderHeader">Open Orders</h1>
                <hr />

                {!this.state.status ? <p>Loading orders...</p> :
                    this.state.orders.map((order, index) => {
                        return <React.Fragment><Link key={index} to={`/orders/${order._id}`}><OrderListItem order={order} /></Link> <button className="delete" onClick={() => { this.handleDelete(order._id) }}>Delete</button></React.Fragment>
                    })}
                <div className="addOrder">
                    <button onClick={this.addOrder}>+</button>
                </div>

                {this.state.error != "" ? <div className="error">{this.state.error}</div> : ""}

            </div>
        )
    }
}


export default Orders