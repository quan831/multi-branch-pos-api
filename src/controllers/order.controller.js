const orderService = require("../services/order.service");

const createOrder = async (req, res) => {

    try {

        const staffId = req.user.id;

        const order =
            await orderService.createOrder({
                staffId,
                ...req.body
            });

        res.status(201).json({
            message: "Order created successfully",
            order
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    createOrder
};