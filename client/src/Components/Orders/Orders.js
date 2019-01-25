import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import OrderListItem from '../OrderListItem/OrderListItem'
import './Orders.css'

class Orders extends Component {
    constructor() {
        super()
        this.state = {
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
        data.status === 200 ? this.setState({ orders: data.message }) : this.setState({ error: data.message })
    }

    getOrders = () => {
        axios.get('http://localhost:5000/api/order/', {
            headers: {
                Authorization: `Bearar ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log(response.data)
                this.handleOrderResponse(response.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.getOrders();
    }

    render() {
        return (
            <div className="orders">
                <h1 className="orderHeader">Open Orders</h1>
                <hr />

                {this.state.orders === [] ? <p>Loading orders...</p> :
                    this.state.orders.map((order, index) => {
                        return <Link to={`/orders/${order._id}`}><OrderListItem key={index} order={order} /></Link>
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