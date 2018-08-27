const jwt = require('jsonwebtoken');
const config = require('config');
const { privateConfig } = require('config/private-config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // 401 - The client doesn't have auth credentials to access the resource
    if (!token) return res.status(401).send('Access denied! No token provided.');

    try {
        req.user = jwt.verify(token, privateConfig.secretKey); // Returns decoded data (user._id)
        next();
    }
    catch(ex) {
        res.status(400).send('Invalid token.');
    }
}

module.exports = auth;