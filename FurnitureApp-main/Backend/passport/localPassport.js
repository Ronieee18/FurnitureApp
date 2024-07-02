import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt'
import User from '../models/user.model.js';
import { createToken } from '../utils/tokenManager.js';

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    }, async (email, password, done) => {
    try {
        if(!email || !password){
            return done(null, false, {message: 'email and password are required'});
        }
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return done(null, false, { message: 'Invalid credentials' });
        }
        const token=createToken(user.email,user.name,"7d");
                // console.log(token);
                user.token=token;
        
        return done(null, user);
    } catch (error) {
        return done(error);
    }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
export default passport;