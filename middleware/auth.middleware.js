import User from '../model/user.model.js';
import jwt from 'jsonwebtoken';

export const verifyJWT = async (req, res, next) => {
  try {
    const token =req.header('Authorization')?.replace('Bearer ', '');
  
    // console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'unathorized' });
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
    // console.log(decodedToken);
    
    const user = await User.findById(decodedToken?.userId).select(
      '-password -refreshToken'
    );

    if (!user) {
      return res.status(401).json({ message: 'invalid access token' });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'internal server error' });
  }
};


