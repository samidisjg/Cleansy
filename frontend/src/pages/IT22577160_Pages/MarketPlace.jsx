import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineStar } from "react-icons/ai";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MarketPlaceHeader_02 from '../../components/IT22577160_Components/MarketPlaceHeader_02';
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { addToWishlist, removeFromWishlist } from '../../../redux/IT22577160_redux/wishList_02.js';
import { addToCart } from "../../../redux/IT22577160_redux/cartSlice.js";
import { addToRating, removeFromRating } from "../../../redux/IT22577160_redux/ratingSlice_02.js";
import { Button } from "flowbite-react";
import clensySite from '/clensySite.png'
import credenza from '/credenza.png'
import CountDown_02 from "../../components/IT22577160_Components/CountDown_02.jsx";

const MarketPlace = () => {
   const [resources, setResources] = useState([]);
   const [showMore, setShowMore] = useState(false);
   const [click, setClick] = useState(false);
   const dispatch = useDispatch()
   const { wishlist } = useSelector((state) => state.wishlist);
   const { cart } = useSelector((state) => state.cart);
   const { rating } = useSelector((state) => state.rating);

   useEffect(() => {
      const fetchPost = async () => {
         const res = await fetch('/api/sharedResourcesListing/getSharedResources')
         const data = await res.json()
         setResources(data.resources)
         if(data.resources.length === 9) {
            setShowMore(true);
         } else {
            setShowMore(false);
         }
      }
      fetchPost();
   }, [])

   const handleShowMore = async () => {
      const numberOfPosts = resources.length;
      const startIndex = numberOfPosts;
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('startIndex', startIndex);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/sharedResourcesListing/getSharedResources?${searchQuery}`);
      if(!res.ok) {
         return;
      }
      if(res.ok) {
         const data = await res.json();
         setResources([...resources, ...data.resources]);
         if(data.resources.length === 9) {
            setShowMore(true);
         } else {
            setShowMore(false);
         }
      }
   }

   const addToCartHandler = async (id) => {
      const existingItem = cart && cart.find((i) => i._id === id);
      if(existingItem) {
         toast.error("Item already in the cart");
      } else {
         const clickedResource = resources.find((resource) => resource._id === id);
         if(clickedResource.quantity < 1) {
            toast.error("Sorry! The quantity is not available in stock");  
         } else {
            const cartData = {...clickedResource, quantity: 1};
            dispatch(addToCart(cartData));
            toast.success("Item added to cart successfully");
         }
      }
   }

   const removeFromWishListHandler = (data) => {
      setClick(!click);
      dispatch(removeFromWishlist(data._id));
   }

   const addToWishListHandler = (data) => {
      setClick(!click);
      dispatch(addToWishlist(data));
   }

   useEffect(() => {
      if(resources && wishlist && wishlist.find((i) => i._id === resources._id)) {
         setClick(true);
      } else {
         setClick(false);
      }
   }, [wishlist, resources])

   // const removeFromRatingHandler = (data) => {
   //    setClick(!click);
   //    dispatch(removeFromRating(data._id));
   // }

   // const addToRatingHandler = (data) => {
   //    setClick(!click);
   //    dispatch(addToRating(data));
   // }

   const handleRatingClick = (value) => {
      if (rating === value) {
         dispatch(removeFromRating());
      } else {
         dispatch(addToRating(value));
      }
   };


  return (
   <>
      <MarketPlaceHeader_02 />
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
          <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
            <div className="flex justify-center flex-col flex-1">
              <h2 className="text-2xl font-bold">CREDENZA</h2>
              <p className="text-gray-500 my-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, reiciendis veniam sapiente deserunt ut nihil necessitatibus provident earum. Sunt ducimus unde voluptates vel omnis maxime sint velit laudantium officiis consectetur eveniet id qui earum ipsum culpa, quos blanditiis, odit, fugit reprehenderit distinctio? Dolorem similique eum quibusdam? Quasi, commodi dignissimos! Doloribus reprehenderit vitae officia iusto harum provident blanditiis amet deserunt perferendis, aliquid repellat aspernatur animi labore nulla asperiores nesciunt aliquam optio esse culpa facere sunt sequi veniam! Ipsam ea totam perspiciatis sed ipsa a? Voluptate alias quibusdam omnis tempora. Aperiam nostrum voluptatum atque, ad pariatur eaque eligendi deserunt quis natus vitae!</p>
              <div className='flex py-2 justify-between'>
                  <div className="flex">
                     <h5 className='font-bold text-[18px] text-slate-800 dark:text-teal-500 font-Roboto'>
                        $1000
                     </h5>
                     <h5 className='font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through'>
                        $1200
                     </h5>
                  </div>
                  <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
                     120 sold
                  </span>
               </div>
              <CountDown_02 />
            </div>
            <div className="flex-1 p-7">
              <img src={credenza} alt="" className='rounded-md'/>
            </div>
          </div>
      </div>
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
                                    {/* {
                                       [...Array(5)].map((index) => (
                                          <span key={index}>
                                             {rating && rating.find((i) => i._id === resource._id) ? (
                                                <AiFillStar size={20} onClick={() => removeFromRatingHandler(resource)} className='cursor-pointer text-yellow-300' />
                                             ) : (
                                                <AiOutlineStar size={20} onClick={() => addToRatingHandler(resource)} className='cursor-pointer text-gray-500' />
                                             )}
                                          </span>
                                       ))
                                    } */}

                                    {[...Array(5)].map((star, i) => (
                                       <span key={i} onClick={() => handleRatingClick(i + 1)}>
                                          {i < rating ? (
                                             <AiFillStar size={20} className='cursor-pointer text-yellow-300' />
                                          ) : (
                                             <AiOutlineStar size={20} className='cursor-pointer text-gray-500' />
                                          )}
                                       </span>
                                    ))}
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
                                    {
                                       wishlist && wishlist.find(item => item._id === resource._id) ? (
                                          <AiFillHeart size={22}  onClick={() => removeFromWishListHandler(resource)} className='cursor-pointer text-red-600' title="Remove from wishlist" />
                                       ) : (
                                          <AiOutlineHeart size={22}  onClick={() => addToWishListHandler(resource)}  className='cursor-pointer' title="Add to wishlist"  />
                                       )
                                    }
                                    <Link to={`/sharedResource/${resource.slug}`}>
                                       <AiOutlineEye size={22} title="Quick view"/>
                                    </Link>
                                    <AiOutlineShoppingCart size={22} title="Add to cart" onClick={() => addToCartHandler(resource._id)} className='cursor-pointer' />
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
        {
            showMore && (
               <button onClick={handleShowMore} className='text-teal-500 hover:underline p-7 text-center w-full'>
                  Show More
               </button>
            )
         }
      </div>
   </>
   
  )
}

export default MarketPlace