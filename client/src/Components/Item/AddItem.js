import React, { Component } from 'react';
// Items that a user can buy
const Items = [
    {
        item_name: "Cake",
        item_price: 5.00
    },
    {
        item_name: "Bread",
        item_price: 10.00
    }, {
        item_name: "Burger",
        item_price: 12.00
    }, {
        item_name: "Pizza",
        item_price: 22.00
    }, {
        item_name: "Sandwich",
        item_price: 8.00
    },
]

class AddItem extends Component {
    constructor() {
        super()
        this.state = {
            item_name: "",
            item_quantity: null

        }

    }

    handleQuntityChange = (event) => {
        var quantity = event.target.value;
        (quantity > 0) ? this.setState({ item_quantity: quantity }) : this.setState({ error: "Quentity should be a Positive Number" })
    }

    handleSelectItem = (event) => {

        const item_name = event.target.value;
        console.log(item_name)
        this.setState({ item_name: item_name })
    }

    handleAddButton = () => {
        if (this.state.item_name != "" && this.state.item_quantity != null) {

            const item = Items.find(item => item.item_name == this.state.item_name)
            item.item_quantity = this.state.item_quantity;
            console.log(item)
            this.props.handleAddItem(item);

        } else {
            this.setState({ error: "Select item and Quantitiy" })
        }
    }



    render() {
        return (
            <div className="addItem">
                <h1>Add New Item</h1>

                <div className="addItemForm">
                    <div>
                        <label>Item</label>
                        <select onChange={this.handleSelectItem}>
                            {Items.map((item, index) => {
                                return <option key={index} value={item.item_name}>{item.item_name}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Quantity </label>
                        <input onChange={this.handleQuntityChange} type="Number" min="1"></input>
                    </div>
                    <div className="buttons">
                        <button onClick={this.handleAddButton}>Add</button>
                        <button className="left" onClick={this.props.handleCancel}>Cancel</button>
                    </div>
                    <div>{this.state.error}</div>
                </div>
            </div>
        )
    }
}

export default AddItem