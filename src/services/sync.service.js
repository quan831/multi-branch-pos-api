const Order = require("../models/order.model");
const OrderItem = require("../models/order-item.model");

const orderService = require("./order.service");

const syncOrders = async (orders) => {

    const syncedOrders = [];

    for (const order of orders) {

        const createdOrder =
            await orderService.createOrder(order);

        await Order.update(
            {
                syncStatus: "synced"
            },
            {
                where: {
                    id: createdOrder.id
                }
            }
        );

        createdOrder.syncStatus = "synced";
        syncedOrders.push(createdOrder);

    }

    return syncedOrders;

};

const getSyncStatus = async () => {

    const pending =
        await Order.count({
            where: {
                syncStatus: "pending"
            }
        });

    const synced =
        await Order.count({
            where: {
                syncStatus: "synced"
            }
        });

    const failed =
        await Order.count({
            where: {
                syncStatus: "failed"
            }
        });

    return {
        pending,
        synced,
        failed
    };

};

const getPendingOrders = async () => {
    const orders = await Order.findAll({
        where: { syncStatus: "pending" },
        include: [{ model: OrderItem }]
    });

    return orders.map(order => {
        return {
            id: order.id,
            staffId: order.staffId,
            branchId: order.branchId,
            customerId: order.customerId,
            paymentMethod: order.paymentMethod,
            totalAmount: order.totalAmount,
            createdAt: order.createdAt,
            items: order.OrderItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            }))
        };
    });
};

const updateSyncStatus = async (orderIds, status = "synced") => {

    await Order.update(
        { syncStatus: status },
        {
            where: {
                id: orderIds
            }
        }
    );

    return { success: true, updatedCount: orderIds.length };
};

module.exports = {
    syncOrders,
    getSyncStatus,
    getPendingOrders,
    updateSyncStatus
};