require("dotenv").config();
const app = require("./src/app");
const sequelize = require("./src/config/database");

require("./src/models/product.model");
require("./src/models/branch.model");
require("./src/models/user.model");
require("./src/models/customer.model");
require("./src/models/inventory.model");
require("./src/models/order.model");
require("./src/models/order-item.model");
require("./src/models/associations");

const PORT = process.env.PORT || 3000;

sequelize.sync()
    .then(() => {
        console.log("Database connected");

        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`Error: Port ${PORT} is already in use. Please close the process using this port and try again.`);
                process.exit(1);
            } else {
                console.error('Server error:', err);
            }
        });
    })
    .catch(err => {
        console.error("Database connection error:", err);
        process.exit(1);
    });