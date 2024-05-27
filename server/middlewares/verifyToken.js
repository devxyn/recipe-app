import 'dotenv/config.js';
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        res.status(403).json({ message: 'Invalid token!' });
      }
      next();
    });
  } else {
    res.status(401).json({ message: 'Unauthorized user!' });
  }
};

export default verifyToken;
