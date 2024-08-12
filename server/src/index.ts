import express ,{Express}from "express";
import mongoose from "mongoose";
import financialrecordroutes from "./routes/financial-record"
const app:Express=express()
const port = process.env.port||3000
app.use(express.json())
const mongoURI:string="mongodb+srv://anubhavpurohit:anubhav143n@financetracker.dsm5n.mongodb.net/"
    
mongoose.connect(mongoURI).then(()=>console.log("Connected to database")).catch((err)=>console.log("error",err))

app.use("/financialrecord",financialrecordroutes)
app.listen(port,()=>{
    console.log("server running on port "+ port)
})

