const inventoryRepository = require(
    "../repositories/inventory.repository"
);

const getAllInventories = async () => {
    return await inventoryRepository.getAllInventories();
};

const getInventoryById = async (id) => {
    return await inventoryRepository.getInventoryById(id);
};

const createInventory = async (inventoryData) => {
    if (!inventoryData.productId || !inventoryData.branchId) {
        throw new Error("ProductId and branchId are required");
    }
    if (inventoryData.quantity !== undefined && inventoryData.quantity < 0) {
        throw new Error("Quantity cannot be negative");
    }
    return await inventoryRepository.createInventory(
        inventoryData
    );
};

const updateInventory = async (id, inventoryData) => {
    if (inventoryData.quantity !== undefined && inventoryData.quantity < 0) {
        throw new Error("Quantity cannot be negative");
    }
    return await inventoryRepository.updateInventory(
        id,
        inventoryData
    );
};

const deleteInventory = async (id) => {
    return await inventoryRepository.deleteInventory(id);
};

module.exports = {
    getAllInventories,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory
};