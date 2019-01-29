const Order = require('./order.model');

// Get all the Orders from a customer
async function getOrders(user_id) {

    try {
        const orders = await Order.find({ user_id: user_id }).exec();
        return { status: 200, message: orders };

    } catch (err) {
        console.error(err);
        return { status: 500, message: "Server Error" }
    }

}

// Get a order from a customer
async function getOrder(user_id, order_id) {

    try {
        const order = await Order.findOne({ user_id: user_id, _id: order_id }).exec();
        console.log(order)
        return { status: 200, message: order };

    } catch (err) {
        console.error(err);
        return { status: 500, message: "Server Error" }
    }

}

// Add new order
async function addOrder(order) {
    console.log(order)
    const new_order = new Order(order);
    try {
        return await new_order.save()

    } catch (err) {
        console.error(err);
        return { status: 400, message: err.name }
    }

}

async function deleteOrder(order_id) {
    try {
        const order = await Order.findOne({ _id: order_id }).remove().exec();
        return { status: 200, message: "Successfully removed" };

    } catch (err) {
        console.error(err);
        return { status: 400, message: err.name }
    }
}

// Add new item to a order
async function addItem(user_id, order_id, item, new_total) {

    try {
        const order = await Order.findOneAndUpdate({ user_id: user_id, _id: order_id }, { $push: { items: item }, $set: { order_amount: new_total } }, { new: true }).exec();
        return { status: 200, message: order };

    } catch (err) {
        console.error(err);
        return { status: 400, message: err.name }
    }
}

// Remove item from a order
async function removeItem(user_id, order_id, item) {

    try {
        console.log("this is the item id",item)
        const order = await Order.findOneAndUpdate({ user_id: user_id, _id: order_id }, { $pull: { items: { _id: item._id } } }, { new: true, upsert: false }).exec();
        // console.log(order)
        return { status: 200, message: order };

    } catch (err) {
        console.error(err);
        return { status: 400, message: err.name }
    }

}

// Update item in the order
async function updateItem(user_id, order_id, item, new_total) {
    // Remove the exsisting item from the array
    const order = await removeItem(user_id, order_id, item);


    console.log("this is inside update db acces method", order)
    // Add updated item to the array
    if (order) return addItem(user_id, order_id, item, new_total);



}

module.exports = { getOrder, getOrders, addItem, removeItem, updateItem, addOrder, deleteOrder }