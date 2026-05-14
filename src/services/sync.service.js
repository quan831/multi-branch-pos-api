const Order = require("../models/order.model");

const orderService = require("./order.service");

const syncOrders = async (orders) => {

    if (!orders || !Array.isArray(orders)) {
        throw new Error("Orders array is required");
    }

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

module.exports = {
    syncOrders,
    getSyncStatus
};