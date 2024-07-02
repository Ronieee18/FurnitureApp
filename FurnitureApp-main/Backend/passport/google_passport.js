import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import dotenv from 'dotenv';
import User from '../models/user.model.js';
import { createToken } from '../utils/tokenManager.js';
dotenv.config();

// console.log(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
        
        },
        async (accessToken, refreshToken, profile, done) => {
            
            try {
                // console.log(profile);
                
                let user = await User.findOne({ email: profile._json.email });
                if (!user) {
                    user = new User({
                    name: profile.displayName,
                    email: profile._json.email,
                    avatar:profile._json.picture
                    });
                    await user.save();
                }
                
                // const token=createToken(profile._json.email,profile.displayName,"7d");
                // console.log(token);
                // user.token=token;
                const token=createToken(profile._json.email,profile.displayName,"7d");
                // console.log(token);
                user.token=token;
                
                return done(null, user);
                } catch (error) {
                return done(error, null);
                }
        }
    )
)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
    const user = await User.findById(id);
    done(null, user);
    } catch (error) {
    done(error, null);
    }
});