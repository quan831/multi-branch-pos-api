const sequelize = require("../config/database");

const Order = require("../models/order.model");
const OrderItem = require("../models/order-item.model");

const Product = require("../models/product.model");
const Inventory = require("../models/inventory.model");

const createOrder = async (orderData) => {

    const transaction = await sequelize.transaction();

    try {

        const {
            staffId,
            branchId,
            customerId,
            paymentMethod,
            items
        } = orderData;

        let totalAmount = 0;

        const order = await Order.create({
            staffId,
            branchId,
            customerId,
            paymentMethod,
            totalAmount: 0
        }, { transaction });

        for (const item of items) {

            const product = await Product.findByPk(
                item.productId
            );

            if (!product) {
                throw new Error("Product not found");
            }

            const inventory = await Inventory.findOne({
                where: {
                    productId: item.productId,
                    branchId
                }
            });

            if (!inventory) {
                throw new Error("Inventory not found");
            }

            if (inventory.quantity < item.quantity) {
                throw new Error("Insufficient stock");
            }

            const subtotal =
                product.price * item.quantity;

            totalAmount += subtotal;

            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: product.price
            }, { transaction });

            inventory.quantity -= item.quantity;

            await inventory.save({ transaction });
        }

        order.totalAmount = totalAmount;

        await order.save({ transaction });

        await transaction.commit();

        return order;

    } catch (error) {

        await transaction.rollback();

        throw error;
    }
};

module.exports = {
    createOrder
};