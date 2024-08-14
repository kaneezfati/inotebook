// index.js

const express = require('express');
const connectToMongo = require('./db');

const app = express();
const port = 5000;

// Connect to MongoDB
connectToMongo();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start server
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
