const Product = require("./product.model");
const Branch = require("./branch.model");
const Customer = require("./customer.model");
const User = require("./user.model");
const Inventory = require("./inventory.model");

const Order = require("./order.model");
const OrderItem = require("./order-item.model");

User.belongsTo(Branch, {
    foreignKey: "branchId",
    onDelete: "SET NULL"
});

Branch.hasMany(User, {
    foreignKey: "branchId"
});

Order.belongsTo(User, {
    foreignKey: "staffId",
    onDelete: "CASCADE"
});

User.hasMany(Order, {
    foreignKey: "staffId"
});

Order.belongsTo(Branch, {
    foreignKey: "branchId",
    onDelete: "CASCADE"
});

Branch.hasMany(Order, {
    foreignKey: "branchId"
});

Order.belongsTo(Customer, {
    foreignKey: "customerId",
    onDelete: "SET NULL"
});

Customer.hasMany(Order, {
    foreignKey: "customerId"
});

Order.hasMany(OrderItem, {
    foreignKey: "orderId",
    onDelete: "CASCADE"
});

OrderItem.belongsTo(Order, {
    foreignKey: "orderId"
});

OrderItem.belongsTo(Product, {
    foreignKey: "productId",
    onDelete: "CASCADE"
});

Product.hasMany(OrderItem, {
    foreignKey: "productId"
});

Inventory.belongsTo(Product, {
    foreignKey: "productId",
    onDelete: "CASCADE"
});

Product.hasMany(Inventory, {
    foreignKey: "productId"
});

Inventory.belongsTo(Branch, {
    foreignKey: "branchId",
    onDelete: "CASCADE"
});

Branch.hasMany(Inventory, {
    foreignKey: "branchId"
});

module.exports = { Product, Branch, Customer, User, Inventory, Order, OrderItem };