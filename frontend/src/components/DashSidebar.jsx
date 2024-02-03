import { Sidebar } from "flowbite-react"
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../../redux/user/userSlice";
import { useDispatch } from 'react-redux'

const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch()
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
         <Sidebar.ItemGroup>
            <Link to='/dashboard?tab=profile'>
               <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark' as='div'>
                  Profile
               </Sidebar.Item>
            </Link>
            <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
               Sign Out
            </Sidebar.Item>
         </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar