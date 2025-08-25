const express = require("express");
const cors = require("cors");

const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();


const auditRoutes = require("./auditRoutes.js");
const userRoutes = require("./userRoutes.js");
const historyRoutes = require("./history.js");


const app = express();
const report = require('./report.json');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/audit", auditRoutes);
app.use("/users", userRoutes);
app.use("/history", historyRoutes);


// Root
app.get("/audit", (req, res) => {
  res.json(report);

});

app.post('/audit', (req, res) => {
 const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  // Temporary dummy audit response
  res.json({
    url,
    performance: 85,
    accessibility: 92,
    seo: 78,
    security: "OK"
  });
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});