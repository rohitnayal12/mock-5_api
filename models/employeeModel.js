const mongoose=require("mongoose");

const employeeSchema= mongoose.Schema({
    FirstName:{type:String,require:true},
    LastName:{type:String,require:true},
    Email:{type:String,require:true},
    Department:{type:String,require:true},
    Salary:{type:Number,require:true},
  
},{
    versionkey:false
})

const employeeModel=mongoose.model("employee",employeeSchema)


module.exports=employeeModel