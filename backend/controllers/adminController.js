import { User } from "../models/UserModel.js";
import {Chat} from '../models/ChatModel.js'
import { Conversation } from "../models/ConversationModel.js";

export const userDetails = async(req,res) => {
    try{
        const admin = ["670a6af5b05f230f57d737ff","670cc64d7d8a21c390aab897"]
        if(!admin.includes(req.params.userId))
        {
            return res.status(400).json({
                message: "Sorry but you're not Admin"
            })
        }
        const user = await User.find({}).sort({
            created:-1
        }).select("_id userName")
        let response = []
        for(let i=0 ; i< user.length ; i++)
        {
            let userConversation = await Conversation.find({user:user[i]._id}).sort({
                created:-1
            }).select("question summary")
            userConversation
            const res = {
                userId:user[i]._id,
                userName:user[i].userName,
                conversation: userConversation
            }
            response.push(res)
        }
        return  res.json({
            response,
          });
    }catch(error)
    {
        return res.status(500).json({message:error.message})
    }
}
export const loginUser = async (req,res) =>
    {
    try{
        const {userName,name} = req.body;
        let user = await User.findOne({userName})
        if(!user){
            user = await User.create({
                userName,
                name
            })
        }
        if(name !== user.name){
           return res.status(400).json({
                message: "Please Enter the name correctly"
            })
        }
       return  res.json({
            message: `Welcome ${name} Let's Interact`,
            user
          });
    }catch(error)
    {
        return res.status(500).json({message:error.message})
    }
}

export const myProfile = async(req,res) => {
    try{
        const user = await User.findById(req.user.id)
        res.json(user)
    }catch(error){
        res.status(500).json({message:error.message})
    }
} 