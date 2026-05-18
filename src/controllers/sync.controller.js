const syncService = require("../services/sync.service");

const syncOrders = async (req, res) => {
    try {
        const result = await syncService.syncOrders(
            req.body.orders
        );

        return res.status(200).json({
            message: "Orders synced successfully",
            data: result
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

const getSyncStatus = async (req, res) => {
    try {
        const result = await syncService.getSyncStatus();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const getPendingOrders = async (req, res) => {
    try {
        const result = await syncService.getPendingOrders();
        return res.status(200).json({
            message: "Pending orders retrieved successfully",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const updateSyncStatus = async (req, res) => {
    try {
        const { orderIds, status } = req.body;
        const result = await syncService.updateSyncStatus(orderIds, status);
        return res.status(200).json({
            message: "Sync status updated successfully",
            data: result
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    syncOrders,
    getSyncStatus,
    getPendingOrders,
    updateSyncStatus
};