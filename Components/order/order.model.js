const mongoose = require('monfoose');
const Schema = mongoose.Schema;

const order = Schema(
    {
        id: { type: Number, required: true, unique: true },
        coustomer_id: { type: Number, require: true },
        items: [{
            item_name: { type: String, required: true },
            item_quntity: { type: String, required: true }
        }],
        created_date: { type: Date, default: Date.now() },
    }
)