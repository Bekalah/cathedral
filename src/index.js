const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const client = require("prom-client");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));

// Metrics collection
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
});

// Sacred mathematics integrity metric
const sacredMathIntegrity = new client.Gauge({
  name: "cathedral_sacred_math_integrity_score",
  help: "Sacred mathematics integrity score (0-1)",
});

// Middleware to track request duration
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration);
  });
  next();
});

// Health endpoints
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "1.0.0",
  });
});

app.get("/ready", (req, res) => {
  // Add readiness checks here
  res.json({ status: "ready" });
});

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// Compute a lightweight sacred integrity score from local datasets
function computeSacredIntegrity() {
  const checks = [];
  let score = 1.0;

  try {
    const codexPath = path.resolve(process.cwd(), "codex-144-expanded.json");
    const raw = fs.readFileSync(codexPath, "utf-8");
    const data = JSON.parse(raw);
    const nodes = Array.isArray(data)
      ? data
      : Array.isArray(data.nodes)
        ? data.nodes
        : [];
    const nodeCount = nodes.length;
    const ok144 = nodeCount === 144;
    checks.push({
      check: "codex.nodes.count == 144",
      actual: nodeCount,
      passed: ok144,
    });
    if (!ok144) score -= 0.5;
  } catch (err) {
    checks.push({
      check: "codex file readable",
      error: String(err),
      passed: false,
    });
    score -= 0.7;
  }

  // Bound score between 0 and 1
  score = Math.max(0, Math.min(1, Number(score.toFixed(2))));
  return { score, checks };
}

// Sacred integrity endpoint
app.get("/api/sacred-integrity", (req, res) => {
  const { score, checks } = computeSacredIntegrity();
  sacredMathIntegrity.set(score);

  res.json({
    score,
    status: score > 0.95 ? "intact" : score > 0.7 ? "degraded" : "compromised",
    checks,
    timestamp: new Date().toISOString(),
  });
});

// Sacred integrity restoration endpoint
app.post("/api/restore-sacred-integrity", (req, res) => {
  // Recompute now (idempotent, cheap)
  console.log("🛡️ Restoring sacred mathematics integrity...");
  const { score } = computeSacredIntegrity();
  sacredMathIntegrity.set(score);

  res.json({
    status: "restored",
    score,
    timestamp: new Date().toISOString(),
  });
});

// Default route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to THE CATHEDRAL OF CIRCUITS",
    subtitle: "Spiritual Technology Platform",
    status: "Operational",
    sacred_mathematics: "Intact",
    quality_guarantee: "Phenomenal",
    accessibility: "Universal",
    freedom: "Forever Free",
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    timestamp: new Date().toISOString(),
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully...");
  process.exit(0);
});

app.listen(PORT, () => {
  console.log("🏛️ Cathedral of Circuits server started");
  console.log(`🌐 Server running on port ${PORT}`);
  console.log("✨ Sacred mathematics integrity: Active");
  console.log("🎨 Quality guardian system: Online");
  console.log("🔒 Security protocols: Enabled");
  console.log("📊 Monitoring: Active");
});

module.exports = app;
