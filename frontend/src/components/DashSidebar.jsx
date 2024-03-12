import { Sidebar } from "flowbite-react"
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiOutlineUserGroup, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../../redux/user/userSlice";
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const {currentUser} = useSelector(state => state.user)
  const [tab, setTab] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST'
      })
      const data = await res.json()
      if(!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess())
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Sidebar className="w-full md:w-56 shadow-md">
      <Sidebar.Items>
         <Sidebar.ItemGroup className="flex flex-col gap-1">
            <Link to='/dashboard?tab=profile'>
               <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark' as='div'>
                  Profile
               </Sidebar.Item>
            </Link>
            {
              currentUser.isUserAdmin && (
                <>
                  <Link to='/dashboard?tab=users'>
                    <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} as='div'>
                      Users
                    </Sidebar.Item>
                  </Link>
                </>
              )
            }
            {
              currentUser.isPropertyAdmin && (
                <>
                  <Link to='/dashboard?tab=properties'>
                    <Sidebar.Item active={tab === 'properties'} icon={HiOutlineUserGroup} as='div'>
                      Properties
                    </Sidebar.Item>
                  </Link>
                </>
              )
            }
            <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
               Sign Out
            </Sidebar.Item>
         </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar