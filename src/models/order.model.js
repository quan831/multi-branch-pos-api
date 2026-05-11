const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    staffId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    branchId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    customerId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    totalAmount: {
        type: DataTypes.REAL,
        allowNull: false,
        defaultValue: 0
    },

    paymentMethod: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    syncStatus: {
        type: DataTypes.TEXT,
        defaultValue: "pending"
    }
});

module.exports = Order;