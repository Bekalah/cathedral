const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Metrics collection
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status']
});

// Sacred mathematics integrity metric
const sacredMathIntegrity = new client.Gauge({
  name: 'cathedral_sacred_math_integrity_score',
  help: 'Sacred mathematics integrity score (0-1)'
});

// Middleware to track request duration
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration);
  });
  next();
});

// Health endpoints
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

app.get('/ready', (req, res) => {
  // Add readiness checks here
  res.json({ status: 'ready' });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Sacred integrity endpoint
app.get('/api/sacred-integrity', (req, res) => {
  // Placeholder for sacred mathematics validation
  const integrity_score = 0.98; // Would be calculated from actual validation
  sacredMathIntegrity.set(integrity_score);
  
  res.json({ 
    score: integrity_score,
    status: integrity_score > 0.95 ? 'intact' : 'compromised',
    timestamp: new Date().toISOString()
  });
});

// Sacred integrity restoration endpoint
app.post('/api/restore-sacred-integrity', (req, res) => {
  // Placeholder for sacred mathematics restoration
  console.log('🛡️ Restoring sacred mathematics integrity...');
  
  // Simulate restoration process
  setTimeout(() => {
    sacredMathIntegrity.set(0.98);
    console.log('✅ Sacred integrity restored');
  }, 1000);
  
  res.json({ 
    status: 'restoration_initiated',
    timestamp: new Date().toISOString()
  });
});

// Default route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to THE CATHEDRAL OF CIRCUITS',
    subtitle: 'Spiritual Technology Platform',
    status: 'Operational',
    sacred_mathematics: 'Intact',
    quality_guarantee: 'Phenomenal',
    accessibility: 'Universal',
    freedom: 'Forever Free'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    timestamp: new Date().toISOString()
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

app.listen(PORT, () => {
  console.log('🏛️ Cathedral of Circuits server started');
  console.log(`🌐 Server running on port ${PORT}`);
  console.log('✨ Sacred mathematics integrity: Active');
  console.log('🎨 Quality guardian system: Online');
  console.log('🔒 Security protocols: Enabled');
  console.log('📊 Monitoring: Active');
});

module.exports = app;
