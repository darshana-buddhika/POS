const express = require('express');
const orderRoutes = express.Router();
const { getOrders, addOrder, updateItem, removeItem, addItem } = require('./order.services');

orderRoutes.get('/', (req, res) => {
    console.log(req.decoded)
    const user_id = req.decoded.user_id;

    if (user_id) {
        getOrders(user_id)
            .then((response) => {
                res.json(response)
            })
            .catch(err => res.json({ status: 500, message: err }))

    } else {
        // error handle
        console.log("No user id in the decoded token")
    }
});

orderRoutes.post('/addOrder', (req, res) => {
    const order = req.body.order;
    const user_id = req.decoded.user_id;

    if (order) {
        console.log(order, user_id);
        order.user_id = user_id;
        addOrder(user_id, order)
            .then((response) => {
                if (response) {
                    // console.log(response);
                    res.json(response);

                } else {
                    res.json({ status: 500, message: "Server error" })
                }

            }).catch((err) => {
                console.error(err);
            })
    }
});

orderRoutes.post('/:order_id/addItem', (req, res) => {
    const order_id = req.params.order_id;
    const user_id = req.decoded.user_id;
    const item = req.body.item;

    if (order_id && item) {
        const order = addItem(user_id, order_id, item);

        order.then((response) => {
            console.log(response)
            if (response) {
                // console.log(response);
                res.json(response);

            } else {
                res.json({ status: 500, message: "Server error" })
            }
        })
            .catch((err) => {
                console.error(err)
            })
    }

})

orderRoutes.delete('/:order_id/deleteItem', (req, res) => {
    const order_id = req.params.order_id;
    const user_id = req.decoded.user_id;
    const item = req.body.item;

    if (order_id) {
        const order = removeItem(user_id, order_id, item)

        order.then((response) => {
            if (response) {
                // console.log(response)
                res.json(response);
            } else {
                res.json({ status: 500, message: "Server error" })
            }


        })
            .catch((err) => {
                console.error(err)
            })
    }

});

orderRoutes.put('/:order_id/updateItem', (req, res) => {
    const order_id = req.params.order_id;
    const user_id = req.decoded.user_id;
    const item = req.body.item;

    if (order_id) {
        const order = updateItem(user_id, order_id, item)

        order.then((response) => {
            if (response) {
                // console.log(response)
                res.json(response);
            } else {
                res.json({ status: 500, message: "Server error" })

            }

        })
            .catch((err) => {
                console.err(err)
            })
    }
});

module.exports = orderRoutes;