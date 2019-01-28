import React, { Component } from 'react';

import './Item.css'

class Item extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.item)
        this.state = {
            quantity : props.item.item_quantity,
            unit_price : props.item.item_price,
            total_price : ""
        }
    }
    componentDidMount(){
        const {quantity , unit_price} = this.state
        this.setState({total_price : quantity*unit_price})
    }
    render() {
        return (
            <div className="item">
                <div className="itemDetails">
                    <h2>{this.props.item.item_name}</h2>
                    <h3>Price for one item : ${this.props.item.item_price}</h3>
                </div>
                <div className="left total"> <h1>${this.state.total_price}.00</h1></div>
            </div>
        )
    }
}



export default Item