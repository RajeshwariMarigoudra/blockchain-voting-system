const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;

// Routes
app.get('/', (req, res) => {
  res.send('Blockchain Voting System Backend');
});

app.listen(5000, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
