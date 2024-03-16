import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashUsers from "../components/DashUsers";
import DashProperties_02 from "../components/IT22577160_Components/DashProperties_02";
import DashStaff_04 from "../components/IT22603418_Components/DashStaff_04";
import DashServices from "../components/IT22350114_Components/DashServices";
import DashPayments_03 from './../components/IT22602978_Components/DashPayments_03';
import DashUserPayments_03 from './../components/IT22602978_Components/DashUserPayments_03';
import AddPaymentProfile from './IT22602978_Pages/AddPaymentProfile';
import DashMaintenance from "../components/IT22607232_Components/DashMaintenance"
			  


const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar/>
      </div>
      {/* profile */}
      {tab === 'profile' && <DashProfile/>}
      {/* profile */}
      {tab === 'properties' && <DashProperties_02 />}
      {/* users */}
      {tab === 'users' && <DashUsers/>}
      {/* staffs */}
      {tab === 'staffs' && <DashStaff_04/>}
      {/* services */}
      {tab === 'services' && <DashServices />}
      {/* payments */}
      {tab === 'payments' && <DashPayments_03/>}
      {/* user payments */}
      {tab === 'userpayments' && <DashUserPayments_03/>}
      {/* add payments */}
      {tab === 'addpayments' && <AddPaymentProfile/>}
      {/* maintenance */}
      {tab === "maintenance" && <DashMaintenance />}
    </div>
  )
}

export default Dashboard