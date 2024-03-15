import { useSelector } from "react-redux";
import AddPaymentProfile from './../../pages/IT22602978_Pages/AddPaymentProfile';



const DashPayments_03 = () => {
   const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      {currentUser.isBillingAdmin && (
         <div>
           <h1>payments!!!!!</h1>
            
         </div>
         
      )}
    </div>
  )
}

export default DashPayments_03