import { Button, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SearchResources_02 = () => {
   const [sidebarData, setSidebarData] = useState({
      searchTerm: '',
      sort: 'desc',
      category: 'Uncategorized',
   })
   console.log(sidebarData);
   const [sharedResources, setSharedResources] = useState([]);
   const [loading, setLoading] = useState(false);
   const [showMore, setShowMore] = useState(false);
   const location = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      const sortFromUrl = urlParams.get('sort');
      const categoryFromUrl = urlParams.get('category');
      if(searchTermFromUrl || sortFromUrl || categoryFromUrl){
         setSidebarData({
            ...sidebarData,
            searchTerm: searchTermFromUrl,
            sort: sortFromUrl,
            category: categoryFromUrl
         });
      }

      const fetchSharedResources = async () => {
         setLoading(true);
         const searchQuery = urlParams.toString();
         const res = await fetch(`/api/sharedResourcesListing/getSharedResources?${searchQuery}`);
         if(!res.ok){
            setLoading(false);
            return;
         }
         if(res.ok) {
            const data = await res.json();
            setSharedResources(data.resources);
            setLoading(false);
            if(data.resources.length === 9) {
               setShowMore(true);
            } else {
               setShowMore(false);
            }
         }
      }
      fetchSharedResources();
      
   }, [location.search])

   const handleChange = (e) => {
      if(e.target.id === 'searchTerm') {
         setSidebarData({
            ...sidebarData,
            searchTerm: e.target.value
         })
      }
      if(e.target.id === 'sort') {
        const order = e.target.value || 'desc';
        setSidebarData({...sidebarData, sort: order});
      }
      if(e.target.id === 'category') {
         const category = e.target.value || 'Uncategorized';
         setSidebarData({...sidebarData, category});
      }
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('searchTerm', sidebarData.searchTerm);
      urlParams.set('sort', sidebarData.sort);
      urlParams.set('category', sidebarData.category);
      const searchQuery = urlParams.toString();
      navigate(`/searchResource?${searchQuery}`);
   }

   const handleShowMore = async () => {
      const numberOfPosts = sharedResources.length;
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
         setSharedResources([...sharedResources, ...data.resources]);
         if(data.resources.length === 9) {
            setShowMore(true);
         } else {
            setShowMore(false);
         }
      }
   }

  return (
    <div className='flex flex-col md:flex-row'>
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
         <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
            <div className="flex items-center gap-2">
               <label className='whitespace-nowrap font-semibold'>
                  Search Term:
               </label>
               <TextInput placeholder='Search...' id='searchTerm' type='text' value={sidebarData.searchTerm} onChange={handleChange} />
            </div>
            <div className="flex items-center gap-2">
               <label className='font-semibold'>Sort:</label>
               <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
                  <option value='desc'>Latest</option>
                  <option value='asc'>Oldest</option>
               </Select>
            </div>
            <div className="flex items-center gap-2">
               <label className='font-semibold'>Category:</label>
               <Select onChange={handleChange} value={sidebarData.category} id='category'>
               <option value="Uncategorized">Uncategorized</option>
               <option value="Refrigerator">Refrigerator</option>
               <option value="Heaters">Heaters</option>
               <option value="MicroWave">MicroWave</option>
               <option value="Speakers">Speakers</option>
               <option value="Washing Machine">Washing Machine</option>
               <option value="DiningTable">Dining Table</option>
               <option value="Credenza">Credenza</option>
               <option value="ArmChair">Arm Chair</option>
               <option value="BesideTable">Bedside Table</option>
               <option value="Dresser">Dresser</option>
               <option value="Cabinet">Cabinet</option>
               <option value="WoodenBench">Wooden Bench</option>
               <option value="ElectricDrill">Electric Drill</option>
               <option value="Pruning Shares">Pruning Shares</option>
               <option value="Hedge Shares">Hedge Shares</option>
               <option value="Mower">Mower</option>
               <option value="Hedge Trimmer">Hedge Trimmer</option>
               <option value="Pruning Saw">Pruning Saw</option>
               <option value="Ladder">Ladder</option>
               </Select>
            </div>
            <Button type='submit' outline gradientDuoTone='purpleToBlue'>
               Apply Filters
            </Button>
         </form>
      </div>
      <div className="w-full">
         <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>Posts results:</h1>
         <div className="p-7 flex flex-wrap gap-4">
            {
               !loading && sharedResources.length === 0 && (
                  <p className='text-xl text-gray-500'>No posts found.</p>
               )
            }
            {
               loading && <p className='text-xl text-gray-500'>Loading...</p>
            }
            {
               !loading && sharedResources && sharedResources.map((resource) => (
                  <div key={resource._id}>
                     <div className="group relative w-full border border-teal-500 overflow-hidden rounded-lg sm:w-[330px] transition-all">
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
               ))
            }
            {
               showMore && (
                  <button onClick={handleShowMore} className='text-teal-500 text-lg hover:underline p-7 w-full'>
                     Show More
                  </button>
               )
            }
         </div>
      </div>
    </div>
  )
}

export default SearchResources_02