import {  Button, Navbar, TextInput } from 'flowbite-react'
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineStar } from "react-icons/ai";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MarketPlace = () => {
   const [resources, setResources] = useState([]);
   console.log(resources);

   useEffect(() => {
      const fetchPost = async () => {
         const res = await fetch('/api/sharedResourcesListing/getSharedResources')
         const data = await res.json()
         setResources(data.resources)
      }
      fetchPost();
   }, [])
  return (
   <>
      <Navbar className="border-b-2 sticky top-16 bg-[#3321c8] dark:bg-slate-600 z-40 flex justify-between">
         <div className='sm:flex items-center   bg-white rounded-md  w-[200px] h-14 sm:w-[270px] hidden '>
            {/* <div> */}
               <BiMenuAltLeft size={30} className='text-slate-800' />
               <button className='h-full w-full flex justify-between items-center pl-10 font-sans text-lg  text-slate-800 font-semibold select-none'>
                  All Categories 
               </button>
               <IoIosArrowDown size={20} className='text-slate-800' />
            {/* </div> */}
         </div>
         {/* <div className='sm:flex items-center  mx-auto hidden '> */}
            {/* <div> */}
               {/* <Button className=''>
                  Let's Play Games
               </Button> */}
            {/* </div> */}
         {/* </div> */}
      
         <div className='flex items-center'>
            <div className='flex items-center relative cursor-pointer mr-[15px]'>
               <AiOutlineHeart size={30} color='rgb(255 255 255 / 83%)'/>
               <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>
                  0
               </span>
            </div>
            <div className='flex items-center relative cursor-pointer mr-[15px]'>
               <AiOutlineShoppingCart size={30} color='rgb(255 255 255 / 83%)'/>
               <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>
                  1
               </span>
            </div> 
            <form>
               <TextInput type="text" placeholder="Search..." rightIcon={AiOutlineSearch} />
            </form>
            {/* <Button className="w-12 h-10 lg:hidden" color="gray" pill>
               <AiOutlineSearch/>
            </Button> */}
         </div>
      </Navbar>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {
           resources && resources.length > 0 && (
              <div className='flex flex-col gap-6'>
               {/* <h1 className='text-center my-7 font-extrabold text-3xl underline'>Market Place</h1> */}
               <div className='flex flex-wrap gap-12'>
                  {resources.map((resource) => (
                     <div key={resource._id}>
                        <div className='group relative w-full border border-teal-500 overflow-hidden rounded-lg sm:w-[330px] transition-all'>
                           <Link to={`/sharedResource/${resource.slug}`}>
                              <img src={resource.image} alt="post cover" className='h-[230px] w-full object-cover  transition-all duration-300 z-20' />
                           </Link>
                           <div className="p-3 flex flex-col gap-2">
                              <p className='text-lg font-semibold line-clamp-2'>{resource.title}</p>
                              <div className='flex justify-between'>
                                 <span className='italic text-sm'>{resource.category}</span>
                                 <div className="flex text-xs">
                                    <AiFillStar className='mr-2 cursor-pointer' color='#F6BA00' size={20}/>
                                    <AiFillStar className='mr-2 cursor-pointer' color='#F6BA00' size={20}/>
                                    <AiFillStar className='mr-2 cursor-pointer' color='#F6BA00' size={20}/>
                                    <AiFillStar className='mr-2 cursor-pointer' color='#F6BA00' size={20}/>
                                    <AiOutlineStar className='mr-2 cursor-pointer' color='#F6BA00' size={20}/>
                                 </div>
                              </div>
                              <div className='flex justify-between items-center'>
                                 <div className='flex'>
                                    <h5 className='font-bold text-[18px] text-slate-800 dark:text-teal-500 font-Roboto'>
                                       {resource.regularPrice === 0 ? resource.regularPrice + " $" : resource.regularPrice - resource.discountPrice + " $"}
                                    </h5>
                                    <h4 className='font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through'>
                                       {resource.regularPrice ? resource.regularPrice + " $" : null}
                                    </h4>
                                 </div>
                                 <div className='flex items-center gap-4'>
                                    <AiOutlineHeart size={22}/>
                                    <AiOutlineEye size={22} title="Quick view"/>
                                    <AiOutlineShoppingCart size={22} title="Add to cart" />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            
         )
        }
      </div>
   </>
   
  )
}

export default MarketPlace