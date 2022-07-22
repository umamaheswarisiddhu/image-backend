import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import express from 'express';
import User from '../models/user_model.js';
const router = express.Router();

export const signin=async (req,res)=>
{
    const {email,password}=req.body;
    try {
       const existingUser=await User.findOne({email});

       if(!existingUser) return res.status(404).json({message:"User doesn't exist"});

       const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);

       if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Credentials"});

       const token=jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:"1h"});

       res.status(200).json({result:existingUser,token});


    } catch (error) {
        
        res.status(500).json({message:"Something went wrong"});
    }
}

// export const signup=async(res,req)=>
// {
     
//     const { email,password,confirmPassword,firstname, lastname } = req.body;

//     try {
        
//         const existingUser=await User.findOne({email});

//         if(existingUser) return res.status(404).json({message:"Email already exist"});

//         if(password!==confirmPassword) return res.status(400).json({message:"Password Mismatch"});

//         const hashedPassword=await bcrypt.hash(password,12);

//         const result=await User.create({email,password:hashedPassword,name:`${firstname} ${lastname}`});

//         const token=jwt.sign({email:result.email, id: result._id},'test',{expiresIn:'1h'});

//         res.status(200).json({result,token});

//     } catch (error) 
//     {
//         res.status(500).json({message:"Something went wrong"});
        
//     }
// }

export const signup = async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await User.create({ email, password: hashedPassword, name:`${firstname} ${lastname}`});
  
      const token = jwt.sign( { email: result.email, id: result._id }, "test", { expiresIn: "1h" } );
  
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
      console.log(error);
    }
  };

export default router;