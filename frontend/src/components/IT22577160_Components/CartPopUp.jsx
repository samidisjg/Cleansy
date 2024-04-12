import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { IoBagHandleOutline } from 'react-icons/io5'
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from '../../../redux/IT22577160_redux/cartSlice.js';
import { toast } from 'react-toastify';
import { Button } from 'flowbite-react';
import {loadStripe} from '@stripe/stripe-js';

const CartPopUp = ({setOpenCart}) => {
   const { cart } = useSelector((state) => state.cart);
   const dispatch = useDispatch();
   console.log(cart);

   const removeFormCartHandler = (data) => {
      dispatch(removeFromCart(data._id))
   }

   const totalPrice = cart.reduce((acc, item) => acc + (item.regularPrice - item.discountPrice) * item.quantity, 0);

   const quantityChangeHandler = (data) => {
      dispatch(addToCart(data))
   }

   // payment integration
   const makePayment = async() => {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      const body = {
         products: cart,
      }
      const headers = {
         "Content-Type": "application/json",
      }
      const res = await fetch('/api/checkout/creteCheckout', {
         method: "POST",
         headers,
         body: JSON.stringify(body),
      })

      const session = await res.json();
      const result = await stripe.redirectToCheckout({
         sessionId: session.id,
      });
      if(result.error) {
         toast.error(result.error);
      }
   }

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] z-50">
      <div className="fixed top-0 right-0 h-full lg:w-[30%] border-2 border-teal-500 bg-slate-100 rounded-md flex flex-col overflow-y-scroll justify-between shadow-sm">
         {
            cart && cart.length === 0 ? (
               <div className="w-full h-screen flex items-center justify-center">
                  <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                     <RxCross1 size={25} className="cursor-pointer text-slate-600 border border-teal-500 rounded-md" onClick={() => setOpenCart(false)} />
                  </div>
                  <h5 className='text-slate-600 font-semibold'>Cart Items is Empty!</h5>
               </div>
            ) : (
               <>
                  <div>
                     <div className="flex w-full justify-end pt-5 pr-5">
                        <RxCross1 size={25} className="cursor-pointer text-slate-600 border border-teal-500 rounded-md" onClick={() => setOpenCart(false)} />
                     </div>
                     {/* Item length */}
                     <div className='flex items-center p-4'>
                        <IoBagHandleOutline size={25} className='text-slate-600' />
                        <h5 className="pl-2 text-[20px] font-[500] text-slate-600">
                           {cart && cart.length} items
                        </h5>
                     </div>
                     {/* cart Single Items */}
                     <br />
                     <div className="w-full border-t border-teal-500">
                        {
                           cart && cart.map((i, index) => (
                              <CartSingle data={i} key={index} quantityChangeHandler={quantityChangeHandler} removeFormCartHandler={removeFormCartHandler} />
                           ))
                        }
                     </div>
                  </div>
                  <div className="px-5 mb-3">
                     {/* checkout buttons */}
                     {/* <Link to="/checkout"> */}
                        <Button gradientDuoTone='purpleToBlue' className='w-full' onClick={makePayment}>
                           <h1 className="text-[#fff] text-[18px] font-[600]">
                              Checkout Now (USD${totalPrice})
                           </h1>
                        </Button>
                        {/* <div className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`} >
                        </div> */}
                     {/* </Link> */}
                  </div>
               </>
            )
         }
      </div>
    </div>
  )
}

const CartSingle = ({data, quantityChangeHandler, removeFormCartHandler}) => {
   const [value, setValue] = useState(data.quantity);
   const totalPrice = (data.regularPrice - data.discountPrice) * value;

   const increment = (data) => {
      if(data.quantity < value) {
         toast.error("Sorry! The quantity is not available in stock");  
      } else {
         setValue(value + 1);
         const updateCardData = {...data, quantity: value + 1};
         quantityChangeHandler(updateCardData);
      }
   }
   const decrement = (data) => {
      setValue(value === 1 ? 1 : value - 1);
      const updateCardData = {...data, quantity: value === 1 ? 1 : value - 1};
      quantityChangeHandler(updateCardData);
   }
   return (
      <div className="border-b border-teal-500 p-4 w-full">
         <div className="w-full flex items-center">
            <div>
               <div className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer`} onClick={() => increment(data)}>
                  <HiPlus size={18} color='#fff' />
               </div>
               <span className="pl-[10px] text-slate-600">{data.quantity}</span>
               <div className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer" onClick={() => decrement(data)}>
                  <HiOutlineMinus size={16} color="#7d879c" />
               </div>
            </div>
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
            <RxCross1
               className="cursor-pointer text-slate-600 font-bold border border-teal-500 rounded-md"  onClick={() => removeFormCartHandler(data)}  
            />
         </div>
      </div>
   )
}

export default CartPopUp