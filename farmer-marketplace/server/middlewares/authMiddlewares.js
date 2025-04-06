const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Authentication failed!' });

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedData.id;
        req.isFarmer = decodedData.isFarmer;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token!' });
    }
};

module.exports = authMiddleware;
