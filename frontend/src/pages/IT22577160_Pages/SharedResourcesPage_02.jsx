import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaRegMessage } from "react-icons/fa6";
import CommentSection_02 from '../../components/IT22577160_Components/CommentSection_02';
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { addToCart } from '../../../redux/IT22577160_redux/cartSlice.js';
import MarketPlaceHeader_02 from '../../components/IT22577160_Components/MarketPlaceHeader_02.jsx';
import { addToWishlist, removeFromWishlist } from '../../../redux/IT22577160_redux/wishList_02.js';

const SharedResourcesPage_02 = () => {
   const { cart } = useSelector((state) => state.cart);
   const { wishlist } = useSelector((state) => state.wishlist);
   const {currentUser} = useSelector(state => state.user);
   const { resourceSlug } = useParams();
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const [resources, setResources] = useState(null);
   const [count, setCount] = useState(1);
   const [click, setClick] = useState(false);
   const dispatch = useDispatch()
   const navigate = useNavigate();

   const decrementCount = () => {
      if (count > 1) {
        setCount(count - 1);
        setResources(prevState => ({ ...prevState, quantity: prevState.quantity + 1 }));
      }
    }

   const incrementCount = () => {
      if (count < resources.quantity) {
         setCount(count + 1);
         setResources(prevState => ({ ...prevState, quantity: prevState.quantity - 1 }));
      } else {
         toast.error("Sorry! The quantity is not available in stock");
      }
   }

   useEffect(() => {
      const fetchResource = async () => {
         try {
            setLoading(true);
            const res = await fetch(`/api/sharedResourcesListing/getSharedResources?slug=${resourceSlug}`);
            const data = await res.json();
            if(!res.ok) {
               setError(true);
               setLoading(false);
               return;
            }
            if(res.ok) {
               setResources(data.resources[0]);
               setLoading(false);
               setError(false);
            }
         } catch (error) {
            setError(true);
            setLoading(false);
         }
      }
      fetchResource();
   }, [resourceSlug])

   const addToCartHandler = async (id) => {
      const existingItem = cart && cart.find((i) => i._id === id);
      if(existingItem) {
         toast.error("Item already in the cart");
      } else {
         if(resources.quantity < count) {
            toast.error("Sorry! The quantity is not available in stock");  
         } else {
            const cartData = {...resources, quantity: count};
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

   const handleMessageSubmit = async (e) => {
      try {   
         const groupTitle = resources._id + currentUser._id;
         const userId = currentUser._id;
         const adminId = resources.userId;
   
         const res = await fetch('/api/conversation/createNewConversation', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ groupTitle, userId, adminId })
         })

         // .then((res) => {
         //    navigate(`/conversation/${groupTitle}`)
         // }).catch((error) => {
         //    toast.error(error.response.data.message);
         // });

         if(res.ok) {
            const data = await res.json();
            const conversationId = data._id;
            navigate(`/conversation/${conversationId}`);
         }
      } catch (error) {
         toast.error("Please login to create a conversation");
      }
   }

   if(loading) {
      return (
         <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='xl' />
         </div>
      )
   }
  return (
   <>
   <MarketPlaceHeader_02 />
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{resources && resources.title}</h1>
      <Link to={`/search?category=${resources && resources.category}`} className='self-center mt-5'>
         <Button color='gray' pill size='xs'>{resources && resources.category}</Button>
      </Link>
      <img src={resources && resources.image} alt={resources && resources.title} className='mt-10 p-3 max-h-[500px] w-[80%] mx-auto object-cover' />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
         <span>{resources && new Date(resources.createdAt).toLocaleDateString()}</span>
         <span className='italic'>(4.2) Rating</span>
      </div>
      <h2 className='text-xl mt-10 max-w-2xl mx-auto text-center font-sans'>{resources && resources.description}</h2>
         <div className='flex mt-5 max-w-6xl gap-5 mx-auto'>
            <div className=''>
               <p className='bg-red-900 w-full text-white text-center px-8 py-1 rounded-md mx-auto max-w-[200px]'>
                  {resources.type == 'rent' ? 'For Rent' : 'For Sale'}
               </p>
            </div>
            <div>
               {
                  resources.offer && (
                     <p className='bg-green-900 w-full text-white text-center px-8 py-1 rounded-md mx-auto max-w-[200px]'>
                        ${+resources.regularPrice - +resources.discountPrice} OFF
                     </p>
                  )
               }
            </div>
         </div>
      <div className='flex justify-between max-w-2xl w-full mx-auto gap-5 mt-5 '>
         <div className="flex text-xs">
            <AiFillStar className='mr-2 cursor-pointer' color='#F6BA00' size={20}/>
            <AiFillStar className='mr-2 cursor-pointer' color='#F6BA00' size={20}/>
            <AiFillStar className='mr-2 cursor-pointer' color='#F6BA00' size={20}/>
            <AiFillStar className='mr-2 cursor-pointer' color='#F6BA00' size={20}/>
            <AiOutlineStar className='mr-2 cursor-pointer' color='#F6BA00' size={20}/>
         </div>
         {/* <div className='text-sm text-teal-600 font-semibold'>
            {resources && resources.quantity + " In Stock" }
         </div> */}
         <div className='text-sm text-red-600 font-semibold'>
            <p>Condition {resources && resources.condition + "%"}</p>
         </div>
      </div>
      <div className='flex justify-between max-w-2xl w-full mx-auto mt-5 gap-6'>
         <div className='flex'>
            <button onClick={decrementCount} className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold px-5 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'>
              -
            </button>
            <button className='bg-gray-200 text-gray-800 font-medium px-5 py-[10px]'>
              {count}
            </button>
            <button onClick={incrementCount} className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'>
              +
            </button>
         </div>
         {
            click ? (
               <AiFillHeart size={22}  onClick={() => removeFromWishListHandler(resources)} className='cursor-pointer'color={click ? "red" : ""} title="Remove from wishlist" />
            ) : (
               <AiOutlineHeart size={22}  onClick={() => addToWishListHandler(resources)}  className='cursor-pointer'color={click ? "red" : ""} title="Add to wishlist"  />
            )
         }
      </div>
      <div className='flex justify-between max-w-2xl mx-auto mt-5 gap-6 w-full'>
         <Button color='dark' size='md' onClick={() => addToCartHandler(resources._id)}>Add to Cart <span className='pl-2'><AiOutlineShoppingCart size={15} /></span></Button>
         <div className='text-sm text-teal-500 font-semibold'>
            {resources && resources.quantity + " In Stock" }
         </div>
         {/* <Button color='dark' size='md' >Send Message <span className='pl-2'><FaRegMessage size={15} /></span></Button> */}
      </div>
      <div className='max-w-4xl mx-auto w-full mt-5'>
         <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
            <div className='flex-1 justify-center flex flex-col '>
               <h2 className='text-2xl'>Want to get more details about Shared Resources?</h2>
               <p className='text-gray-500 my-2'>Send Message For Us? Hurry UP!</p>
               <div onClick={handleMessageSubmit}>
                  <Button gradientDuoTone='purpleToBlue' className='rounded-tl-xl rounded-bl-none w-full'>Send Message <span className='pl-2'><FaRegMessage size={15} /></span></Button>
               </div>
            </div>
            <div className='p-7 flex-1'>
               <img src="https://media.istockphoto.com/id/1311966784/photo/chat-speech-bubble-on-smart-phone-screen.jpg?s=612x612&w=0&k=20&c=6qC75HU6r9pWmlFCJ7kjyHhbFUx27J1gYD02sS0aufU=" alt="" />
            </div>
         </div>
      </div>
      <CommentSection_02 resourceId={resources._id}/>
    </main>
   </>
  )
}

export default SharedResourcesPage_02