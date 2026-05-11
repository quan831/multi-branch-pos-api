require("dotenv").config();
const app = require("./src/app");
const sequelize = require("./src/config/database");

require("./src/models/product.model");
require("./src/models/branch.model");
require("./src/models/user.model");
require("./src/models/customer.model");

const PORT = process.env.PORT;

sequelize.sync()
    .then(() => {
        console.log("Database connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.log(err));