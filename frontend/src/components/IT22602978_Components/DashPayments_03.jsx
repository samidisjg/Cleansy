import { useSelector } from "react-redux";

const DashPayments_03 = () => {
   const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      {currentUser.isBillingAdmin && (
         <div>
            <h1>Payments</h1>
            <p>Manage your properties here</p>
         </div>
         
      )}
    </div>
  )
}

export default DashPayments_03