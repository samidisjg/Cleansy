import { useSelector } from "react-redux";

const DashStaffView_04 = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      {currentUser.isStaffAdmin && (
        <div>
          <H1>Insert Success</H1>
        </div>
      )}
    </div>
  );
};

export default DashStaffView_04;
