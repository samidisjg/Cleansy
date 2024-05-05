import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashUsers from "../components/DashUsers";
import DashSharedResourcesList_02 from "../components/IT22577160_Components/DashSharedResourcesList_02";
import DashStaff_04 from "../components/IT22603418_Components/DashStaff_04";
import DashServices from "../components/IT22350114_Components/DashServices";
import DashApartmentList_02 from "../components/IT22577160_Components/DashApartmentList_02";
import DashPayments_03 from "./../components/IT22602978_Components/DashPayments_03";
import DashUserPayments_03 from "./../components/IT22602978_Components/DashUserPayments_03";
import AddPaymentProfile_03 from "./IT22602978_Pages/AddPaymentProfile_03";
import DashMaintenance from "../components/IT22607232_Components/DashMaintenance";
import DashComments_02 from "../components/IT22577160_Components/DashComments_02";
import BookingList_05 from "../components/IT22003546_Components/BookingList_05";
import AdminPayments_03 from "./IT22602978_Pages/AdminPayments_03";
import AmenityList_05 from "../components/IT22003546_Components/AmenityList_05";
import DashServiceBookList_06 from "../components/IT22350114_Components/DashServiceBookList_06";
import PropertyAdminDashboard_02 from "../components/IT22577160_Components/PropertyAdminDashboard_02";
import RequestLeave_04 from "./IT22603418_Pages/RequestLeave_04";
import AdminLeaveRequestHandle_04 from "../components/IT22603418_Components/AdminLeaveRequestHandle_04";
import StaffAttendance_04 from "./IT22603418_Pages/StaffAttendance_04";
import InboxMessageForPropertyAdmin_02 from "../components/IT22577160_Components/InboxMessageForPropertyAdmin_02";
import VisitorAdminPage from "./IT22561466_Pages/VisitorAdminPage";
import StaffRegister_04 from "./IT22603418_Pages/StaffRegister_04";
import AdminStaffRegisterList_04 from "../components/IT22603418_Components/AdminStaffRegisterList_04";
import DashAdmin_04 from "../components/IT22603418_Components/DashAdmin_04";
import AdminDashboard from "./IT22196460_Pages/AnnouncementadminDashboard";
import announcementList from "../components/IT22196460_Components/announcementList";
import AnnouncementForAdmin from "../components/IT22196460_Components/AnnouncementForAdmin";
import AnnouncementPage from "../components/IT22196460_Components/AnnouncementPage";
import AllAnnouncemnts from "../components/IT22196460_Components/allannouncemnts";
import AnnouncementadminDashboard from "./IT22196460_Pages/AnnouncementadminDashboard";

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
      {/* {tab === "leaveRequest" && <RequestLeave_04 />}
            {tab === "staffAttendance" && <StaffAttendance_04 />} */}
      {/* {tab === "staffAdmin" && <AdminLeaveRequestHandle_04 />} */}
      {/* {tab === "staffRegisterView" && <AdminStaffRegisterList_04 />} */}
      {tab === "StaffRegister" && <StaffRegister_04 />}
      {tab === "staffAdmin" && <DashAdmin_04 />}
      {/* services */}
      {tab === "services" && <DashServices />}
      {/* Apartment List */}
      {tab === "apartmentList" && <DashApartmentList_02 />}
      {/* payments */}
      {tab === "payments" && <DashPayments_03 />}
      {/* user payments */}
      {tab === "userpayments" && <DashUserPayments_03 />}
      {/* add payments */}
      {tab === "addpayments" && <AddPaymentProfile_03 />}
      {/* maintenance */}
      {tab === "maintenance" && <DashMaintenance />}
      {/* amenity */}
      {tab == "amenity" && <AmenityList_05 />}
      {/* Comments */}
      {tab == "comments" && <DashComments_02 />}
      {/* Booking */}
      {tab == "bookings" && <BookingList_05 />}
      {/*admin add payments */}
      {tab === "Adminaddpayments" && <AdminPayments_03 />}
      {/* service bookings */}
      {tab === 'serviceBookings' && <DashServiceBookList_06 />}
      {/*property admin dashboard*/}
      {tab === "propertyAdminDash" && <PropertyAdminDashboard_02 />}
      {/* VisitorAdmin Dashboard */}
      {tab === "addVisitors" && <VisitorAdminPage />}
      {/* inboxMessage for property admin */}
      {tab === "inboxMessage" && <InboxMessageForPropertyAdmin_02 />}
       {/* Notification and Announcement Admin Dashboard */}
      {tab === 'announcement' && <AnnouncementForAdmin />}
      {tab === 'announcementpage' && <AnnouncementPage />}
      {tab === 'allannouncemnts' && <AllAnnouncemnts/>}
      {tab === 'announcemntsDash' && <AnnouncementadminDashboard/>}
      {/* VisitorAdmin Dashboard */}
      {tab === 'addcarparkDetails' && <CarParkAdminPage/>}




    </div>
  );
};

export default Dashboard;
