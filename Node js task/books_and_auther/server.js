// app.js
const express = require('express');
const booksRoutes = require('./router/books.router');
const authorsRoutes = require('./router/author.route');
const { connectToDb } = require('./connections');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', booksRoutes);
app.use('/api', authorsRoutes);

// Start the server
app.listen(port, async () => {
  await connectToDb();
  console.log(`Server running at http://localhost:${port}`);
});
