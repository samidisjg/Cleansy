import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { MdOutlineHomeWork } from "react-icons/md";
import { HiArrowSmRight, HiDocument, HiOutlineUserCircle, HiOutlineUserGroup, HiShoppingBag, HiUser, HiAnnotation, HiChartPie } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GrResources } from "react-icons/gr";

const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleDropdown1 = () => {
    setShowDropdown1(!showDropdown1);
  };
  const toggleDropdown2 = () => {
    setShowDropdown2(!showDropdown2);
  };

  return (
    <Sidebar className="w-full md:w-56 shadow-md">
      <Sidebar.Items>
         <Sidebar.ItemGroup className="flex flex-col gap-1">
            {
              currentUser.isPropertyAdmin && (
                <>
                  <Link to='/dashboard?tab=propertyAdminDash'>
                    <Sidebar.Item active={tab === 'propertyAdminDash'} icon={HiChartPie} as='div'>
                      Dashboard
                    </Sidebar.Item>
                  </Link>
                </>
              )
            }
            <Link to='/dashboard?tab=profile' >
               <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark' as='div'>
                  Profile
               </Sidebar.Item>

            </Link>
            <>
            <Link to ='/dashboard?tab=userpayments' onClick={toggleDropdown1}>
                <Sidebar.Item active={tab === 'userpayments'} icon={HiShoppingBag} as='div'>
                  User Payments
                </Sidebar.Item>
            </Link>
            
            {showDropdown1 && (
              <div className="dropdown">
                <Link to="/dashboard?tab=addpayments">
                  <Sidebar.Item active={tab === "addpayments"} as="div">
                    Add Payment Profile
                  </Sidebar.Item>
                </Link>
              
              </div>
            )}
          </>

          {currentUser.isBookingAdmin && (
            <>
              <Link to="/dashboard?tab=amenity">
                <Sidebar.Item
                  active={tab == "amenity"}
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  Amenity
                </Sidebar.Item>
              </Link>
            </>
          )}
          {currentUser.isUserAdmin && (
            <>
              <Link to="/dashboard?tab=users">
                <Sidebar.Item
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  Users
                </Sidebar.Item>
              </Link>
            </>
          )}
          {currentUser.isPropertyAdmin && (
            <>
              <Link to="/dashboard?tab=properties">
                <Sidebar.Item
                  active={tab === "properties"}
                  icon={GrResources}
                  as="div"
                >
                  Shared Resources
                </Sidebar.Item>
              </Link>
            </>
          )}
          {currentUser.isBillingAdmin && (
            <>
              <Link to="/dashboard?tab=payments"
              onClick={toggleDropdown2}
              >
                <Sidebar.Item
                  active={tab === "payments"}
                  icon={HiDocument}
                  as="div"
                >
                  Payments
                </Sidebar.Item>
              </Link>
              {showDropdown2 && (
                  
                  <div className="dropdown">
                    <Link to="/dashboard?tab=Adminaddpayments">
                      <Sidebar.Item active={tab === "Adminaddpayments"} as="div">
                        Admin Payments Handling
                      </Sidebar.Item>
                      
                      </Link>
                      </div>)}
            </>
          )}
          {currentUser.isFacilityServiceAdmin && (
            <>
              <Link to="/dashboard?tab=services">
                <Sidebar.Item
                  active={tab === "services"}
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  Services
                </Sidebar.Item>
              </Link>
            </>
          )}

          {currentUser.isFacilityAdmin && (
            <>
              <Link to="/dashboard?tab=maintenance">
                <Sidebar.Item
                  active={tab === "maintenance"}
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  Maintenance Tasks
                </Sidebar.Item>
              </Link>
            </>
          )}

            
            {
              currentUser.isStaffAdmin && (
                <>
                  <Link to='/dashboard?tab=staffs'>
                    <Sidebar.Item active={tab === 'staffs'} icon={HiOutlineUserGroup} as='div'>
                      Staff
                     </Sidebar.Item>
                  </Link>
                </>
              )
            }
            {
              !currentUser.isAdmin && (
                <>
                  <Link to='/dashboard?tab=apartmentList'>
                    <Sidebar.Item active={tab === 'apartmentList'} icon={MdOutlineHomeWork} as='div'>
                      Apartment List
                    </Sidebar.Item>
                  </Link>
                </>
              )
            }
            {
              currentUser.isPropertyAdmin && (
                <>
                  <Link to='/dashboard?tab=comments'>
                    <Sidebar.Item active={tab === 'comments'} icon={HiAnnotation} as='div'>
                      Comments
                    </Sidebar.Item>
                  </Link>
                </>
              )
            }
            <Link to ='/add-visitors'>
                <Sidebar.Item icon={HiUser} as='div'>
                  Add Visitors
                </Sidebar.Item>
            </Link>

            <Link to ='/dashboard?tab=bookings'>
                <Sidebar.Item active={tab === 'bookings'} icon={HiUser} as='div'>
                  Bookings
                </Sidebar.Item>
            </Link>
            
            <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
               Sign Out
            </Sidebar.Item>
         </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
