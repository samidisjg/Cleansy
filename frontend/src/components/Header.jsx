import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react"
import { Link, useLocation } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from "../../redux/theme/themeSlice";

const Header = () => {
    const path = useLocation().pathname
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.user)
    const {theme} = useSelector(state => state.theme)
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
                  <Dropdown.Item>Sign Out</Dropdown.Item>
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
               <Link to='/projects' className="hover:text-orange-500 active:text-orange-600">Projects</Link>
            </Navbar.Link>
         </Navbar.Collapse>
    </Navbar>
  )
}

export default Header