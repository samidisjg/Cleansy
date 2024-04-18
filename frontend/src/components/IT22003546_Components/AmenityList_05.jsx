import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import "jspdf-autotable";

const AmenityList_05 = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [showAmenitiesError, setShowAmenitiesError] = useState(false);
    const [showAmenities, setShowAmenities] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        handleShowAmenities();
    }, [currentUser._id]);

    const handleShowAmenities = async () => {
        try {
            const res = await fetch("/api/amenitiesListing/get");
            const data = await res.json();
            if (data.success === false) {
                setShowAmenitiesError(true);
                return;
            }
            setShowAmenities(data);
        } catch (error) {
            setShowAmenitiesError(true);
        }
    }

    const handleAmenitiesDelete = async (_id) => {
        // Display a confirmation dialog
        const confirmDelete = window.confirm("Are you sure you want to delete this amenity?");
        if (!confirmDelete) {
            return; // If user cancels, exit the function
        }
        try {
            const res = await fetch(`/api/amenitiesListing/delete/${_id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            // Update the amenities list after successful deletion
            setShowAmenities((prev) => prev.filter((amenity) => amenity._id !== _id));
        } catch (error) {
            console.log(error.message);
        }
    }
    


    const handleDownloadPDF = () => {
        const payDoc = new jsPDF();
        const tableColumn = ["Amenity ID", "Name", "Description", "Location", "Availability"];
        const tableRows = [];

        showAmenities.forEach(amenity => {
            const rowData = [
                amenity.amenityID,
                amenity.amenityTitle,
                amenity.amenityDescription,
                amenity.amenityLocation,
                amenity.amenityCapacity,
                amenity.amenityAvailableTimes,
                amenity.amenityPrice
            ];
            tableRows.push(rowData);
        });

        payDoc.autoTable(tableColumn, tableRows, { startY: 20 });
        payDoc.text(`Amenity List`, 14, 15);
        payDoc.save(`Amenity_List.pdf`);
    }

    return (
        <div className="w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Amenity List</h1>    
            {currentUser.isBookingAdmin && (
                <>
                    <Table hoverable className="shadow-md">
                        <Table.Head>
                            <Table.HeadCell>Amenity ID</Table.HeadCell>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Description</Table.HeadCell>
                            <Table.HeadCell>Location</Table.HeadCell>
                            <Table.HeadCell>Capacity</Table.HeadCell>
                            <Table.HeadCell>Available Times</Table.HeadCell>
                            <Table.HeadCell>Price</Table.HeadCell>
                            <Table.HeadCell onClick={() => handleAmenitiesDelete(amenity._id)}>Delete</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {showAmenities.map((amenity) => (
                            <Table.Body key={amenity._id} className="divide-y">
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{amenity.amenityID}</Table.Cell>
                                    <Table.Cell>{amenity.amenityTitle}</Table.Cell>
                                    <Table.Cell>{amenity.amenityDescription}</Table.Cell>
                                    <Table.Cell>{amenity.amenityLocation}</Table.Cell>
                                    <Table.Cell>{amenity.amenityCapacity}</Table.Cell>
                                    <Table.Cell>{amenity.amenityAvailableTimes}</Table.Cell>
                                    <Table.Cell>{amenity.amenityPrice}</Table.Cell>
                                    <Table.Cell>
                                        <span onClick={() => handleAmenitiesDelete(amenity._id)} 
                                        className="font-medium text-red-500 hover:underline cursor-pointer">Delete</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            className="text-teal-500 hover:underline"
                                            to = {`/edit-amenity/${amenity._id}`}>
                                                <span>Edit</span>
                                            </Link>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                    <br />
                    <div className="flex gap-2 items-center">
                    <Button> 
                        <Link to="/amenity-create">Create Amenity</Link>
                    </Button>
                    {/* <Button> 
                        <Link to="/amenity-List:amenityID">Show Amenities</Link>
                    </Button> */}
                    <Button onClick={handleDownloadPDF}>Download PDF</Button>
                    </div>
                    
                    
                    

                    <p className="text-red-700 mt-5">
                        {showAmenitiesError ? "Error fetching amenity" : ""}
                    </p>

                    {showAmenities &&
                        showAmenities.length === 0 && 
                        showAmenities.map((amenity) => (
                            <Link
                                key={amenity._id}
                                className="text-slate-700 font-semiblod hover:underline truncate flex-1"
                                to={`/edit-amenity/${amenity._id}`}
                            ></Link>    
                           
                        ))}
                </>
            )}
        </div>
    )
}

export default AmenityList_05;