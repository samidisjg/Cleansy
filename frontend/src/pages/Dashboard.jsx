import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashUsers from "../components/DashUsers";
import DashProperties_02 from "../components/IT22577160_Components/DashProperties_02";
import DashServices from "../components/IT22350114_Components/DashServices";
import DashMaintenance from "../components/IT22607232_Components/DashMaintenance";

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
      {/* profile */}
      {tab === "properties" && <DashProperties_02 />}
      {/* users */}
      {tab === "users" && <DashUsers />}
      {/* services */}
      {tab === "services" && <DashServices />}

      {/* maintenance */}
      {tab === "maintenance" && <DashMaintenance />}
    </div>
  );
};

export default Dashboard;
