const jwt = require('jsonwebtoken');

require('dotenv/config');

const secret = process.env.JWT_SECRET;

const validateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        if (!decoded.data.email) {
            return res.status(401).json({ message: 'Expired or invalid token' });
        }
        req.user = decoded.data.email;
    } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }

    next();
};

module.exports = {
    validateToken,
};