import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  // Set proper MIME types for JavaScript modules
  app.use((req, res, next) => {
    if (req.path.endsWith('.js')) {
      res.setHeader('Content-Type', 'text/javascript');
    } else if (req.path.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'text/javascript');
    } else if (req.path.endsWith('.ts') || req.path.endsWith('.tsx')) {
      res.setHeader('Content-Type', 'text/javascript');
    }
    next();
  });

  // Serve static files from the dist directory in production
  app.use(express.static(path.resolve(__dirname, 'dist')));

  // Fallback to index.html for SPA routing
  app.use('*', async (req, res) => {
    // In production, serve the built index.html
    if (process.env.NODE_ENV === 'production') {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    } else {
      // In development, let Vite handle it
      next();
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer();
