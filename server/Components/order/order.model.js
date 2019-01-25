const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const order = Schema(
    {
        id: { type: Number, required: true },
        status: { type: Boolean, default: false },
        user_id: { type: Number, require: true },
        items: [{
            item_name: { type: String, },
            item_quntity: { type: String, },
            item_price: { type: Number, }
        }],
        order_amount: { type: Number, default: 0 },
        created_date: { type: Date, default: Date.now() },
    }
)

module.exports = mongoose.model("Order", order)