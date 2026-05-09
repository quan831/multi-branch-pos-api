const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/product.routes");
const branchRoutes = require("./routes/branch.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);
app.use("/branches", branchRoutes);

module.exports = app;