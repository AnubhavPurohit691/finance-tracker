import "./financial-record.css";

import { useUser } from "@clerk/clerk-react"
import Financeform from "./Financeform"
import Financelist from "./Financelist"
const Dashboard= () => {
    const {user}=useUser()
  return (
    <div>
      <h1>{user?.firstName} ! Here are your finances .</h1>
      <Financeform/>
      <Financelist/>
    </div>
  )
}

export default Dashboard

