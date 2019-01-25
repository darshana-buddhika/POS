import React, { Component } from 'react';
import axios from 'axios';

import OrderItem from '../OrderItem/OrderItem'
import './Orders.css'

class Orders extends Component {
    constructor(props) {
        super(props)
        // console.log(props.orders)
        this.state = {
            orders: props.orders
        }
    }

    render() {
        return (
            <div className="orders">
                <h1 className="orderHeader">Open Orders</h1>
                <hr />

                {this.props.orders === [] ? <p>Loading orders...</p> :
                    this.props.orders.map((order, index) => {
                        return <OrderItem key={index} order={order} />
                    })}
                <div className="addOrder">
                    <button onClick={this.props.addOrder}>+</button>
                </div>

            </div>
        )
    }
}


export default Orders