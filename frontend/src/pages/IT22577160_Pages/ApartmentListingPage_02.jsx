import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide} from "swiper/react"
import SwiperCore from "swiper"
import { Navigation } from "swiper/modules";
import 'swiper/css/bundle';
import { FaBath, FaBed, FaChair, FaMapMarkedAlt, FaMapMarkerAlt, FaParking, FaShare } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react"
import Contacts_02 from '../../components/IT22577160_Components/Contacts_02';

const ApartmentListingPage_02 = () => {
   SwiperCore.use([Navigation]);
   const [listing, setListing] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const [copied, setCopied] = useState(false);
   const [contact, setContact] = useState(false);
   const {currentUser} = useSelector((state) => state.user);
   const params = useParams();
   useEffect(() => {
      const fetchListing = async () => {
         try {
            setLoading(true);
            const res = await fetch(`/api/apartmentListing/getListing/${params.listingId}`);
            const data = await res.json();
            if(data.success === false) {
               setError(true);
               setLoading(false);
               return;
            }
            setListing(data);
            setLoading(false);
            setError(false);
         } catch (error) {
            setError(true);
            setLoading(false);
         }
      }
      fetchListing();
   }, [params.listingId])

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
         <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
         <div>
            <Swiper navigation>
               {listing.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                     <div className='h-[550px]' style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover',}}>
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
            <div className="fixed z-10 top-[13%] right-[3%] border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
               <FaShare className='text-slate-500' 
               onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                     setCopied(false);
                  }, 2000);
               }} />
            </div>
            {copied && (
               <p className='fixed z-10 top-[23%] right-[5%] rounded-md bg-slate-100 p-2 dark:text-slate-700'>Link copied!</p>
            )}
            <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
               <p className="text-2xl font-semibold">
                  {listing.ownerName} - ${' '}
                  {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                  {listing.type === 'rent' && '/month'}
               </p>
               <div className="flex items-center mt-6 gap-10">
                  <p className='flex items-center text-slate-600  text-sm'>
                     <FaMapMarkerAlt className='text-green-700 mr-2' /> {listing.blockNumber}
                  </p>
                  <p className='text-slate-600  text-sm font-semibold'>{listing.ownerContactNumber}</p>
               </div>
               <div className="flex gap-4">
                  <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                     {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                  </p>
                  {listing.offer && (
                     <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                        ${+listing.regularPrice - +listing.discountPrice} OFF
                     </p>
                  )}
               </div>
               <p className="text-slate-800 dark:text-slate-500">
                  <span className="font-semibold text-black dark:text-slate-300">Description - </span>
                  {listing.description}
               </p>
               <ul className="text-green-900 dark:text-teal-500 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                  <li className="flex items-center gap-1 whitespace-nowrap">
                     <FaBed className="text-lg" />
                     {listing.bedrooms > 1 ? `${listing.bedrooms} beds` :  `${listing.bedrooms} bed` }
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap">
                     <FaBath className="text-lg" />
                     {listing.bathrooms > 1 ? `${listing.bathrooms} baths` :  `${listing.bathrooms} bath` }
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap'>
                     <FaParking className="text-lg" />
                     {listing.parking ? 'Parking spot' : 'No parking'}
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap'>
                     <FaChair className="text-lg" />
                     {listing.furnished ? 'Furnished' : 'Unfurnished'}
                  </li>
               </ul>
               {
                  currentUser && listing.userRef !== currentUser._id && !contact && (
                     <Button gradientDuoTone='purpleToBlue' onClick={() => setContact(true)}>
                        Contact Landlord
                     </Button>
                  )
               }
               {contact && <Contacts_02 listing={listing}/>}
            </div>
         </div>
      )}
    </main>
  )
}

export default ApartmentListingPage_02