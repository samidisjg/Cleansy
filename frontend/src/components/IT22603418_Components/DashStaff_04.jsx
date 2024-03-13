import { useSelector } from "react-redux";

const DashStaff_04 = () => {
   const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      {currentUser.isStaffAdmin && (
         <div>
            <h1>Welcome Staff</h1>
         </div>
         
      )}
    </div>
  )
}

export default DashStaff_04