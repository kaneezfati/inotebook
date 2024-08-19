// index.js

const express = require("express");
var cors = require("cors");
const connectToMongo = require("./db");

const app = express();
const port = 5000;

app.use(cors());
// Connect to MongoDB
connectToMongo();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Start server
app.listen(port, () => {
  console.log(`iNotebook backend listening on http://localhost:${port}`);
});
