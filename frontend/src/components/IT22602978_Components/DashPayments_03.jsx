import { useSelector } from "react-redux";
import FinalAdminAllPayments_03 from './../../pages/IT22602978_Pages/FinalAdminAllPayments_03';



const DashPayments_03 = () => {
   const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex justify-center w-[100%] ">
      <FinalAdminAllPayments_03 />
    </div>
  )
}

export default DashPayments_03