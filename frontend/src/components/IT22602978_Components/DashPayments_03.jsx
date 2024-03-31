import { useSelector } from "react-redux";
import AdminAddPayments_03 from "../../pages/IT22602978_Pages/AdminAddPayments_03";


const DashPayments_03 = () => {
   const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      {currentUser.isBillingAdmin && (
         <div>
            <AdminAddPayments_03 />
          
         </div>
         
      )}
    </div>
  )
}

export default DashPayments_03