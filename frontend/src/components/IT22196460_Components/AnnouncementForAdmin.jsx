//frontend\src\components\IT22196460_Components\AnnouncementForAdmin.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFAnnouncementForm from './PDFAnnouncementForm';

const AnnouncementForAdmin = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
 

    useEffect(() => {
        fetchAnnouncements();
        
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const response = await axios.get(`/api/announcements/read`);
            setAnnouncements(response.data);
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
    };

    const deleteAnnouncement = async (id) => {
        try {
            await axios.delete(`/api/announcements/delete/${id}`);
            setAnnouncements(announcements.filter(announcement => announcement._id !== id));
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    const filteredAnnouncements = announcements.filter((announcement) =>
        announcement.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const countStaffAnnouncements = () => {
        return announcements.filter(announcement => announcement.Category_ID === 'staff').length;
    };

    const countCustomerAnnouncements = () => {
        return announcements.filter(announcement => announcement.Category_ID === 'customer').length;
    };

    const sendPDFByEmail = async () => {
        setDownloadingPDF(true);
        try {
            const response = await axios.post('/api/send-pdf', {
                email: 'uvinduudakara001@gmail.com', 
                pdfData: <PDFAnnouncementForm announcements={announcements} />
            });
            console.log('PDF sent successfully');
        } catch (error) {
            console.error('Error sending PDF:', error);
        } finally {
            setDownloadingPDF(false);
        }
    };

    return (
        <div className="w-full">
            <h1 className='text-center mb-5 font-extrabold text-3xl underline'>Announcements</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
                />
                <Link to="/create-announcement" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
                    Create Announcement
                </Link>

            </div>
            <div className="mb-4 flex justify-center gap-7">
            <p className="text-center"><button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Total Staff Announcements: {countStaffAnnouncements()}</span></button></p>
            <p className="text-center"><button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Total Customer Announcements: {countCustomerAnnouncements()}</span></button></p>
            <p className="text-center"><button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Total Announcements: {announcements.length}</span></button></p>
            </div>
            
            <Table hoverable className='shadow-md p-4'>
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
                    {filteredAnnouncements.map(announcement => (
                        <Table.Row key={announcement._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <Table.Cell>{announcement.Announcement_ID}</Table.Cell>
                            <Table.Cell>{announcement.Title}</Table.Cell>
                            <Table.Cell>{announcement.Content}</Table.Cell>
                            <Table.Cell>{announcement.Category_ID}</Table.Cell>
                            <Table.Cell>{announcement.Attachment_URL}</Table.Cell>
                            <Table.Cell>{new Date(announcement.Create_At).toLocaleDateString()}</Table.Cell>
                            <Table.Cell className='flex gap-4'>
                                <button onClick={() => deleteAnnouncement(announcement._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                                <Link to={`/update-announcement/${announcement._id}`}>
                                    <button  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <PDFDownloadLink
                document={<PDFAnnouncementForm announcements={announcements} />}
                fileName="announcement_list.pdf"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={sendPDFByEmail}
            >
                {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
            </PDFDownloadLink>
        </div>
    );
};

export default AnnouncementForAdmin;
