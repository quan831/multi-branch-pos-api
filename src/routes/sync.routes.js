const express = require("express");

const router = express.Router();

const syncController = require("../controllers/sync.controller");

const verifyToken = require("../middlewares/auth.middleware");

router.post(
    "/orders",
    verifyToken,
    syncController.syncOrders
);

router.get(
    "/status",
    verifyToken,
    syncController.getSyncStatus
);

module.exports = router;