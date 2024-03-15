import { useSelector } from "react-redux";

const newreq = () => {
   const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      {currentUser.isStaffAdmin && (
         <div>
            <h1>new req</h1>
            <p>Sample</p>
         </div>
         
      )}
    </div>
  )
}

export default newreq