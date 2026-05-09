const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    price: {
        type: DataTypes.REAL,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT
    }
});

module.exports = Product;