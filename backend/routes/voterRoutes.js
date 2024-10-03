// routes/voterRoutes.js
const express = require('express');
const { registerVoter, loginVoter } = require('../controllers/voterController');
const auth = require('../middleware/auth');

const router = express.Router();

// Register Voter
router.post('/register', registerVoter);

// Login Voter
router.post('/login', loginVoter);

module.exports = router;
