const express=require('express');
const router=express.Router();
const User=require('../models/User');
const { exists } = User;


router.post('/register',async(req,res)=>{
    try{
        const {username,password}=req.body;
        if(!username || !password) return res.status(400).json({message:'username and password required'});
        const exists=await User.findOne({username});
        if(exists){
            return res.status(409).json({message:"username is already taken"});

        }

        const user =new User({username,password});
        await user.save();
        res.status(201).json({message:'user created'});

    }catch(error){
        console.log(error);
        res.status(500).json({message:"server error"});
    }
});

router.post('/login', async(req,res) =>{
        try{
            const {username,password}=req.body;
             if(!username || !password) return res.status(400).json({message:'username and password required'});
             const user=await User.findOne({username});

             if(!user || user.password !== password){
                return res.status(401).json({message:"invalid creddential"});
             }

             res.json({token:'xyz101',username:user.username});
        }catch(error){
                console.log(error);
                res.status(500).json({message:"server error"});
        }
});

module.exports=router;