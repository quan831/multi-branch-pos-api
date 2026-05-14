const sequelize = require("./src/config/database");
const Branch = require("./src/models/branch.model");
const User = require("./src/models/user.model");
const Product = require("./src/models/product.model");
const Inventory = require("./src/models/inventory.model");
const bcrypt = require("bcryptjs");

async function seed() {
    await sequelize.sync({ force: true });
    
    const branch1 = await Branch.create({ name: "Branch 1", address: "123 Street" });
    const branch2 = await Branch.create({ name: "Branch 2", address: "456 Avenue" });
    
    const hashedPassword = await bcrypt.hash("password123", 10);
    
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
        name: "IPhone 15",
        price: 1000,
        description: "Latest Apple Phone"
    });

    const product2 = await Product.create({
        name: "Samsung S24",
        price: 900,
        description: "Latest Samsung Phone"
    });

    await Inventory.create({
        productId: product1.id,
        branchId: branch1.id,
        quantity: 10
    });

    await Inventory.create({
        productId: product1.id,
        branchId: branch2.id,
        quantity: 5
    });

    await Inventory.create({
        productId: product2.id,
        branchId: branch1.id,
        quantity: 20
    });

    console.log("Database seeded successfully!");
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
