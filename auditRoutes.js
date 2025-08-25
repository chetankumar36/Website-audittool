const express = require("express");
const router = express.Router();
const auditController = require("./auditController");
const authMiddleware = require("./auth");


// POST /api/audit/run
router.post("/run", authMiddleware, auditController.runAudit);

module.exports = router;