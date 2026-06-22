const sequelize = require("./src/config/database");
const Branch = require("./src/models/branch.model");
const User = require("./src/models/user.model");
const Product = require("./src/models/product.model");
const Inventory = require("./src/models/inventory.model");
const bcrypt = require("bcryptjs");
require("./src/models/associations");

async function seed() {
    console.log("Starting seed...");
    await sequelize.sync({ force: true });
    
    const branch1 = await Branch.create({ name: "Hà Nội - Chi nhánh 1", address: "123 Cầu Giấy, Hà Nội" });
    const branch2 = await Branch.create({ name: "TP.HCM - Chi nhánh 2", address: "456 Quận 1, TP.HCM" });
    
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
    if (!adminPassword) {
        throw new Error("Missing DEFAULT_ADMIN_PASSWORD in environment variables");
    }
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    await User.create({
        username: "admin",
        password: hashedPassword,
        role: "admin",
        branchId: branch1.id
    });
    
    await User.create({
        username: "staff1",
        password: hashedPassword,
        role: "staff",
        branchId: branch1.id
    });

    await User.create({
        username: "staff2",
        password: hashedPassword,
        role: "staff",
        branchId: branch2.id
    });
    
    const product1 = await Product.create({
        name: "iPhone 15 Pro",
        price: 999.99,
        description: "Latest Apple flagship with titanium frame"
    });

    const product2 = await Product.create({
        name: "Samsung Galaxy S24 Ultra",
        price: 1199.99,
        description: "Premium Android with AI features and S-Pen"
    });

    const product3 = await Product.create({
        name: "MacBook Air M3",
        price: 1099.00,
        description: "Thin and light laptop with M3 chip"
    });

    // Branch 1 Inventory
    await Inventory.create({ productId: product1.id, branchId: branch1.id, quantity: 15 });
    await Inventory.create({ productId: product2.id, branchId: branch1.id, quantity: 10 });
    await Inventory.create({ productId: product3.id, branchId: branch1.id, quantity: 5 });

    // Branch 2 Inventory
    await Inventory.create({ productId: product1.id, branchId: branch2.id, quantity: 8 });
    await Inventory.create({ productId: product2.id, branchId: branch2.id, quantity: 12 });
    await Inventory.create({ productId: product3.id, branchId: branch2.id, quantity: 0 });

    console.log("Database seeded successfully!");
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
