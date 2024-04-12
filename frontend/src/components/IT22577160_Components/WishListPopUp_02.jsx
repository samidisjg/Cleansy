import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { IoBagHandleOutline } from 'react-icons/io5'
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { Button } from 'flowbite-react';
import { removeFromWishlist } from '../../../redux/IT22577160_redux/wishList_02.js';
import { BsCartPlus } from 'react-icons/bs';
import { addToCart } from '../../../redux/IT22577160_redux/cartSlice.js';

const WishListPopUp_02 = ({setOpenWishlist}) => {
   const { wishlist } = useSelector((state) => state.wishlist);
   const dispatch = useDispatch();

   const removeFormWishlistHandler = (data) => {
      dispatch(removeFromWishlist(data._id))
   }

   const addToCartHandler = (data) => {
      const newData = {...data, quantity: 1}
      dispatch(addToCart(newData))
      setOpenWishlist(false)
   }

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] z-50">
      <div className="fixed top-0 right-0 h-full lg:w-[30%] border-2 border-teal-500 bg-slate-100 rounded-md flex flex-col overflow-y-scroll justify-between shadow-sm">
         {
            wishlist && wishlist.length === 0 ? (
               <div className="w-full h-screen flex items-center justify-center">
                  <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                     <RxCross1 size={25} className="cursor-pointer text-slate-600 border border-teal-500 rounded-md" onClick={() => setOpenWishlist(false)} />
                  </div>
                  <h5 className='text-slate-600 font-semibold'>Wishlist Items is Empty!</h5>
               </div>
            ) : (
               <>
                  <div>
                     <div className="flex w-full justify-end pt-5 pr-5">
                        <RxCross1 size={25} className="cursor-pointer text-slate-600 border border-teal-500 rounded-md" onClick={() => setOpenWishlist(false)} />
                     </div>
                     {/* Item length */}
                     <div className='flex items-center p-4'>
                        <IoBagHandleOutline size={25} className='text-slate-600' />
                        <h5 className="pl-2 text-[20px] font-[500] text-slate-600">
                           {wishlist && wishlist.length} items
                        </h5>
                     </div>
                     {/* cart Single Items */}
                     <br />
                     <div className="w-full border-t border-teal-500">
                        {
                           wishlist && wishlist.map((i, index) => (
                              <CartSingle data={i} key={index}  removeFormWishlistHandler={removeFormWishlistHandler} addToCartHandler={addToCartHandler} />
                           ))
                        }
                     </div>
                  </div>
               </>
            )
         }
      </div>
    </div>
  )
}

const CartSingle = ({data, removeFormWishlistHandler, addToCartHandler}) => {
   const [value, setValue] = useState(data.quantity);
   const totalPrice = (data.regularPrice - data.discountPrice) * value;

   return (
      <div className="border-b border-teal-500 p-4 w-full">
         <div className="w-full flex items-center">
            
            <RxCross1
               className="cursor-pointer text-slate-600 font-bold border border-teal-500 rounded-md"  onClick={() => removeFormWishlistHandler(data)}  
            />
            <img
               src={data.image}
               alt=""
               className="w-[120px] h-[80px] mx-2 rounded-[5px] border border-teal-500 object-cover"
            />
            <div className="">
            <h1 className='text-sm text-gray-600 line-clamp-2 w-52'>{data.title}</h1>
            <h4 className="font-[400] text-[15px] text-[#00000082]">
               ${data.regularPrice - data.discountPrice} * {value}
            </h4>
            <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
               US${totalPrice}
            </h4>
            </div>
            <div>
              <BsCartPlus size={20} className="cursor-pointer text-slate-600" tile="Add to cart" onClick={() => addToCartHandler(data)} />
            </div>
         </div>
      </div>
   )
}

export default WishListPopUp_02