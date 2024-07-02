import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import { asyncHandler } from "../utils/asyncHandler.js";

export const savePassword=asyncHandler(async(req,res)=>{
    try {
        // console.log(req.user);
        const  {password}=req.body;
        const id=req.user._id;
        if(!password){
            return res.status(400).json({message:"password is required"})
        }
        const user=await User.findById(id);
        if (!user) {
            return res
                .status(401)
                .send("User not registered  or token malfunctioned");
            }
        const hashedPass = await bcrypt.hash(password, 10);
        user.password = hashedPass;
        await user.save();
        return res.status(200).json({user});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error!"})
    }
})