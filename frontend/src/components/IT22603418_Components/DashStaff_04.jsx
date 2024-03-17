import { useSelector } from "react-redux";
import RequestLeave_04 from "../../pages/IT22603418_Pages/RequestLeave_04";
import RequestDetails_04 from "../../pages/IT22603418_Pages/RequestDetails_04";

const DashStaff_04 = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      {currentUser.isStaffAdmin && (
        <div >
          <RequestLeave_04 />
          <RequestDetails_04/>
        </div>

      )}
    </div>
  )
}

export default DashStaff_04