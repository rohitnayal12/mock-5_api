const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userModel = require("../models/userModel")

const userRoute=express.Router()


//Registartion=====================>>>>>>>>>>>>>>>>>>

userRoute.post("/signup",async(req,res)=>{
    try {
        let user=await userModel.findOne({email:req.body.email})

        if(user){
            return res.status(404).send({
                "error":"User Already exists."
            })
        }

        const {email,password}=req.body

        let hashpassword= await bcrypt.hash(password, 5)

        let newuser= new userModel({email,password:hashpassword})

        await newuser.save()

        return res.status(200).json({
            "message":"User registered Successfully."
        })
    } catch (error) {
        return res.status(400).send({
            "error":error.message
        })
    }
})


//============================          Login             =====================>


userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body


    try {
        let user=await userModel.findOne({email:req.body.email})

        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
                if(result){
                    const token = jwt.sign({ user:user.name }, 'shhhhh');

                    res.status(200).send({
                        "msg":"Login successful.",
                        token:token
                    })
                }

                else{
                    res.status(403).send({
                        "error":err.message
                    })
                      
                }
            });
        }
        else{
            res.status(403).send({
                "msg":"Wrong Credentials."
            })
        }
    } catch (error) {
           res.status(403).send(({
            "error":error.message
           })) 
    }
})

module.exports= userRoute