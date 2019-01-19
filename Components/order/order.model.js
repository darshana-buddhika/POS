const mongoose = require('monfoose');
const Schema = mongoose.Schema;

const order = Schema(
    {
        id : {type: Number, required : true, unique: true},
        items : [],
        created_date: { type: Date, default: Date.now() },
    }
)