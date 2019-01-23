const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const order = Schema(
    {
        id: { type: Number, required: true, unique: true },
        status: { type: Boolean, required: true },
        user_id: { type: Number, require: true },
        items: [{
            item_name: { type: String, required: true },
            item_quntity: { type: String, required: true },
            item_price: { type: Number, required: true }
        }],
        order_amount: { type: Number, required: true },
        created_date: { type: Date, default: Date.now() },
    }
)
    
module.exports = mongoose.model("Order", order)