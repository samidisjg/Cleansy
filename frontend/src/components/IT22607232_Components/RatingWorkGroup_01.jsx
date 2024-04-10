import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MdLocationOn, MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import {Modal, Button} from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const RatingWorkGroup_01 = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [showTasksError, setShowTasksError] = useState(false);
    const [showTasks, setShowTasks] = useState([]);
    const dispatch = useDispatch();


useEffect(() => {
    handleShowAssignments(); // Call the function directly when the component mounts
  }, [currentUser._id]);

  const handleShowAssignments = async () => {
    try {
      const res = await fetch("/api/taskAssign/all");
      const data = await res.json();
      if (data.success === false) {
        setShowTasksError(true);
        return;
      }
      setShowTasks(data);
    } catch (error) {
      setShowTasksError(true);
    }
  };


  return (
    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
      <h1 className='text-center mt-7 font-extrabold text-3xl underline'>Completed Mainatainance Tasks</h1>
   
      {
       currentUser.isFacilityAdmin &&(
          <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 mb-6 gap-10'>
            {
              apartmentListing.map((listing) => (
                <>
                  <div key={listing._id}>
                      <li className="group relative w-full border border-teal-500 overflow-hidden rounded-lg sm:w-[330px] transition-all">
                        <Link className="content" to={`/apartmentListing/${listing._id}/`}>
                          <img src={listing.imageUrls[0]} alt="listing cover" className='h-[230px] w-full object-cover  transition-all duration-300 z-20'/>
                          
                          <div className="w-full p-[10px]">
                            <div className="flex items-center space-x-1">
                              <MdLocationOn className="h-4 w-4 text-green-500" />
                              <p >{listing.blockNumber}</p>
                            </div>
                            <p className="font-semibold text-xl text-slate-700 dark:text-slate-200 truncate">{listing.ownerName}</p>
                            <p className="font-semibold text-sm text-slate-400">{listing.ownerContactNumber}</p>
                            <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
                            <p className="text-[#457b9d] mt-2 font-semibold">${listing.offer ? listing.discountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {listing.type === "rent" && " / month"}</p>
                            <div className="flex items-center mt-[10px] space-x-3">
                              <div className="font-bold text-xs">
                                <p >{listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}</p>
                              </div>
                              <div className="font-bold text-xs">
                                <p >{listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <FaTrash onClick={() => setShowModal(true)} className="absolute bottom-2 right-2 text-red-500 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer h-[14px]" />
                        <Link to={`/update-apartmentListing/${listing._id}`}>
                          <MdEdit className="absolute bottom-2 right-7 text-green-500 hover:text-green-700 transition ease-in-out duration-200 h-4" />
                        </Link>
                      </li>    
                        <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                          <Modal.Header />
                          <Modal.Body>
                            <div className="text-center">
                              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete your account?</h3>
                              <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={() => handleApartmentListingDelete(listing._id)}>
                                    Yes I'm Sure
                                </Button>
                                <Button color='gray' onClick={() => setShowModal(false)}>No, Cancel</Button>
                              </div>
                            </div>
                          </Modal.Body>
                        </Modal>
                  </div>
                </>
              ))}
  
     
          </ul>
          )
          
      }
    </div>
  )
}

export default RatingWorkGroup_01