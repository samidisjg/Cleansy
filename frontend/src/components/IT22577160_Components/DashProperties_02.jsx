import { useSelector } from "react-redux";

const DashProperties_02 = () => {
   const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      {currentUser.isPropertyAdmin && (
         <div>
            <h1>Properties</h1>
            <p>Manage your properties here</p>
         </div>
         
      )}
    </div>
  )
}

export default DashProperties_02