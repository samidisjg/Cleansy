import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { AiOutlineSearch } from 'react-icons/ai';
import { Button, TextInput } from 'flowbite-react';
import { BsTrash } from 'react-icons/bs';

export default function CarParkAdminPage() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const path = useLocation().pathname
    const navigate = useNavigate();
    const [userListings, setUserListings] = useState([]);
    
    useEffect(() => {
        const fetchListings = async () => {
            try {
                setLoading(true);
                // Fetch all visitor listings
                const res = await fetch('/api/carparkListing/getAll');
                const data = await res.json();
                if (!res.ok) {
                    throw new Error('Failed to fetch carpark listings');
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
      const headers = [['Owner Name', 'Email', 'Tel No', 'Vehicle Type', 'Vehicle Number', 'NIC', 'Slot Number']];
    
      // Define table rows
      const data = listings.map(listing => [
        listing.ownerName,
        listing.email,
        listing.telNo,
        listing.vehicleType,
        listing.vehicleNum,
        listing.nic,
        listing.slotId
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


  const handleListingDelete = async (carparkListingId) => {
    try {
        const res = await fetch(`/api/carparkListing/delete/${carparkListingId}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if (data.success === false) {
            console.log(data.message);
            return;
        }
        setListings(prevListings => prevListings.filter(listing => listing._id !== carparkListingId));
    } catch (error) {
        console.log(error.message);
    }
};



  return (
    <main className="container mx-auto px-4">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold my-7">Carparking Details</h1>
            <div className='flex justify-between items-center'>
                <Button onClick={generateReport} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                    Generate Report
                </Button>
            </div>
        </div>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && ( 
            <p className='text-center my-7 text-2xl'>Something went wrong!</p>
        )}
    
        {listings.length > 0 && !loading && !error && 
            <div>
                <table className="table-auto dark:text-slate-700">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 dark:text-white">Owner Name</th>
                            <th className="px-4 py-2 dark:text-white">Email</th>
                            <th className="px-4 py-2 dark:text-white">Tel No</th>
                            <th className="px-4 py-2 dark:text-white">Vehicle Type</th>
                            <th className="px-4 py-2 dark:text-white">Vehicle Number</th>
                            <th className="px-4 py-2 dark:text-white">NIC</th>
                            <th className="px-4 py-2 dark:text-white">Parking Slot Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listings.map((listing, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="border px-4 py-2">{listing.ownerName}</td>
                                <td className="border px-4 py-2">{listing.email}</td>
                                <td className="border px-4 py-2">{listing.telNo}</td>
                                <td className="border px-4 py-2">{listing.vehicleType}</td>
                                <td className="border px-4 py-2">{listing.vehicleNum}</td>
                                <td className="border px-4 py-2">{listing.nic}</td>
                                <td className="border px-4 py-2">{listing.slotId}</td>
                                <td className="border px-4 py-2">
                                <button onClick={() => handleListingDelete(listing._id)} className="text-red-500">{''} <BsTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        }
    </main>
);

}
