import React, { Component } from 'react'


import './OrderListItem.css'

class OrderListItem extends Component {
    // constructor() {
    //     super()
    //     this.state = {
    //         total_price: 0
    //     }
    // }

    formatDate = (dateTime) => {
        const date = dateTime.split("T")[0];
        const time = dateTime.split("T")[1].split(".")[0]
        return [date,time]

    }

    render() {
        return (
            <div className="orderItem">
                <h1 className="orderId"># {this.props.order.id}</h1>
                <div className="orderDetails"><p>Date:{this.formatDate(this.props.order.created_date)[0]}</p><br/>
                <p>Time:{this.formatDate(this.props.order.created_date)[1]}</p></div>            
                <span className="amount">${this.props.order.order_amount}.00</span>
            </div>
           
        )
    }
}


export default OrderListItem