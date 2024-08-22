import mongoose, { mongo } from "mongoose";
type financerecord={
    userId:string
    amount:number
    date:Date
    description:string
    category:string
    paymentMethod:string
}

const FinancialRecord=new mongoose.Schema<financerecord>({
    userId:{type:String,required:true,},
    date:{type:Date , required:true},
    amount:{type:Number,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    paymentMethod:{type:String,required:true}
})
const FinancialRecordModel=mongoose.model<financerecord>("FinancialRecord",FinancialRecord)
export default FinancialRecordModel
