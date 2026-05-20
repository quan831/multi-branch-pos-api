const sequelize = require("../config/database");

const Product = require("../models/product.model");
const Inventory = require("../models/inventory.model");

const Branch = require("../models/branch.model");
const User = require("../models/user.model");
const Customer = require("../models/customer.model");

const orderRepository = require("../repositories/order.repository");

const createOrder = async (orderData) => {

    const transaction =
        await sequelize.transaction();

    try {

        const {
            staffId,
            branchId,
            customerId,
            paymentMethod,
            items
        } = orderData;

        if (!items || items.length === 0) {
            throw new Error(
                "Order items are required"
            );
        }

        const validPaymentMethods = [
            "cash",
            "card",
            "transfer"
        ];

        if (
            !validPaymentMethods.includes(
                paymentMethod
            )
        ) {
            throw new Error(
                "Invalid payment method"
            );
        }

        const branch =
            await Branch.findByPk(
                branchId
            );

        if (!branch) {
            throw new Error(
                "Branch not found"
            );
        }

        const staff =
            await User.findByPk(
                staffId
            );

        if (!staff) {
            throw new Error(
                "Staff not found"
            );
        }

        if (staff.role === "staff" && staff.branchId !== branchId) {
            throw new Error(
                "Staff cannot create order for another branch"
            );
        }

        if (customerId) {

            const customer =
                await Customer.findByPk(
                    customerId
                );

            if (!customer) {
                throw new Error(
                    "Customer not found"
                );
            }
        }

        let totalAmount = 0;

        const order =
            await orderRepository.createOrder({
                staffId,
                branchId,
                customerId,
                paymentMethod,
                totalAmount: 0
            }, transaction);

        for (const item of items) {

            if (
                !item.productId ||
                !item.quantity
            ) {
                throw new Error(
                    "Invalid order item"
                );
            }

            if (item.quantity <= 0) {
                throw new Error(
                    "Quantity must be greater than 0"
                );
            }

            const product =
                await Product.findByPk(
                    item.productId
                );

            if (!product) {
                throw new Error(
                    `Product ${item.productId} not found`
                );
            }

            const inventory =
                await Inventory.findOne({
                    where: {
                        productId:
                        item.productId,
                        branchId
                    }
                });

            if (!inventory) {
                throw new Error(
                    `Inventory for product ${item.productId} not found`
                );
            }

            if (
                inventory.quantity <
                item.quantity
            ) {
                throw new Error(
                    `Insufficient stock for ${product.name}`
                );
            }

            const subtotal =
                product.price *
                item.quantity;

            totalAmount += subtotal;

            await orderRepository.createOrderItem({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: product.price
            }, transaction);

            inventory.quantity -=
                item.quantity;

            await inventory.save({
                transaction
            });
        }

        order.totalAmount = totalAmount;

        await order.save({
            transaction
        });

        await transaction.commit();

        return await orderRepository.getOrderById(
            order.id
        );

    } catch (error) {

        await transaction.rollback();

        throw error;
    }
};

const getAllOrders = async () => {

    return await orderRepository.getAllOrders();
};

const getOrderHistory = async (user, branchId) => {
    if (user.role === "admin") {
        if (branchId && branchId !== "all") {
            return await orderRepository.getOrdersByBranchId(branchId);
        }
        return await orderRepository.getAllOrders();
    } else {
        return await orderRepository.getOrdersByBranchId(user.branchId);
    }
};

const getOrderById = async (id) => {

    const order =
        await orderRepository.getOrderById(id);

    if (!order) {
        throw new Error(
            "Order not found"
        );
    }

    return order;
};

const deleteOrder = async (id) => {

    const transaction =
        await sequelize.transaction();

    try {

        const order =
            await orderRepository.getOrderById(id);

        if (!order) {
            throw new Error(
                "Order not found"
            );
        }

        for (const item of order.OrderItems) {

            const inventory =
                await Inventory.findOne({
                    where: {
                        productId:
                        item.productId,
                        branchId:
                        order.branchId
                    }
                });

            if (inventory) {

                inventory.quantity +=
                    item.quantity;

                await inventory.save({
                    transaction
                });
            }
        }

        await orderRepository.deleteOrderItems(
            order.id,
            transaction
        );

        await order.destroy({
            transaction
        });

        await transaction.commit();

        return true;

    } catch (error) {

        await transaction.rollback();

        throw error;
    }
};

const getNextOrderId = async () => {
    const maxId = await orderRepository.getMaxOrderId();
    return maxId ? maxId + 1 : 1;
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderHistory,
    getOrderById,
    deleteOrder,
    getNextOrderId
};