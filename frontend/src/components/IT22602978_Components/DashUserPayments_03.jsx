import { useSelector } from "react-redux";
import AllPaymentProfiles from './../../pages/IT22602978_Pages/AllPaymentProfile';



const DashPayments_03 = () => {
   const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
         <div>
           <div>
            <AllPaymentProfiles />
           </div>
            
         </div>
         
      
    </div>
  )
}

export default DashPayments_03