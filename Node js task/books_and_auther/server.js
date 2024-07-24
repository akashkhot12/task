// app.js
const express = require('express');
const booksRoutes = require('./router/router');
const { connectToDb } = require('./connections');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', booksRoutes);

// Start the server
app.listen(port, async () => {
  await connectToDb();
  console.log(`Server running at http://localhost:${port}`);
});
