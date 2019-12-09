const jwt = require('jsonwebtoken');

module.exports = function generateToken(payload) {
    return jwt.sign(payload, process.env.PASSWORD_SECRET, { expiresIn: '7d' });
}