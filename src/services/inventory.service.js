const inventoryRepository = require(
    "../repositories/inventory.repository"
);

const getAllInventories = async (user) => {
    if (user && user.role === "staff") {
        return await inventoryRepository.getInventoriesByBranchId(user.branchId);
    }
    return await inventoryRepository.getAllInventories();
};

const getInventoryById = async (id, user) => {
    const inventory = await inventoryRepository.getInventoryById(id);
    if (user && user.role === "staff" && inventory && inventory.branchId !== user.branchId) {
        return null;
    }
    return inventory;
};

const createInventory = async (inventoryData) => {
    return await inventoryRepository.createInventory(
        inventoryData
    );
};

const updateInventory = async (id, inventoryData) => {
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