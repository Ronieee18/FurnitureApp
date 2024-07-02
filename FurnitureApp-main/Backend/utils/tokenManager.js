import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { COOKIE_NAME } from '../constants.js';
import User from '../models/user.model.js'; // Adjust the import path as needed

dotenv.config();

export const createToken = (email, name, expiresIn) => {
  const payload = { email, name };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  return token;
};

export const verifyToken = async (req, res, next) => {
  // console.log(req.signedCookies);
  const token = req.signedCookies[`${COOKIE_NAME}`];
  // console.log(token);

  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    const success = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(decoded);
        }
      });
    });

    // console.log("success:", success);
    res.locals.jwtData = success;

    // Find user by email
    const user = await User.findOne({ email: success.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Set req.user with the found user
    req.user = user;
    return next();

  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Token expired" });
  }
};
