import User from '../model/user.model.js';
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs';
import { ApiResponse } from '../utils/ApiResponse.js';


export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if ([name, email, password].some((field) => field?.trim() === '')) {
      return res.status(400).json({error : true ,message : 'all fields are required'});

    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({error : true ,message : 'user already exists'});

    user = new User({ name, email, password, role });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY, }
    );
    return res
      .status(201)
      .json(new ApiResponse(200, {user , token}, 'User registered Successfully'));

  } catch (error) {
    console.log('ERROR WHILE REGISTERING USER :: ', error.message);
    return res
        .status(500)
        .json({message : 'internal server error'});
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)  return res
    .status(400)
    .json({error : true , message : 'user not found'});
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)  return res
    .status(400)
    .json({error : true ,message : 'invalid password'});
    
    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
      );

      return res
        .status(201)
        .json(new ApiResponse(200, {user , token}, 'User loged in Successfully'));

  } catch (error) {
    console.log('ERROR WHILE REGISTERING USER :: ', error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};


export const logout = async (req,res) =>{
    req.user = null;
    console.log(req.user);
    
    return res.status(200).json({messgae : 'logout out'})
}