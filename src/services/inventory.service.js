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