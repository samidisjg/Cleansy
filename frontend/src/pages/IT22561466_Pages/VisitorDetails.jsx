import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import Link from react-router-dom
import visitorListing from '../../../../backend/models/IT22561466_Models/visitorListing.model';

export default function VisitorDetails() {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    // Accessing URL parameters
    const { visitorListingId } = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                // Correctly using visitorListingId in the URL
                const res = await fetch(`/api/visitorListing/get/${visitorListingId}`);
                const data = await res.json();
                if (data.success === false) {
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
        };
        fetchListing();
    }, [visitorListingId]); // Adding visitorListingId as a dependency



    return (
        <main className="container mx-auto px-4">
            {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
            {error && ( 
                <p className='text-center my-7 text-2xl'>Something went wrong!</p>
            )}
            {listing && !loading && !error && 
                <div>
                    <h1 className="text-3xl text-center font-bold mb-4">Visitor Details</h1>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-lg font-semibold mb-2 dark:text-slate-700">Owner Name:</p>
                                <p className="text-lg dark:text-slate-700">{listing.ownerName}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold mb-2 dark:text-slate-700 ">Visitor Name:</p>
                                <p className="text-lg dark:text-slate-700">{listing.guestName}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold mb-2 dark:text-slate-700">Tel No:</p>
                                <p className="text-lg dark:text-slate-700">{listing.telNo}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold mb-2 dark:text-slate-700">Date:</p>
                                <p className="text-lg dark:text-slate-700">{listing.date}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold mb-2 dark:text-slate-700">Time:</p>
                                <p className="text-lg dark:text-slate-700">{listing.time}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold mb-2 dark:text-slate-700">Purpose:</p>
                                <p className="text-lg dark:text-slate-700">{listing.purpose}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                        
                        <Link to="/add-visitors">
                            <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Back to Add Visitors
                            </button>
                        </Link>
                    </div>
                </div>
            }
        </main>
    );
}
