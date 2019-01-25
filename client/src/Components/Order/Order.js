import React, { Component } from 'react';
import axios from 'axios'

import './Order.css'

import Item from '../Item/Item'

// Items that a user can buy
const Items = [
    {
        item_name : "Cake",
        unite_price : 5.00
    },
    {
        item_name : "Bread",
        unite_price : 10.00
    },   {
        item_name : "Burger",
        unite_price : 12.00
    },   {
        item_name : "Pizza",
        unite_price : 22.00
    },   {
        item_name : "Sandwich",
        unite_price : 8.00
    },
]

class Order extends Component {
    constructor(props) {
        super(props)

        this.state = {
            addNew : false,
            order_amount: 0,
            items: [],
            order: null,
            error: ""
        }
    }

    getOrder = () => {
        const { match: { params } } = this.props.order;

        axios.get(`http://localhost:5000/api/order/${params.id}`, {
            headers: {
                Authorization: `Bearar ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log(response.data)
                const { status, message } = response.data
                console.log(message.items.length == 0)
                status == 200 ? this.setState({ order: message }) : this.setState({ error: message })
            })

    }
    addItem = () => {

    }


    componentDidMount() {

        this.getOrder()

    }



    render() {
        // const { id, order_amount, _id } = this.state.order;
        if (this.state.order === null) { return <p>Loading orders...</p> }

        return (
            <div className="orders">

                <React.Fragment>
                    <div className="orderHeaderWrapper">
                        <h1 className="orderHeader">Order #{this.state.order.id}</h1>
                        <h1 className="orderHeader left">Total ${this.state.order.order_amount}.00</h1>
                    </div>
                    < hr />
                    <div className="itemList">
                        {this.state.order.items.length != 0 ? this.state.order.items.map((item) => {
                            return <Item item={item} />
                        }) : ""}
                    </div>
                    <div className="addOrder">
                        <button onClick={this.Item}>+</button>
                    </div>

                    {this.state.error != "" ? <div className="error">{this.state.error}</div> : ""}

                </React.Fragment>

            </div >

            // { this.state.addNew ? }
        )
    }
}

export default Order