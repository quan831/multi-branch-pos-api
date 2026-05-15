const orderService = require("../services/order.service");

const getAllOrders = async (req, res) => {

    try {

        const orders =
            await orderService.getAllOrders();

        res.status(200).json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const getOrderHistory = async (req, res) => {
    try {
        const { branchId } = req.query;
        const orders = await orderService.getOrderHistory(req.user, branchId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getOrderById = async (req, res) => {

    try {

        const order =
            await orderService.getOrderById(
                req.params.id
            );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const deleteOrder = async (req, res) => {

    try {

        await orderService.deleteOrder(
            req.params.id
        );

        res.status(200).json({
            message:
                "Order deleted successfully"
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });
    }
};

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
    createOrder,
    getAllOrders,
    getOrderHistory,
    getOrderById,
    deleteOrder
};