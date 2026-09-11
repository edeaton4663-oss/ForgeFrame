import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Use the dynamic port provided by Railway, or default to 3000 locally
const PORT = process.env.PORT || 3000;

// 1. Serve static files from your compiled production directory
app.use(express.static(join(__dirname, 'dist')));

// 2. Fallback to index.html for client-side routing (SPAs)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// 3. Start the server (Only call app.listen ONCE at the very end)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running securely on port ${PORT}`);
});
