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

const Branch = require("../models/branch.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");

const getAllOrders = async () => {
    return await Order.findAll({
        include: [
            {
                model: OrderItem,
                include: [{ model: Product }]
            },
            { model: Branch },
            { model: User, attributes: ['id', 'username'] }
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
                model: OrderItem,
                include: [{ model: Product }]
            },
            { model: Branch },
            { model: User, attributes: ['id', 'username'] }
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

const getOrdersByBranchId = async (branchId) => {
    return await Order.findAll({
        where: { branchId },
        include: [
            {
                model: OrderItem,
                include: [{ model: Product }]
            },
            { model: Branch },
            { model: User, attributes: ['id', 'username'] }
        ],
        order: [
            ["createdAt", "DESC"]
        ]
    });
};

const getMaxOrderId = async () => {
    return await Order.max('id');
};

module.exports = {
    createOrder,
    createOrderItem,
    getAllOrders,
    getOrderById,
    getOrdersByBranchId,
    deleteOrderItems,
    getMaxOrderId
};