import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { AiOutlineSearch } from 'react-icons/ai';
import { Button, TextInput } from 'flowbite-react';
import { FaSearch } from 'react-icons/fa';

export default function VisitorAdminPage() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const path = useLocation().pathname
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchListings = async () => {
            try {
                setLoading(true);
                // Fetch all visitor listings
                const res = await fetch('/api/visitorListing/getAll');
                const data = await res.json();
                if (!res.ok) {
                    throw new Error('Failed to fetch visitor listings');
                }
                setListings(data); 
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }    
        };
        fetchListings();
    }, []); // Empty dependency array to fetch data only once on component mount

    const generateReport = () => {
      // Create a new PDF document
      const doc = new jsPDF();
      // Set initial y position for text
      let yPos = 10;
      
      // Add title to the report
      doc.setFontSize(20);
      doc.text('Visitor Report', 105, yPos + 20, { align: 'center' });
      yPos += 40; // Increase yPos after adding title
      
      // Define table headers
      const headers = [['Owner Name', 'Visitor Name', 'Tel No', 'Date', 'Time', 'Purpose']];
    
      // Define table rows
      const data = listings.map(listing => [
        listing.ownerName,
        listing.guestName,
        listing.telNo,
        listing.date,
        listing.time,
        listing.purpose
      ]);

      const logo = '/cleansyBG.png'

      const imgWidth = 160;
      const imgHeight = 120;

      const centerX = (doc.internal.pageSize.getWidth() - imgWidth / 0.9);
      const centerY = (doc.internal.pageSize.getHeight() - imgHeight / 0.5);

      const addWaterMark = () => {
        doc.addImage(logo, "JPEG", centerX, centerY, imgWidth, imgHeight)
      }
    
      // Create the table
      doc.autoTable({
        startY: yPos,
        head: headers,
        body: data,
        startY:40,
        addPageContent: addWaterMark,
        theme: 'grid',
        styles: { cellPadding: 5, fontSize: 12, fontStyle: 'normal' }
      });
    
      // Save the document
      doc.save('visitor_report.pdf');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  },[location.search])


    return (
        <main className="container mx-auto px-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold my-7">Visitor Details</h1>
                <div className='flex justify-between items-center'>
                    <Button onClick={generateReport} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                        Generate Report
                    </Button>
                      <form onSubmit={handleSubmit}>
                        <TextInput type="text" placeholder="Search Visitor..." rightIcon={AiOutlineSearch} className="hidden lg:inline" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
                          <FaSearch/>
                        </Button>
                      </form>
                </div>
            </div>
            {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
            {error && ( 
                <p className='text-center my-7 text-2xl'>Something went wrong!</p>
            )}

            {listings.length > 0 && !loading && !error && 
                <div>
                    {listings.map((listing, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-4">
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
                    ))}
                </div>
            }
        </main>
    );
}
