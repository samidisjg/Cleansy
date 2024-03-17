import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const OnlyPropertyAdminPrivateRoute_02 = () => {
   const { currentUser } = useSelector((state) => state.user)
  return (
      <>
         {currentUser && currentUser.isPropertyAdmin ? <Outlet /> : <Navigate to="/sign-in" />}
      </>
  )
}

export default OnlyPropertyAdminPrivateRoute_02