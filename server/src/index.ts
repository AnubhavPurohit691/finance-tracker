import express ,{Express}from "express";
import mongoose from "mongoose";
const app:Express=express()
const port = process.env.port||3000
app.use(express.json())
const mongoURI:string="mongodb+srv://anubhavpurohit:anubhav143n@financetracker.dsm5n.mongodb.net/"
    
mongoose.connect(mongoURI).then(()=>console.log("Connected to database")).catch((err)=>console.log("error",err))
app.listen(port,()=>{
    console.log("server running on port "+ port)
})

app.get("/",(res:Response)=>res.json({msg:"hi"}))