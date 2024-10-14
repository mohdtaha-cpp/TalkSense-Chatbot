import mongoose from "mongoose";
import { User } from "../models/UserModel.js";

export const isAuth = async (req,res,next) => {
    try{
        const user = await User.findById(req.headers.id)
        if(!user)
        {
            return res.status(400).json({message:"Please Register Yourself"})
        }
        req.user = user
        next()
    }catch(error){
       return res.status(500).json({message:error.message})
    }
}