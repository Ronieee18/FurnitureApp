import {Router} from 'express'
import passport from 'passport';
import { COOKIE_NAME } from '../constants.js';
import User from '../models/user.model.js';
import { createToken } from '../utils/tokenManager.js';
const authRoutes= Router();
authRoutes.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);
authRoutes.get('/google/start', (req, res) => {
  const redirectUrl = 'http://localhost:8000/auth/google';
  res.json({ url: redirectUrl });
});

authRoutes.get(
    '/google/callback',
    passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login',
    session:true,
    }),
    async(req, res) => {
    // This function will only be called if authentication was successful
    if (!req.isAuthenticated()) {
      // Handle unauthorized access or redirect to login page
        return res.redirect('http://localhost:5173/login');
    }
    const token = req.user.token;
      const expires=new Date();
      expires.setDate(expires.getDate()+7);
      res.cookie(COOKIE_NAME, token, { httpOnly: true,expires, secure: false, signed: true});

    try {
      const user=await User.findById(req.user._id);
      if(user.isNewUser){
        user.isNewUser = false; // Mark the user as not new
        await user.save();
        return res.redirect('http://localhost:5173/createPass');
      }
      else {
        // Redirect to the home page if the user is not new
        return res.redirect('http://localhost:5173');
      }
    } catch (error) {
      console.log(error);
      res.redirect('http://localhost:5173/login');
    }
    // res.redirect('http://localhost:5173')
    


  }
);

authRoutes.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).send('Error logging out');
    }
  });
  return res.status(200).json({message:"logout successfull"})
});

authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    req.login(user, (err) => {
      if (err) return next(err);
      const token = req.user.token;
      const expires=new Date();
      expires.setDate(expires.getDate()+7);
      res.cookie(COOKIE_NAME, token, { httpOnly: true,expires, secure: false, signed: true});
      return res.status(200).json({ user });
    });
  })(req, res, next);
});


export {authRoutes} 