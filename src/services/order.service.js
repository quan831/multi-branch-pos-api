const sequelize = require("../config/database");

const Order = require("../models/order.model");
const OrderItem = require("../models/order-item.model");

const Product = require("../models/product.model");
const Inventory = require("../models/inventory.model");

const Branch = require("../models/branch.model");
const User = require("../models/user.model");
const Customer = require("../models/customer.model");

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

        // ===== VALIDATION =====

        if (!items || items.length === 0) {
            throw new Error("Order items are required");
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

        // ===== CHECK BRANCH =====

        const branch = await Branch.findByPk(
            branchId
        );

        if (!branch) {
            throw new Error("Branch not found");
        }

        // ===== CHECK STAFF =====

        const staff = await User.findByPk(
            staffId
        );

        if (!staff) {
            throw new Error("Staff not found");
        }

        // ===== CHECK CUSTOMER =====

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

        // ===== CREATE ORDER =====

        let totalAmount = 0;

        const order = await Order.create({
            staffId,
            branchId,
            customerId,
            paymentMethod,
            totalAmount: 0
        }, { transaction });

        // ===== PROCESS ITEMS =====

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

            // ===== CHECK PRODUCT =====

            const product =
                await Product.findByPk(
                    item.productId
                );

            if (!product) {
                throw new Error(
                    `Product ${item.productId} not found`
                );
            }

            // ===== CHECK INVENTORY =====

            const inventory =
                await Inventory.findOne({
                    where: {
                        productId: item.productId,
                        branchId
                    }
                });

            if (!inventory) {
                throw new Error(
                    `Inventory for product ${item.productId} not found`
                );
            }

            // ===== CHECK STOCK =====

            if (
                inventory.quantity <
                item.quantity
            ) {
                throw new Error(
                    `Insufficient stock for ${product.name}`
                );
            }

            // ===== CALCULATE =====

            const subtotal =
                product.price *
                item.quantity;

            totalAmount += subtotal;

            // ===== CREATE ORDER ITEM =====

            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: product.price
            }, { transaction });

            // ===== UPDATE INVENTORY =====

            inventory.quantity -=
                item.quantity;

            await inventory.save({
                transaction
            });
        }

        // ===== UPDATE TOTAL =====

        order.totalAmount = totalAmount;

        await order.save({
            transaction
        });

        await transaction.commit();

        return await Order.findByPk(
            order.id,
            {
                include: [
                    OrderItem
                ]
            }
        );

    } catch (error) {

        await transaction.rollback();

        throw error;
    }
};

module.exports = {
    createOrder
};