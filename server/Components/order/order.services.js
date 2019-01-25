const Order = require('./order.model');

// Get all the order from a customer
async function getOrders(user_id) {

    try {
        const orders = await Order.find({ user_id: user_id }).exec();
        return orders;

    } catch (err) {
        console.error(err);
        return { status: 500, message: "Server Error" }
    }

}

// Add new order
async function addOrder(user_id, order) {

    const new_order = new Order(order);
    try {
        return await new_order.save()

    } catch (err) {
        console.error(err);
        return { status: 400, message: err.name }
    }

}

// Add new item to a order
async function addItem(user_id, order_id, item) {

    try {
        const order = await Order.findOneAndUpdate({ user_id: user_id, _id: order_id }, { $push: { items: item } }, { new: true }).exec();
        return order;

    } catch (err) {
        console.error(err);
        return { status: 400, message: err.name }
    }
}

// Remove item from a order
async function removeItem(user_id, order_id, item) {

    try {
        const order = await Order.findOneAndUpdate({ user_id: user_id, _id: order_id }, { $pull: { items: { _id: item._id } } }, { new: true, upsert: false }).exec();
        // console.log(order)
        return order;

    } catch (err) {
        console.error(err);
        return { status: 400, message: err.name }
    }

}

// Update item in the order
async function updateItem(user_id, order_id, item) {
    // Remove the exsisting item from the array
    const order = await removeItem(user_id, order_id, item);


    console.log("this is inside update db acces method", order)
    // Add updated item to the array
    if (order) return addItem(user_id, order_id, item);



}

module.exports = { getOrders, addItem, removeItem, updateItem, addOrder }