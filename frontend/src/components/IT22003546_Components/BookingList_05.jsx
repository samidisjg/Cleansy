import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import "jspdf-autotable";

const BookingList_05 = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [showBookingError, setShowBookingError] = useState(false);
    const [showBooking, setShowBooking] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        handleShowBooking();
    }, []);
    
    const handleShowBooking = async () => {
        try {
            const res = await fetch("/api/amenitiesBooking/getAll");
            const data = await res.json();
            if (data.success === false) {
                setShowBookingError(true);
                return;
            }
            setShowBooking(data);
        } catch (error) {
            setShowBookingError(true);
        }
    }

    const handleBookingDelete = async (_id) => {
        // Display a confirmation dialog
        const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
        if (!confirmDelete) {
            return; // If user cancels, exit the function
        }
        try {
            const res = await fetch(`/api/amenitiesBooking/delete/${_id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            // Update the booking list after successful deletion
            setShowBooking((prev) => prev.filter((booking) => booking._id !== _id));
        } catch (error) {
            console.log(error.message);
        }
    }
    


    const handleDownloadPDF = () => {
        const payDoc = new jsPDF('l');
        const tableColumn = ["Booking ID", "Amenity Title", "Resident Name", "Resident Email", "Resident Contact", "Date", "Time", "Duration", "Total Amount", "Status"];
        const tableRows = [];

        showBooking.forEach(booking => {
            const rowData = [
                booking.bookingID,
                booking.amenityTitle,
                booking.residentName,
                booking.residentEmail,
                booking.residentContact,
                booking.bookingDate,
                booking.bookingTime,
                booking.duration,
                booking.bookingPrice,
                booking.bookingStatus,
            ];
            tableRows.push(rowData);
        });

        payDoc.autoTable(tableColumn, tableRows, { startY: 20 });
        payDoc.text(`Booking List`, 10, 12);
        payDoc.save(`Booking_List.pdf`);
    }

    const handleStatusChange = async (_id, newStatus) => {
        try {
            const res = await fetch(`/api/amenitiesBooking/update/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookingStatus: newStatus }),
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            // Update the booking list after successful status update
            setShowBooking((prev) =>
                prev.map((booking) =>
                    booking._id === _id ? { ...booking, bookingStatus: newStatus } : booking
                )
            );
        } catch (error) {
            console.log(error.message);
        }
    };
    

    return (
        <div className="w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Booking List</h1>    
            {currentUser.isBookingAdmin ? (
                <>
                    <Table hoverable className="shadow-md">
                        <Table.Head>
                            <Table.HeadCell>Booking ID</Table.HeadCell>
                            <Table.HeadCell>Amenity Title</Table.HeadCell>
                            <Table.HeadCell>Resident Name</Table.HeadCell>
                            <Table.HeadCell>Resident Email</Table.HeadCell>
                            <Table.HeadCell>Resident Contact</Table.HeadCell>
                            <Table.HeadCell>Date</Table.HeadCell>
                            <Table.HeadCell>Time</Table.HeadCell>
                            <Table.HeadCell>Duration</Table.HeadCell>
                            <Table.HeadCell>Total Amount</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>Update Status</Table.HeadCell>
                        </Table.Head>
                        {showBooking.map((booking) => (
                            <Table.Body key={booking._id} className="divide-y">
                                <Table.Row className={`bg-white dark:border-gray-700 dark:bg-gray-800 ${booking.bookingStatus === 'Confirmed' ? 'text-green-600' : booking.bookingStatus === 'Pending' ? 'text-red-600' : ''}`}>
                                    <Table.Cell>{booking.bookingID}</Table.Cell>
                                    <Table.Cell>{booking.amenityTitle}</Table.Cell>
                                    <Table.Cell>{booking.residentName}</Table.Cell>
                                    <Table.Cell>{booking.residentEmail}</Table.Cell>
                                    <Table.Cell>{booking.residentContact}</Table.Cell>
                                    <Table.Cell>{booking.bookingDate}</Table.Cell>
                                    <Table.Cell>{booking.bookingTime}</Table.Cell>
                                    <Table.Cell>{booking.duration}</Table.Cell>
                                    <Table.Cell>{booking.bookingPrice}</Table.Cell>
                                    <Table.Cell className="py-2">
                                        <div className={`w-20 h-5 rounded-md text-center ${booking.bookingStatus === 'Confirmed' ? 'bg-green-500 text-white' : booking.bookingStatus === 'Pending' ? 'bg-red-700 text-white' : ''}`}>
                                            {booking.bookingStatus}
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell className="py-2">
                                        <select 
                                            value={booking.bookingStatus} 
                                            onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                            className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                        </select>
                                    </Table.Cell>
                                    {/* <Table.Cell>
                                        <span onClick={() => handleBookingDelete(booking._id)} 
                                        className="font-medium text-red-500 hover:underline cursor-pointer">Delete</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            className="text-teal-500 hover:underline"
                                            to = {`/update-booking/${booking._id}`}>
                                                <span>Update</span>
                                            </Link>
                                    </Table.Cell> */}
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                    <br />
                    <Button onClick={handleDownloadPDF}>Download PDF</Button>

                    <p className="text-red-700 mt-5">
                        {showBookingError ? "Error fetching amenity" : ""}
                    </p>

                    {showBooking &&
                        showBooking.length === 0 && 
                        showBooking.map((booking) => (
                            <Link
                                key={booking._id}
                                className="text-slate-700 font-semiblod hover:underline truncate flex-1"
                                to={`/update-booking/${booking._id}`}
                            ></Link>    
                           
                        ))}
                </>
            ) : (
                <>
                {/* Resident view */}
                <Table hoverable className="shadow-md">
                    <Table.Head>
                            <Table.HeadCell>Booking ID</Table.HeadCell>
                            <Table.HeadCell>Amenity Title</Table.HeadCell>
                            <Table.HeadCell>Resident Name</Table.HeadCell>
                            <Table.HeadCell>Resident Email</Table.HeadCell>
                            <Table.HeadCell>Resident Contact</Table.HeadCell>
                            <Table.HeadCell>Date</Table.HeadCell>
                            <Table.HeadCell>Time</Table.HeadCell>
                            <Table.HeadCell>Duration</Table.HeadCell>
                            <Table.HeadCell>Total Amount</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell onClick={() => handleAmenitiesDelete(booking._id)}>Delete</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Upadte</span>
                            </Table.HeadCell>
                        </Table.Head>
                    {showBooking
                        .filter(booking => booking.residentUsername === currentUser.username)
                        .map((booking) => (
                            <Table.Body key={booking._id} className="divide-y">
                                <Table.Row className={`bg-white dark:border-gray-700 dark:bg-gray-800 ${booking.bookingStatus === 'Confirmed' ? 'text-green-600' : booking.bookingStatus === 'Pending' ? 'text-red-600' : ''}`}>
                                <Table.Cell>{booking.bookingID}</Table.Cell>
                                    <Table.Cell>{booking.amenityTitle}</Table.Cell>
                                    <Table.Cell>{booking.residentName}</Table.Cell>
                                    <Table.Cell>{booking.residentEmail}</Table.Cell>
                                    <Table.Cell>{booking.residentContact}</Table.Cell>
                                    <Table.Cell>{booking.bookingDate}</Table.Cell>
                                    <Table.Cell>{booking.bookingTime}</Table.Cell>
                                    <Table.Cell>{booking.duration}</Table.Cell>
                                    <Table.Cell>{booking.bookingPrice}</Table.Cell>
                                    <Table.Cell className="py-2">
                                        <div className={`w-20 h-5 rounded-md text-center ${booking.bookingStatus === 'Confirmed' ? 'bg-green-500 text-white' : booking.bookingStatus === 'Pending' ? 'bg-red-700 text-white' : ''}`}>
                                            {booking.bookingStatus}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span onClick={() => handleBookingDelete(booking._id)} 
                                        className="font-medium text-red-500 hover:underline cursor-pointer">Delete</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            className="text-teal-500 hover:underline"
                                            to = {`/update-booking/${booking._id}`}>
                                                <span>Update</span>
                                            </Link>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                </Table>
                <p className="text-red-700 mt-5">
                    {showBookingError ? "Error fetching bookings" : ""}
                </p>
                {showBooking.length === 0 && (
                    <p>No bookings found</p>
                )}
            </>
            )
            
            }
            
        </div>
    );
}

export default BookingList_05;