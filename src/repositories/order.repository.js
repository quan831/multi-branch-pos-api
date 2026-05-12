const Order = require("../models/order.model");

const OrderItem = require(
    "../models/order-item.model"
);

const createOrder = async (
    orderData,
    transaction
) => {

    return await Order.create(
        orderData,
        { transaction }
    );
};

const createOrderItem = async (
    itemData,
    transaction
) => {

    return await OrderItem.create(
        itemData,
        { transaction }
    );
};

const getAllOrders = async () => {

    return await Order.findAll({
        include: [
            {
                model: OrderItem
            }
        ],
        order: [
            ["createdAt", "DESC"]
        ]
    });
};

const getOrderById = async (id) => {

    return await Order.findByPk(id, {
        include: [
            {
                model: OrderItem
            }
        ]
    });
};

const deleteOrderItems = async (
    orderId,
    transaction
) => {

    return await OrderItem.destroy({
        where: {
            orderId
        },
        transaction
    });
};

module.exports = {
    createOrder,
    createOrderItem,
    getAllOrders,
    getOrderById,
    deleteOrderItems
};