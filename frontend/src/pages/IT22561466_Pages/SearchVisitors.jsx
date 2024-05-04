import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchVisitors() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      try {
        const res = await fetch(`/api/visitorListing/get?${searchQuery}`);
        const data = await res.json();
        setListings(data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchListings();
  }, [location.search]);

  return (
    <div>
      <h1 className='text-3xl font-semibold p-3 text-slate-700 mt-5'>Visitor results : </h1>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listings.length === 0 && !loading && !error && (
        <p className='text-center my-7 text-2xl'>No results found.</p>
      )}
      {listings.length > 0 && !loading && !error && (
        <div>
          {listings.map((listing, index) => (
            <div key={index} className='bg-white rounded-lg shadow-md p-6 mb-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-lg font-semibold mb-2 dark:text-slate-700'>
                    Owner Name:
                  </p>
                  <p className='text-lg dark:text-slate-700'>
                    {listing.ownerName}
                  </p>
                </div>
                <div>
                  <p className='text-lg font-semibold mb-2 dark:text-slate-700 '>
                    Visitor Name:
                  </p>
                  <p className='text-lg dark:text-slate-700'>
                    {listing.guestName}
                  </p>
                </div>
                <div>
                  <p className='text-lg font-semibold mb-2 dark:text-slate-700'>
                    Tel No:
                  </p>
                  <p className='text-lg dark:text-slate-700'>{listing.telNo}</p>
                </div>
                <div>
                  <p className='text-lg font-semibold mb-2 dark:text-slate-700'>
                    Date:
                  </p>
                  <p className='text-lg dark:text-slate-700'>{listing.date}</p>
                </div>
                <div>
                  <p className='text-lg font-semibold mb-2 dark:text-slate-700'>
                    Time:
                  </p>
                  <p className='text-lg dark:text-slate-700'>{listing.time}</p>
                </div>
                <div>
                  <p className='text-lg font-semibold mb-2 dark:text-slate-700'>
                    Purpose:
                  </p>
                  <p className='text-lg dark:text-slate-700'>
                    {listing.purpose}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
