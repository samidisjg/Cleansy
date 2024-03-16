import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashUsers from "../components/DashUsers";
import DashProperties_02 from "../components/IT22577160_Components/DashProperties_02";
import { DashAmenity } from "../components/IT22003546_Components/DashAmenity";


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
      {/* amenity */}
      {tab == 'amenity' && <DashAmenity/>}
    </div>
  )
}

export default Dashboard