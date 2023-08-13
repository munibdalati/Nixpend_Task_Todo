require("dotenv").config({ path: "./config.env" });

const express = require("express");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors");

// Port
const PORT = process.env.PORT || 8080;

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/todo", todoRoutes);

// Home page
app.get("/", (req, res) => {
  res.send("This is the home page");
});

// Connect DB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


  
