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

module.exports = {
    syncOrders,
    getSyncStatus
};