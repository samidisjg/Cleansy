import { useSelector } from "react-redux";
import AdminPayments_03 from "../../pages/IT22602978_Pages/AdminPayments_03";


const DashPayments_03 = () => {
   const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex justify-center w-[100%] ">
      {currentUser.isBillingAdmin && (
         <div className="">
            <h1>hey</h1>
          
         </div>
         
      )}
    </div>
  )
}

export default DashPayments_03