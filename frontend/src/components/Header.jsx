import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react"
import { Link, useLocation } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from "../../redux/theme/themeSlice";
import { signOutSuccess } from "../../redux/user/userSlice";

const Header = () => {
    const path = useLocation().pathname
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.user)
    const {theme} = useSelector(state => state.theme)

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
    <Navbar className="border-b-2 sticky top-0 bg-slate-200 shadow-md z-50">
      <Link to='/' className="self-center">
         <img src="cleansy.png" alt="logo" width='100' />
      </Link>
      <form>
         <TextInput type="text" placeholder="Search..." rightIcon={AiOutlineSearch} className="hidden lg:inline"/>
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
         <AiOutlineSearch/>
      </Button>
      <div  className="flex gap-2 md:order-2">
         <Button className="w-12 h-10 hidden sm:inline" color="gray" pill onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? <FaSun/> : <FaMoon/>}
         </Button>
         {
            currentUser ? (
               <Dropdown
               arrowIcon={false} inline
               label={<Avatar img={currentUser.profilePicture} alt="user" rounded/>}>
                  <Dropdown.Header>
                     <span className="block text-sm">@{currentUser.username}</span>
                     <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                  </Dropdown.Header>
                  <Link to='/dashboard?tab=profile'>
                     <Dropdown.Item>Profile</Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
               </Dropdown>
            ) : (
               <Link to='/sign-in'>
                  <Button gradientDuoTone='purpleToBlue' outline>
                     Sign In
                  </Button>
               </Link>
            )
         }
         <Navbar.Toggle className="text-sm"/>
      </div>
         <Navbar.Collapse>
            <Navbar.Link active={path === '/'} as={'div'}>
               <Link to='/' className="hover:text-orange-500 active:text-orange-600">Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/about'} as={'div'}>
               <Link to='/about' className="hover:text-orange-500 active:text-orange-600">About</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/projects'} as={'div'}>
               <Link to='/projects' className="hover:text-orange-500 active:text-orange-600 hover:underline">Projects</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/marketPlace'} as={'div'}>
               <Link to='/marketPlace' className="hover:text-orange-500 active:text-orange-600 hover:underline">Market Place</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/team'} as={'div'}>
               <Link to='/team' className="hover:text-orange-500 active:text-orange-600 hover:underline hidden sm:flex">Our Team</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/amenity-User:amenityID'} as={'div'}>
               <Link to='/amenity-User:amenityID' className="hover:text-orange-500 active:text-orange-600 hover:underline">Amenity</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/service-User:serviceID'} as={'div'}>
               <Link to='/service-User:serviceID' className="hover:text-orange-500 active:text-orange-600 hover:underline">Services</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/contact'} as={'div'}>
               <Link to='/contact' className="hover:text-orange-500 active:text-orange-600 hover:underline">Contact Us</Link>
               <Link to='/projects' className="hover:text-orange-500 active:text-orange-600">Projects</Link>
            </Navbar.Link>
         </Navbar.Collapse>
    </Navbar>
  )
}

export default Header