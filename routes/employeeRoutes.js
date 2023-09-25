const express= require('express');
const employeeModel = require('../models/employeeModel');

const employeeRoute=express.Router()


//==================   Post  ===================


employeeRoute.post("/employees",async(req,res)=>{

    try {
        employee= await employeeModel(req.body)

        await employee.save()
    
        return res.status(200).send({
            "msg": "Employee posted successfully."
        })
    } catch (error) {
        return res.status(400).send({
            "error": error.message
        })
    }
   
    
})


//=============== GET  =========================

employeeRoute.get("/",async(req,res)=>{
    const {FirstName,sortby,sortorder,Department}=req.query

    const querry={}

    if(FirstName){
        querry.name={$regex :FirstName ,$options:"i"}
    }
    if(Department){
        querry.department=Department
    }

    try {
        const sortOption={}
        if(sortorder=="asc"){
            sortOption[sortby]=1
        }
        else if(sortorder=="desc"){
            sortOption[sortby]=-1
        }

        const employees=await employeeModel.find(querry).sort(sortOption)

        res.status(200).json(employees)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


//============================  edit  ======================

employeeRoute.patch("/edit/:id",async(req,res)=>{
    const id=req.params.id

    try {
      employee=await employeeModel.findByIdAndUpdate({_id:id},req.body) 
      return res.status(200).send({
        "msg":"Employee updated successfully."
      }) 
    } catch (error) {
        return res.status(500).send({
            "msg":error.message
          }) 
    }
})

//======================== Delete employee =================


employeeRoute.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id

    try {
      employee=await employeeModel.findByIdAndDelete({_id:id}) 
      return res.status(200).send({
        "msg":"Employee Deleted successfully."
      }) 
    } catch (error) {
        return res.status(500).send({
            "msg":error.message
          }) 
    }
})

module.exports=employeeRoute
