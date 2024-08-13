import express ,{Express}from "express";
import mongoose from "mongoose";
import financialrecordroutes from "./routes/financial-record"
import cors from "cors"
const app:Express=express()
const port = process.env.port||3000
app.use(express.json())
app.use(cors())
const mongoURI:string="mongodb://localhost:27017/financeTracking"
    
 mongoose.connect(mongoURI).then(()=>console.log("Connected to database")).catch((err)=>console.log("error",err))

app.use("/financialrecord",financialrecordroutes)
app.listen(port,()=>{
    console.log("server running on port "+ port)
})

