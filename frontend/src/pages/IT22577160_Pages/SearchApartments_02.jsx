import { Button, Select, TextInput, Checkbox } from 'flowbite-react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApartmentListingCard_02 from '../../components/IT22577160_Components/ApartmentListingCard_02';

const SearchApartments_02 = () => {
   const [sidebardata, setSidebardata] = useState({
      searchTerm: '',
      type: 'all',
      parking: false,
      furnished: false,
      offer: false,
      sort: 'created_at',
      order: 'desc',
   });
   const [loading, setLoading] = useState(false);
   const [listings, setListings] = useState([]);
   const [showMore, setShowMore] = useState(false);
   const navigate = useNavigate();

   const handleChange = (e) => {
      if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
         setSidebardata({...sidebardata, type: e.target.id});
      }

      if (e.target.id === 'searchTerm') {
         setSidebardata({...sidebardata, searchTerm: e.target.value});
      }

      if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
         setSidebardata({...sidebardata, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false});
      }

      if (e.target.id === 'sort_order') {
         const sort = e.target.value.split('_')[0] || 'created_at';
         const order = e.target.value.split('_')[1] || 'desc';
         setSidebardata({...sidebardata, sort, order});
      }
   }

   useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      const typeFromUrl = urlParams.get('type');
      const parkingFromUrl = urlParams.get('parking');
      const furnishedFromUrl = urlParams.get('furnished');
      const offerFromUrl = urlParams.get('offer');
      const sortFromUrl = urlParams.get('sort');
      const orderFromUrl = urlParams.get('order');

      if(searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
         setSidebardata({
            searchTerm: searchTermFromUrl || '',
            type: typeFromUrl || 'all',
            parking: parkingFromUrl === 'true' ? true : false,
            furnished: furnishedFromUrl === 'true' ? true : false,
            offer: offerFromUrl === 'true' ? true : false,
            sort: sortFromUrl || 'created_at',
            order: orderFromUrl || 'desc',
         })
      }

      const fetchListings = async () => {
         setLoading(true);
         const searchQuery = urlParams.toString();
         const res = await fetch(`/api/apartmentListing/getListings?${searchQuery}`);
         const data = await res.json();
         if (data.length > 8) {
            setShowMore(true);
         } else {
            setShowMore(false);
         }
         setListings(data);
         setLoading(false);
      }

      fetchListings();
   }, [location.search])

   const handleSubmit = async (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(); 
      urlParams.set('searchTerm', sidebardata.searchTerm);
      urlParams.set('type', sidebardata.type);
      urlParams.set('parking', sidebardata.parking);
      urlParams.set('furnished', sidebardata.furnished);
      urlParams.set('offer', sidebardata.offer);
      urlParams.set('sort', sidebardata.sort);
      urlParams.set('order', sidebardata.order);
      const searchQuery = urlParams.toString();
      navigate(`/searchApartments?${searchQuery}`);
   }

   const onShowMoreClick = async () => {
      const numberOfListings = listings.length;
      const startIndex = numberOfListings;
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('startIndex', startIndex);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/apartmentListing/getListings?${searchQuery}`);
      const data = await res.json();
      if (data.length < 9) {
         setShowMore(false);
      }
      setListings([...listings, ...data]);
   }

  return (
    <div className='flex flex-col md:flex-row'>
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
         <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className="flex items-center gap-2">
               <label className='whitespace-nowrap font-semibold'>Search Term:</label>
               <TextInput type='text' placeholder='Search...' id='searchTerm' value={sidebardata.searchTerm} onChange={handleChange}/>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
               <label className="font-semibold">Type:</label>
               <div className='flex items-center gap-2'>
                  <Checkbox type="checkbox" id='all' onChange={handleChange} checked={sidebardata.type === 'all'} />
                  <span>Rent & Sale</span>
               </div>
               <div className='flex items-center gap-2'>
                  <Checkbox type="checkbox" id='rent' onChange={handleChange} checked={sidebardata.type === 'rent'} />
                  <span>Rent</span>
               </div>
               <div className='flex items-center gap-2'>
                  <Checkbox type="checkbox" id='sale' onChange={handleChange} checked={sidebardata.type === 'sale'} />
                  <span>Sale</span>
               </div>
               <div className='flex items-center gap-2'>
                  <Checkbox type="checkbox" id='offer' onChange={handleChange} checked={sidebardata.offer} />
                  <span>Offer</span>
               </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
               <label className="font-semibold">Amenities:</label>
               <div className='flex items-center gap-2'>
                  <Checkbox type="checkbox" id='parking' onChange={handleChange} checked={sidebardata.parking} />
                  <span>Parking</span>
               </div>
               <div className='flex items-center gap-2'>
                  <Checkbox type="checkbox" id='furnished' onChange={handleChange} checked={sidebardata.furnished} />
                  <span>Furnished</span>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <label className="font-semibold">Sort:</label>
               <Select id="sort_order" onChange={handleChange} defaultValue={'created_at_desc'}>
                  <option value='regularPrice_desc'>Price high to low</option>
                  <option value='regularPrice_asc'>Price low to hight</option>
                  <option value='createdAt_desc'>Latest</option>
                  <option value='createdAt_asc'>Oldest</option>
               </Select>
            </div>
            <Button type='submit' gradientDuoTone='purpleToBlue'>
               SEARCH
            </Button>
         </form>
      </div>
      <div className="flex-1">
         <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>Listing Result:</h1>
         <div className="p-7 flex flex-wrap gap-4">
            {!loading && listings.length === 0 && (
               <p className='text-xl text-center w-full font-semibold'>No Listings Found!</p>
            )}
            {loading && (
               <p className='text-xl text-center w-full font-semibold'>Loading...</p>
            )}
            {!loading && listings && listings.map((listing) => (
               <ApartmentListingCard_02 key={listing._id} listing={listing}/>
            ))}
            {showMore && (
               <button onClick={onShowMoreClick} className='text-teal-500 hover:underline p-7 text-center w-full'>Show More</button>
            )}
         </div>
      </div>
    </div>
  )
}

export default SearchApartments_02