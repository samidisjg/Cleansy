import { Button, Navbar, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'
import { BiMenuAltLeft } from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import CartPopUp from './CartPopUp'
import { useSelector, useDispatch } from "react-redux";
import WishListPopUp_02 from './WishListPopUp_02'
import { CgGames } from "react-icons/cg";

const MarketPlaceHeader_02 = () => {
   const { cart } = useSelector((state) => state.cart);
   const { wishlist } = useSelector((state) => state.wishlist);
   const [dropDown, setDropDown] = useState(false);
   const [searchTerm, setSearchTerm] = useState('');
   const location = useLocation();
   const navigate = useNavigate();
   const [openCart, setOpenCart] = useState(false);
   const [openWishlist, setOpenWishlist] = useState(false);

   useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if(searchTermFromUrl){
         setSearchTerm(searchTermFromUrl);
      }
   },[location.search])

   const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/searchResource?${searchQuery}`);
   }

  return (

      <Navbar className="border-b-2 sticky top-16 bg-[#3321c8] dark:bg-slate-600 z-40 flex justify-between">
         {/* <div className='sm:flex items-center relative w-[200px] h-14 sm:w-[270px] hidden' onClick={() => setDropDown(!dropDown)}> */}
            {/* <div> */}
               {/* <BiMenuAltLeft size={30} className='text-slate-800 absolute top-3 left-2' />
               <button className='h-full w-full flex justify-between items-center pl-10 font-sans text-lg  text-slate-800 font-semibold select-none'>
                  All Categories 
               </button>
               <IoIosArrowDown size={20} className='text-slate-800 absolute right-2 top-4 cursor-pointer' /> */}
            {/* </div> */}
         {/* </div> */}
         {/* <div className='sm:flex items-center  mx-auto hidden '> */}
            {/* <div> */}
               {/* <Button className=''>
                  Let's Play Games
               </Button> */}
            {/* </div> */}
         {/* </div> */}
         <Link to='/games'>
            <Button color='dark' className='sm:flex items-center relative w-[200px] h-14 sm:w-[270px] hidden'>
               <span><CgGames className='mr-2' size={25}/></span> Let's Play Games
            </Button>
         </Link>
      
         <div className='flex items-center'>
            <div className='flex items-center relative cursor-pointer mr-[15px]' onClick={() => setOpenWishlist(true)}>
               <AiOutlineHeart size={30} color='rgb(255 255 255 / 83%)'/>
               <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>
                  {wishlist && wishlist.length}
               </span>
            </div>
            <div className='flex items-center relative cursor-pointer mr-[15px]' onClick={() => setOpenCart(true)}>
               <AiOutlineShoppingCart size={30} color='rgb(255 255 255 / 83%)'/>
               <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>
                  {cart && cart.length}
               </span>
            </div> 
            <form onSubmit={handleSubmit}>
               <TextInput type="text" placeholder="Search..." rightIcon={AiOutlineSearch} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </form>
            {/* cart popup */}
            {
               openCart && (
                  <CartPopUp setOpenCart={setOpenCart} />
               )
            }
            {/* wishlist popup */}
            {
               openWishlist && (
                  <WishListPopUp_02 setOpenWishlist={setOpenWishlist} />
               )
            }
         </div>
      </Navbar>
  )
}

export default MarketPlaceHeader_02