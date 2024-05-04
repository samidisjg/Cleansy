import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import "jspdf-autotable";

const AmenityList_05 = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [showAmenitiesError, setShowAmenitiesError] = useState(false);
    const [showAmenities, setShowAmenities] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [showAvailableOnly, setShowAvailableOnly] = useState(false);
    const [showUnavailableOnly, setShowUnavailableOnly] = useState(false);

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

    const filteredAmenities = showAmenities.filter((amenity) => {
        return (
            amenity.amenityTitle.toLowerCase().includes(searchInput.toLowerCase()) ||
            amenity.amenityDescription.toLowerCase().includes(searchInput.toLowerCase()) ||
            amenity.amenityLocation.toLowerCase().includes(searchInput.toLowerCase())
           ) && (
                (!showAvailableOnly || amenity.amenityStatus === 'Available') &&
                (!showUnavailableOnly || amenity.amenityStatus === 'Unavailable')
        );
    });

    const handleChange = (e) => {
        console.log("Search query:", e.target.value);
        setSearchInput(e.target.value);
    };

    const handleToggleAvailableOnly = () => {
        setShowAvailableOnly(!showAvailableOnly);
    };

    const handleToggleUnavailableOnly = () => {
        setShowUnavailableOnly(!showUnavailableOnly);
    };

    console.log("Table Amenities:", filteredAmenities);
    console.log("Filtered Amenities:", filteredAmenities);


    const handleAmenitiesDelete = async (_id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this amenity?");
        if (!confirmDelete) {
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
            setShowAmenities((prev) => prev.filter((amenity) => amenity._id !== _id));
        } catch (error) {
            console.log(error.message);
        }
    }
    
    const handleStatusChange = async (_id, newStatus) => {
        try {
            const res = await fetch(`/api/amenitiesListing/update/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amenityStatus: newStatus }),
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            setShowAmenities((prev) =>
                prev.map((amenity) =>
                    amenity._id === _id ? { ...amenity, amenityStatus: newStatus } : amenity
                )
            );
        } catch (error) {
            console.log(error.message);
        }
    };
    
    const handleDownloadPDF = () => {
        const amenityPDF = new jsPDF('l');
        const tableColumn = [
            "Amenity ID", 
            "Name", 
            "Description", 
            "Location",
            "Capacity", 
            "Availability",
            "Price",
            "Status"
        ];
        const tableRows = [];
    
        showAmenities.forEach(amenity => {
            const rowData = [
                amenity.amenityID,
                amenity.amenityTitle,
                amenity.amenityDescription,
                amenity.amenityLocation,
                amenity.amenityCapacity,
                amenity.amenityAvailableTimes,
                amenity.amenityPrice,
                amenity.amenityStatus
            ];
            tableRows.push(rowData);
        });
    
        const d = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = monthNames[d.getMonth()];

        const logo = "/cleansyBG.png"

        const imgHeight = 120;
        const imgWidth = 160;

        const centerX = (amenityPDF.internal.pageSize.getWidth() - imgWidth / 0.7);
        const centerY = (amenityPDF.internal.pageSize.getHeight() - imgHeight / 0.8);

        const addWaterMark = () => {
            amenityPDF.addImage(logo, 'PNG', centerX, centerY, imgWidth, imgHeight);
        }
    
        amenityPDF.autoTable({
            startY: 30,
            head: [tableColumn],
            body: tableRows,
            theme: 'grid',
            startY: 40, addPageContent: addWaterMark,
            didDrawCell: (data) => {
                amenityPDF.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
            }
        });
    
        amenityPDF.text(`Cleansy Facility Management Services (Pvt) Ltd \nAmenity List`, 14, 15);
        amenityPDF.save(`Amenity_List_${month}.pdf`);
    }
    

    

    return (
        <div className="w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 dark:text-white">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center dark:text-white">Amenity List</h1>    
            {currentUser.isBookingAdmin && (
                <>
                    <div className="flex gap-4 mb-4">
                        <TextInput
                            type="text"
                            placeholder="Search..."
                            value={searchInput}
                            onChange= {handleChange}
                        />
                        <Button onClick={handleToggleAvailableOnly} className={showAvailableOnly ? 'bg-green-500 text-white' : 'bg-gray-200'}>
                            Show Available Amenities
                        </Button>
                        <Button onClick={handleToggleUnavailableOnly} className={showUnavailableOnly ? 'bg-red-500 text-white' : 'bg-gray-200'}>
                            Show Unavailable Amenities
                        </Button>
                    </div>

                    {filteredAmenities.length > 0 ? (
                        <Table hoverable className="shadow-md dark:text-white">
                            <Table.Head>
                            <Table.HeadCell>Amenity ID</Table.HeadCell>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Description</Table.HeadCell>
                            <Table.HeadCell>Location</Table.HeadCell>
                            <Table.HeadCell>Capacity</Table.HeadCell>
                            <Table.HeadCell>Available Times</Table.HeadCell>
                            <Table.HeadCell>Price</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>Update Status</Table.HeadCell>
                            <Table.HeadCell onClick={() => handleAmenitiesDelete(amenity._id)}>Delete</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Update</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {filteredAmenities.map((amenity) => (
                            <Table.Body key={amenity._id} className="divide-y">
                                <Table.Row className={`bg-white dark:border-gray-700 dark:bg-gray-800 
                                    ${amenity.amenityStatus === 'Available' ? 'bg-green-100 dark:bg-green-800' : 'bg-red-100 dark:bg-red-800'}`}>
                                    <Table.Cell>{amenity.amenityID}</Table.Cell>
                                    <Table.Cell>{amenity.amenityTitle}</Table.Cell>
                                    <Table.Cell>{amenity.amenityDescription}</Table.Cell>
                                    <Table.Cell>{amenity.amenityLocation}</Table.Cell>
                                    <Table.Cell>{amenity.amenityCapacity}</Table.Cell>
                                    <Table.Cell>{amenity.amenityAvailableTimes}</Table.Cell>
                                    <Table.Cell>{amenity.amenityPrice}</Table.Cell>
                                    <Table.Cell className="py-2">
                                        <div className={`w-20 h-5 rounded-md text-center 
                                            ${amenity.amenityStatus === 'Available' ? 'bg-green-500 text-white' : 'bg-red-700 text-white'}`}>
                                            {amenity.amenityStatus}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="py-2">
                                        <select 
                                            value={amenity.amenityStatus} 
                                            onChange={(e) => handleStatusChange(amenity._id, e.target.value)}
                                            className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-black"
                                        >
                                            <option value="Unavailable">Unavailable</option>
                                            <option value="Available">Available</option>
                                        </select>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span onClick={() => handleAmenitiesDelete(amenity._id)} 
                                        className="font-medium text-red-500 hover:underline cursor-pointer">Delete</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            className="text-teal-500 hover:underline"
                                            to={`/edit-amenity/${amenity._id}`}>
                                                <span>Update</span>
                                            </Link>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}

                    </Table>
                
                    ) : (
                        <p className="text-gray-500 text-center">No matching amenities found.</p>
                    )}
                    <br />
                    <div className="flex gap-2 items-center">
                    <Button> 
                        <Link to="/amenity-create">Create Amenity</Link>
                    </Button>

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