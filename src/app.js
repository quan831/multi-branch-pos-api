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
const dashboardRoutes = require("./routes/dashboard.routes");
const {swaggerUi, swaggerSpec} = require("./config/swagger");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/products", productRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/inventories", inventoryRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/sync", syncRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
    res.json({ message: "Multi-Branch POS API is running" });
});

app.get("/health", (req, res) => {
    res.json({ status: "UP", timestamp: new Date() });
});

app.use("/api-docs", ...swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;