const app = require("./src/app");
const sequelize = require("./src/config/database");

require("./src/models/product.model");

const PORT = 3000;

sequelize.sync()
    .then(() => {
        console.log("Database connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.log(err));