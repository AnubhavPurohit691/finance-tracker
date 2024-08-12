import { useUser } from "@clerk/clerk-react"
import { useState } from "react"

const Financeform = () => {
    const[description,setDescription]=useState<string>("")
    const[amount,setAmount]=useState<string>("")
    const[category,setCategory]=useState<string>("")
    const[paymentMethod,setPaymentMethod]=useState<string>("")
    const{user}=useUser()

    const handlesubmit= ( e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        const newrecord={
            userId:user?.id,
            date:new Date(),
            description:description,
            amount:parseFloat(amount),
            category:category,
            paymentMethod:paymentMethod
        }
        // addrecord(newrecord)
        setAmount("")
        setCategory("")
        setDescription("")
        setPaymentMethod("")
        
    }
    return (
    <div className="form-container">
        <form onSubmit={handlesubmit}>
            <div className="form-field">
                <label>
                    Description:
                </label>
                <input type="text" required className="input" value={description} onChange={(e)=>setDescription(e.target.value)}></input>
            </div>
            <div className="form-field">
                <label>
                    Amount: 
                </label>
                <input type="number" required className="input" value={amount} onChange={(e)=>setAmount(e.target.value)}></input>
            </div>
            <div className="form-field">
                <label > Category</label>
                <select required className="input" value={category} onChange={(e)=>setCategory(e.target.value)}>
                <option value="">select a Category</option>
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Salaries">Salaries</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Others">Others</option>
                </select>
            </div>
            <div className="form-field">
                <label>Payment Method:</label>
                <select required value={paymentMethod} className="input" onChange={(e)=>setPaymentMethod(e.target.value)}>
                    <option value="">Payment Method</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                </select>
            </div>
            <button type="submit" className="button">Add Record</button>
        </form>
      
    </div>
  )
}

export default Financeform
