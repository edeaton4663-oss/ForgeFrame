import express from 'express';
import path from 'path';

const app = express();

// Use the dynamic port provided by Railway, or default to 3000 locally
const PORT = process.env.PORT || 3000;

// Resolve directory paths cleanly using path.resolve for ES Modules
const distPath = path.resolve('dist');

// 1. Serve compiled production static assets
app.use(express.static(distPath));

// 2. Fallback routing for SPA client pathways
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// 3. Start the server on host 0.0.0.0 to accept Railway proxies
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running securely on port ${PORT}`);
});
