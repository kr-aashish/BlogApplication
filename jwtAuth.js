const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'secretKey');

        // Attach the decoded payload to the request object
        req.userId = decoded.userId;

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = { verifyToken };