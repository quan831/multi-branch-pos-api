const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    role: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    branchId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

module.exports = User;