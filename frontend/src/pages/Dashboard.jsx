import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashUsers from "../components/DashUsers";
import DashSharedResourcesList_02 from "../components/IT22577160_Components/DashSharedResourcesList_02";
import DashStaff_04 from "../components/IT22603418_Components/DashStaff_04";
import RequestLeave_04 from "./IT22603418_Pages/RequestLeave_04";
import DashServices from "../components/IT22350114_Components/DashServices";
import DashApartmentList_02 from "../components/IT22577160_Components/DashApartmentList_02";
import DashPayments_03 from "./../components/IT22602978_Components/DashPayments_03";
import DashUserPayments_03 from "./../components/IT22602978_Components/DashUserPayments_03";
import AddPaymentProfile from "./IT22602978_Pages/AddPaymentProfile";
import DashMaintenance from "../components/IT22607232_Components/DashMaintenance";
import DashAmenity from "../components/IT22003546_Components/DashAmenity";
import DashComments_02 from "../components/IT22577160_Components/DashComments_02";
import DashBooking_05 from "../components/IT22003546_Components/DashBooking_05";
import PropertyAdminDashboard_02 from "../components/IT22577160_Components/PropertyAdminDashboard_02";
import BookingList_05 from "../components/IT22003546_Components/BookingList_05";

import StaffAdminDash_04 from "./IT22603418_Pages/StaffAdminDash_04";
import StaffAttendance_04 from "./IT22603418_Pages/StaffAttendance_04";
import VisitorAdminPage from "./IT22561466_Pages/VisitorAdminPage";
import RequestCarPark from "./IT22561466_Pages/RequestCarPark";
import AddVisitors from "./IT22561466_Pages/AddVisitors";
//import FaceRecognition_04 from "./IT22603418_Pages/faceRecognition_04";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile */}
      {tab === "profile" && <DashProfile />}
      {/* properties */}
      {tab === "properties" && <DashSharedResourcesList_02 />}
      {/* users */}
      {tab === "users" && <DashUsers />}
      {/* staffs */}
      {tab === "staffs" && <DashStaff_04 />}
      {tab === "leaveRequest" && <RequestLeave_04 />}
      {/* {tab === "faceRecognition" && <FaceRecognition_04 />} */}
      {tab === "staffAttendance" && <StaffAttendance_04 />}
      {tab === "staffAdmin" && <StaffAdminDash_04 />}
      {/* services */}
      {tab === "services" && <DashServices />}
      {/* Apartment List */}
      {tab === "apartmentList" && <DashApartmentList_02 />}
      {/* payments */}
      {tab === "payments" && <DashPayments_03 />}
      {/* user payments */}
      {tab === "userpayments" && <DashUserPayments_03 />}
      {/* add payments */}
      {tab === "addpayments" && <AddPaymentProfile />}
      {/* maintenance */}
      {tab === "maintenance" && <DashMaintenance />}
      {/* amenity */}
      {tab == "amenity" && <DashAmenity />}
      {/* Comments */}
      {tab == 'comments' && <DashComments_02/>}
      {/* Booking */}
      {tab == 'bookings' && <DashBooking_05/>}
      
      
      {tab == 'bookings' && <BookingList_05/>}
      
      {/* propertyAdmin Dashboard */}
      {tab == 'propertyAdminDash' && <PropertyAdminDashboard_02/>}

      {/* VisitorAdmin Dashboard */}
      {tab === 'addVisitors' && <VisitorAdminPage/>}

      {/* Request carpark Dashboard */}
      {tab === 'car-park' && <RequestCarPark/>}

      {/* add visitors Dashboard */}
      {tab === 'add-visitors' && <AddVisitors/>}


    </div>
  );
};

export default Dashboard;
