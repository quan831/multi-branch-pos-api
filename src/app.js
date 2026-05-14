const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const productRoutes = require("./routes/product.routes");
const branchRoutes = require("./routes/branch.routes");
const authRoutes = require("./routes/auth.routes");
const customerRoutes = require("./routes/customer.routes");
const inventoryRoutes = require("./routes/inventory.routes");
const orderRoutes = require("./routes/order.routes");
const syncRoutes = require("./routes/sync.routes");
const {swaggerUi, swaggerSpec} = require("./config/swagger");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/products", productRoutes);
app.use("/branches", branchRoutes);
app.use("/auth", authRoutes);
app.use("/customers", customerRoutes);
app.use("/inventories", inventoryRoutes);
app.use("/orders", orderRoutes);
app.use("/sync", syncRoutes);
app.use("/api-docs", ...swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;