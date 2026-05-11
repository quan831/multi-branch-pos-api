const Inventory = require("../models/inventory.model");

const getAllInventories = async () => {
    return await Inventory.findAll();
};

const getInventoryById = async (id) => {
    return await Inventory.findByPk(id);
};

const createInventory = async (inventoryData) => {
    return await Inventory.create(inventoryData);
};

const updateInventory = async (id, inventoryData) => {
    const inventory = await Inventory.findByPk(id);

    if (!inventory) {
        return null;
    }

    await inventory.update(inventoryData);

    return inventory;
};

const deleteInventory = async (id) => {
    const inventory = await Inventory.findByPk(id);

    if (!inventory) {
        return null;
    }

    await inventory.destroy();

    return true;
};

module.exports = {
    getAllInventories,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory
};