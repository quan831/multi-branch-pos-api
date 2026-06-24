const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Customer = sequelize.define("Customer", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    phone: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false
    },

    email: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: true
    },

    address: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = Customer;