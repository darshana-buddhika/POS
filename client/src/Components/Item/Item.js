import React, { Component } from 'react';

import './Item.css'

class Item extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.item)
        this.state = {
            quantity: props.item.item_quantity,

        }
    }

    // Update existing item details
    handleChange = (event) => {

        this.setState({ quantity: quantity })
        let quantity = event.target.value
        if (quantity > 0) {
            const confChange = window.confirm("Do you really wanna change the quantity?")


            if (quantity > 0) {
                const new_item = this.props.item
                new_item.item_quantity = quantity
                this.props.onUpdate(new_item, this.props.total)
            } else {
                this.setState({ error: "Quentity should be a number" })
            }

        }

    }

    render() {
        return (
            <div className="item">
                <div className="itemDetails">
                    <h2>{this.props.item.item_name}</h2>
                    <h3>Price for one item : ${this.props.item.item_price}</h3>

                </div>
                <div className="quantity">
                    <label>Quantity</label>
                    <input type="text" value={this.state.quantity} onChange={this.handleChange}></input>
                </div>
                <div className="left total"> <h1>${this.props.total}.00</h1></div>
            </div>
        )
    }
}



export default Item