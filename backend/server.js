// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const voterRoutes = require('./routes/voterRoutes.js');

dotenv.config();
console.log('MongoDB URI:', process.env.MONGODB_URI);

const app = express();
connectDB();

app.use(express.json());
app.use('/api/voters', voterRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
