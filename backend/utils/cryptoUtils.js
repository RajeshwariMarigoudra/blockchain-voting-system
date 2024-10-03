// utils/cryptoUtils.js
const crypto = require('crypto');

// Generate a SHA-256 hash
exports.generateHash = (data) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

// Function to verify a hash
exports.verifyHash = (data, hash) => {
  const generatedHash = this.generateHash(data);
  return generatedHash === hash;
};
