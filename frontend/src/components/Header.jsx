import { Button, Navbar, TextInput } from "flowbite-react"
import { Link, useLocation } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

const Header = () => {
    const path = useLocation().pathname
  return (
    <Navbar className="border-b-2 sticky top-0 bg-slate-200 shadow-md">
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
         <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
            <FaMoon/>
         </Button>
         <Link to='/sign-in'>
            <Button className="bg-gradient-to-r from-sky-600 to-blue-900" outline>
               Sign In
            </Button>
         </Link>
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