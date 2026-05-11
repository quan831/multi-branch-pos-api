const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/product.routes");
const branchRoutes = require("./routes/branch.routes");
const authRoutes = require("./routes/auth.routes");
const customerRoutes = require("./routes/customer.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);
app.use("/branches", branchRoutes);
app.use("/auth", authRoutes);
app.use("/customers", customerRoutes);

module.exports = app;