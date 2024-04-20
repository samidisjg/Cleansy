import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'; // Import the SearchBar component
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const AnnouncementForAdmin = () => {
   const [announcements, setAnnouncements] = useState([]);
   const [searchQuery, setSearchQuery] = useState('');
   const tableRef = useRef(null);
   //  const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const response = await axios.get('/api/announcements/read');
            setAnnouncements(response.data);
            // setLoading(false);
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
    };

    const deleteAnnouncement = async (id) => {
      try {
          await axios.delete(`/api/Announcement/${id}`);
          setAnnouncements(announcements.filter(announcement => announcement._id !== id));
      } catch (error) {
          console.error('Error deleting announcement:', error);
      }
  };

  // Handle search query change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Filter announcements based on search query
  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateAnnouncement = (id) => {
    const announcementToUpdate = announcements.find((announcement) => announcement._id === id);
    history.push(`/announcements/${id}/edit`, { announcement: announcementToUpdate });
};

const generatePDF = () => {
    html2canvas(tableRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('announcement_report.pdf');
    });
  };

  return (
  <div>
   <div className="w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
   <h1 className='text-center mb-5 font-extrabold text-3xl underline'>Announcements</h1>
   <SearchBar onChange={handleSearchChange} /> 
   {/* {loading ? (
       <p>Loading...</p>
   ) : ( */}
       <Table hoverable className='shadow-md'>
           <Table.Head>
                   <Table.HeadCell>Announcement ID</Table.HeadCell>
                   <Table.HeadCell>Title</Table.HeadCell>
                   <Table.HeadCell>Content</Table.HeadCell>
                   <Table.HeadCell>Category ID</Table.HeadCell>
                   <Table.HeadCell>Attachment URL</Table.HeadCell>
                   <Table.HeadCell>Create At</Table.HeadCell>
                   <Table.HeadCell>Actions</Table.HeadCell>
           </Table.Head>
           <Table.Body className='divide-y'>
               {announcements.map(announcement => (
                //    <tr key={announcement._id}>
                <>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                       <Table.Cell>{announcement.Announcement_ID}</Table.Cell>
                       <Table.Cell>{announcement.Title}</Table.Cell>
                       <Table.Cell>{announcement.Content}</Table.Cell>
                       <Table.Cell>{announcement.Category_ID}</Table.Cell>
                       <Table.Cell>{announcement.Attachment_URL}</Table.Cell>
                       {/* <Table.Cell>{announcement.Create_At}</Table.Cell> */}
                       <Table.Cell>{new Date(announcement.Create_At).toLocaleDateString()}</Table.Cell>
                       <Table.Cell className='flex gap-4'>
                           <button onClick={() => deleteAnnouncement(announcement._id)} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</button>
                           <button onClick={() => handleUpdateAnnouncement(announcement._id)} className="text-teal-500 hover:underline">Update</button>
                       </Table.Cell>
                    </Table.Row>
                </>
                //    </tr>
               ))}
           </Table.Body>
       </Table>
   {/* )} */}
</div>
    <div className="text-center mt-5">
       <button onClick={generatePDF} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">Generate PDF</button>
    </div>
</div>
  )
}

export default AnnouncementForAdmin