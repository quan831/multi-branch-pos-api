const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Branch = sequelize.define("Branch", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    phone: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = Branch;