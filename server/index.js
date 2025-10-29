import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ipRoutes from './src/routes/intel.routes.js';

dotenv.config();

const app = express(); // Create an express application
const PORT = process.env.PORT; // Get the port from the .env file

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

/* Routes */
app.use('/api/intel', ipRoutes); // All routes will start with /api/intel

/* Error handling */
// 500 Internal Server Error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      message: 'internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : 'internal server error',
      timestamp: new Date().toISOString() // Return the current timestamp
    });
  });
  
// 404 Not Found Error
app.use((req, res) => {
  res.status(404).json({
    message: 'page not found',
    path: req.originalUrl, // Return the original URL that was requested
    timestamp: new Date().toISOString() // Return the current timestamp
  });
});

// Start the server, listen for incoming requests on the port in the .env file
app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
  console.log(`Open your browser at: http://localhost:${PORT}`);
});

export default app;


