import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

export type financerecord={
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
    updaterecord:(id:string,newrecord:financerecord)=>void
    deleterecord:(id:string)=>void
}

export const FinancialRecordContext=createContext<Financialrecordcontexttype|undefined>(undefined)

export const FinanceRecordProvider=({children}:{children:React.ReactNode})=>{
    const [records,setrecords]=useState<financerecord[]>([])
    // To add record
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
        // Update record
        const updaterecord=async(id:string,newrecord:financerecord)=>{
            const response=   await fetch("http://localhost:3000/financialrecord/"+id,{method:"PUT",body:JSON.stringify(newrecord),headers:{"Content-Type": "application/json"}})
            try{
               if(response.ok){
                   const newrecord=await response.json()
                   setrecords((prev)=>prev.map((record)=>{
                    if(record._id===id){
                        return newrecord
                    }
                   }))
                }
            }
            catch(err){
               console.log(err)
            }
            
           }
    const {user}=useUser()

    //  to fetch record
    const fetchrecord=async ()=>{
        
        if(!user)return
        const response= await fetch("http://localhost:3000/financialrecord/getallbyuserId/"+user.id )
        if(response.ok){
            const records=await response.json()
            setrecords(records)
        }
    }
    useEffect (()=>{
        fetchrecord()
    },[user])
    
    const deleterecord=async(id:string)=>{
        const response=   await fetch("http://localhost:3000/financialrecord"+id,{method:"DELETE"})
     try{
        if(response.ok){
            const deleterecord=await response.json()
            setrecords((prev)=>prev.filter((record)=>record._id!== deleterecord._id))
         }
     }
     catch(err){
        console.log(err)
     }
     
    }
    

    return <FinancialRecordContext.Provider value={{records,addrecord ,updaterecord,deleterecord}}>{children}</FinancialRecordContext.Provider>
}

export const useFinancialRecords=()=>{
    const context=useContext<Financialrecordcontexttype|undefined>(FinancialRecordContext)
    if(!context){throw new Error("useFinanceRecord must be with in FinancialRecordProvider")}
    return context    
}
