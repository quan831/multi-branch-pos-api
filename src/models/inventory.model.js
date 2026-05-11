const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Inventory = sequelize.define("Inventory", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    branchId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = Inventory;