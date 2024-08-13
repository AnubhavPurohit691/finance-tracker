import { createContext, useContext, useState } from "react";
type financerecord={
    _id?:string
    userId:string
    amount:number
    date:Date
    description:string
    category:string
    paymentMethod:string
}
interface Financialrecordcontexttype{
    records:financerecord[]
    addrecord:(record:financerecord)=>void
    // updaterecord:(id:string,newrecord:financerecord)=>void
    // deleterecord:(id:string)=>void
}
export const FinancialRecordContext=createContext<Financialrecordcontexttype|undefined>(undefined)

export const FinanceRecordProvider=({children}:{children:React.ReactNode})=>{
    const [records,setrecords]=useState<financerecord[]>([])
    const addrecord=async(record:financerecord)=>{
     const response=   await fetch("http://localhost:3000/financialrecord",{method:"POST",body:JSON.stringify(record),headers:{"Content-Type": "application/json"}})
     try{
        if(response.ok){
            const newrecord=await response.json()
            setrecords((prev)=>[...prev,newrecord])
         }
     }
     catch(err){
        console.log(err)
     }
     
    }

    return <FinancialRecordContext.Provider value={{records,addrecord}}>{children}</FinancialRecordContext.Provider>
}
export const useFinancialRecords=()=>{
    const context=useContext<Financialrecordcontexttype|undefined>(FinancialRecordContext)
    if(!context){throw new Error("useFinanceRecord must be with in FinancialRecordProvider")}

    return context
    
}