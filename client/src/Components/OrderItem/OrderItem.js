import React, { Component } from 'react'

import './OrderItem.css'

class OrderItem extends Component {
    constructor() {
        super()
        this.state = {
            total_price: 0
        }
    }

    render() {
        return (
            <div className="orderItem">
                <h1 className="orderId"># {this.props.order.id}</h1>
                <p>{this.props.order.created_date}</p>
                <span className="amount">${this.props.order.order_amount}</span>
            </div>
        )
    }
}


export default OrderItem