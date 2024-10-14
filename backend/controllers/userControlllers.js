import { User } from "../models/UserModel.js";

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
        return res.json(user)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
} 