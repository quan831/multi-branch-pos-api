const Product = require("./product.model");
const Branch = require("./branch.model");
const Customer = require("./customer.model");
const User = require("./user.model");
const Inventory = require("./inventory.model");

const Order = require("./order.model");
const OrderItem = require("./order-item.model");

User.belongsTo(Branch, {
    foreignKey: "branchId"
});

Branch.hasMany(User, {
    foreignKey: "branchId"
});

Order.belongsTo(User, {
    foreignKey: "staffId"
});

User.hasMany(Order, {
    foreignKey: "staffId"
});

Order.belongsTo(Branch, {
    foreignKey: "branchId"
});

Branch.hasMany(Order, {
    foreignKey: "branchId"
});

Order.belongsTo(Customer, {
    foreignKey: "customerId"
});

Customer.hasMany(Order, {
    foreignKey: "customerId"
});

Order.hasMany(OrderItem, {
    foreignKey: "orderId"
});

OrderItem.belongsTo(Order, {
    foreignKey: "orderId"
});

OrderItem.belongsTo(Product, {
    foreignKey: "productId"
});

Product.hasMany(OrderItem, {
    foreignKey: "productId"
});

Inventory.belongsTo(Product, {
    foreignKey: "productId"
});

Product.hasMany(Inventory, {
    foreignKey: "productId"
});

Inventory.belongsTo(Branch, {
    foreignKey: "branchId"
});

Branch.hasMany(Inventory, {
    foreignKey: "branchId"
});