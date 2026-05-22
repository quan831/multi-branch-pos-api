const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./utils/logger");

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
const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : "combined";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

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