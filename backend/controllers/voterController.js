// controllers/voterController.js
const Voter = require('../models/Voter.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Voter Registration
exports.registerVoter = async (req, res) => {
    const { name, email, password, publicKey } = req.body;

    try {
        let voter = await Voter.findOne({ email });
        if (voter) return res.status(400).json({ msg: 'Voter already exists' });

        voter = new Voter({ name, email, password, publicKey });
        await voter.save();

        const payload = { voter: { id: voter.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Voter Login
exports.loginVoter = async (req, res) => {
    const { email, password } = req.body;

    try {
        let voter = await Voter.findOne({ email });
        if (!voter) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, voter.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const payload = { voter: { id: voter.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) {
        res.status(500).send('Server error');
    }
};
