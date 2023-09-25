const express=require('express')

const connection=require("./db")

const cors=require("cors")
const userRoute = require('./routes/userRoutes')
const employeeRoute = require('./routes/employeeRoutes')

const port= 3030

const app=express()

app.use(cors())
app.use(express.json())
app.use("/user",userRoute)
app.use("/empl",employeeRoute)

app.get("/",(req,res)=>{
    res.send({
        "message":"Welcome to Backend"
    })
})

app.listen(port,async()=>{
    try {
        await connection
        console.log("Connection established ,server running.")
    } catch (error) {
       console.log(error.message) 
    }
})

