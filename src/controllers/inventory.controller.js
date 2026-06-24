const inventoryService = require(
    "../services/inventory.service"
);

const getAllInventories = async (req, res) => {
    try {
        const inventories =
            await inventoryService.getAllInventories(req.user);

        res.status(200).json(inventories);

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getInventoryById = async (req, res) => {
    try {
        const inventory =
            await inventoryService.getInventoryById(
                req.params.id,
                req.user
            );

        if (!inventory) {
            return res.status(404).json({
                message: "Inventory not found"
            });
        }

        res.status(200).json(inventory);

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const createInventory = async (req, res) => {
    try {
        const inventory =
            await inventoryService.createInventory(
                req.body
            );

        res.status(201).json(inventory);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const updateInventory = async (req, res) => {
    try {
        const inventory =
            await inventoryService.updateInventory(
                req.params.id,
                req.body
            );

        if (!inventory) {
            return res.status(404).json({
                message: "Inventory not found"
            });
        }

        res.status(200).json(inventory);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const deleteInventory = async (req, res) => {
    try {
        const deleted =
            await inventoryService.deleteInventory(
                req.params.id
            );

        if (!deleted) {
            return res.status(404).json({
                message: "Inventory not found"
            });
        }

        res.status(200).json({
            message: "Inventory deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    getAllInventories,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory
};