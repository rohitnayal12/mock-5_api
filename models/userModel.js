const { text } = require("express");
const mongoose=require("mongoose");

const userSchema= mongoose.Schema({
    email:{type:String,require:true},
    password:{type:String,require:true},
},{
    versionkey:false
})

const userModel=mongoose.model("user",userSchema)


module.exports=userModel