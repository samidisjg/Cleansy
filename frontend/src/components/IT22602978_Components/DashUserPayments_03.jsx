import { useSelector } from "react-redux";
import AddPaymentProfile from "../../pages/IT22602978_Pages/AddPaymentProfile";


const DashPayments_03 = () => {
   const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      {currentUser.isBillingAdmin && (
         <div>
            <h1>Payments</h1>
            <p>Manage youruser  payments here</p>
         </div>
         
      )}
    </div>
  )
}

export default DashPayments_03