import express from 'express'
import passport from 'passport'
import './passport/google_passport.js'
import './passport/localPassport.js'
import cors from 'cors'
import session from 'express-session'
import { authRoutes } from './routes/authroutes.js';
import User from './models/user.model.js'
import { verifyToken } from './utils/tokenManager.js'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import { furnitureRouter } from './routes/furniture.routes.js'
import { userRoutes } from './routes/user.routes.js'
import { bookingRoutes } from './routes/booking.routes.js'
import router from './routes/stripe.route.js'
dotenv.config();
const app=express();
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
}
    ))
app.use(passport.initialize());
app.use(passport.session());
app.get('/',(req,res)=>{
    res.send('Hello World')
})
app.get('/getUser',verifyToken,async(req,res)=>{
    try {
        // console.log("jwtdata: ",res.locals.jwtData);
        const user=await User.findOne({email:req.user.email});
        // console.log(user);
        return res.status(200).json({user})
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg:"Error getting user"});
    }   
})
app.get('/checkauth',verifyToken,(req,res)=>{
    return res.send("authenticated")
})

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/stripe', router);
app.use('/bookings', bookingRoutes);
app.use('/furniture', furnitureRouter);

export {app}