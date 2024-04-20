import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

const AnnouncementForAdmin = () => {
   const [announcements, setAnnouncements] = useState([]);
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


  const handleUpdateAnnouncement = (id) => {
   // Implement update logic here
};

  return (
   <div className="w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
   <h1 className='text-center mb-5 font-extrabold text-3xl underline'>Announcements</h1>
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
  )
}

export default AnnouncementForAdmin