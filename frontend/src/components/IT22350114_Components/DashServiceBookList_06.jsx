import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DashServiceBookList_06 = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showBookingError, setShowBookingError] = useState(false);
  const [showBooking, setShowBooking] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showConfirmOnly, setshowConfirmOnly] = useState(false);
  const [showPendingOnly, setshowPendingOnly] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    handleShowBooking();
  }, []);

  const handleShowBooking = async () => {
    try {
      const res = await fetch("/api/serviceBooking/getAll");
      const data = await res.json();
      if (data.success === false) {
        setShowBookingError(true);
        return;
      }
      setShowBooking(data);
    } catch (error) {
      setShowBookingError(true);
    }
  };
  const filteredBookings = showBooking.filter((booking) => {
    const bookingDate = new Date(booking.bookingDate);
    return (
      ((booking.serviceName &&
        booking.serviceName
          .toLowerCase()
          .includes(searchInput.toLowerCase())) ||
        booking.residentName
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        booking.residentEmail
          .toLowerCase()
          .includes(searchInput.toLowerCase())) &&
      (!startDate ||
        !endDate ||
        (bookingDate >= new Date(startDate) &&
          bookingDate <= new Date(endDate))) &&
      (!showConfirmOnly || booking.bookingStatus === "Confirmed") &&
      (!showPendingOnly || booking.bookingStatus === "Pending")
    );
  });
  /*  
    const filteredBookings = showBooking.filter((booking) => {
        const bookingDate = new Date(booking.bookingDate);
        return (
            (
              booking.ServiceName?.toLowerCase().includes(searchInput.toLowerCase()) ||
              booking.residentName.toLowerCase().includes(searchInput.toLowerCase()) ||
                booking.residentEmail.toLowerCase().includes(searchInput.toLowerCase())
            ) &&
            (
                !startDate || !endDate || (bookingDate >= new Date(startDate) && bookingDate <= new Date(endDate))
            ) &&
            (
                (!showConfirmOnly || booking.bookingStatus === 'Confirmed') &&
                (!showPendingOnly || booking.bookingStatus === 'Pending')
            )    
        );
    });

    */

  const handleChange = (e) => {
    console.log("Search query:", e.target.value);
    setSearchInput(e.target.value);
  };

  const handleToggleConfirmOnly = () => {
    setshowConfirmOnly(!showConfirmOnly);
  };

  const handleTogglePendingOnly = () => {
    setshowPendingOnly(!showPendingOnly);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  console.log("Table bookings:", filteredBookings);
  console.log("Filtered bookings:", filteredBookings);

  const handleBookingDelete = async (_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      const res = await fetch(`/api/serviceBooking/delete/${_id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setShowBooking((prev) => prev.filter((booking) => booking._id !== _id));
    } catch (error) {
      console.log(error.message);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDownloadPDF = () => {
    const payDoc = new jsPDF("l");
    const tableColumn = [
      "Booking ID",
      "Service ID",
      "Service Name",
      "Booking Date",
      "Booking Time",
      "Resident Name",
      "Resident Number",
      "Resident Email",
      "Resident NIC",
      "Status",
    ];
    const tableRows = [];

    showBooking.forEach((booking) => {
      const rowData = [
        booking.serviceBookingID,
        booking.serviceID,
        booking.serviceName,
        booking.bookingDate,
        booking.bookingTime,
        booking.residentName,
        booking.residentPhone,
        booking.residentEmail,
        booking.residentNIC,
        booking.bookingStatus,
      ];
      tableRows.push(rowData);
    });

    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();

    const logo = "/cleansyBG.png";

    const imgWidth = 180;
    const imgHeight = 120;

    const centerX = payDoc.internal.pageSize.getWidth() - imgWidth / 0.75;
    const centerY = payDoc.internal.pageSize.getHeight() - imgHeight / 0.8;

    payDoc.text(
      "Cleansy Sustainable Comunity Management System Pvt Ltd",
      14,
      20
    );

    const addWatermark = () => {
      payDoc.addImage(logo, "JPEG", centerX, centerY, imgWidth, imgHeight);
    };

    payDoc.autoTable(tableColumn, tableRows, {
      startY: 25,
      addPageContent: addWatermark,
      headStyles: {
        fillColor: [235,68,38], // Dark blue background for the header row
        textColor: [246,147,53], // Dark orange color for the text (RGB)
        halign: "center", // Center align text
        fontStyle: "bold", // Bold font style for header text
      },
    });

    payDoc.setFont("helvetica", "bold");
    payDoc.text(`Service Booking List`, 10, 12);
    payDoc.save(`Service_Booking_List.pdf`);
  };

  const handleStatusChange = async (_id, newStatus) => {
    try {
      const res = await fetch(`/api/serviceBooking/update/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingStatus: newStatus }),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setShowBooking((prev) =>
        prev.map((booking) =>
          booking._id === _id
            ? { ...booking, bookingStatus: newStatus }
            : booking
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center dark:text-white">
        Service Booking List
      </h1>
      {currentUser.isFacilityServiceAdmin ? (
        <>
          <div className="flex gap-4 mb-4">
            <TextInput
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={handleChange}
            />
          </div>
          {filteredBookings.length > 0 ? (
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Booking ID</Table.HeadCell>
                <Table.HeadCell>Service ID</Table.HeadCell>
                <Table.HeadCell>Service Name</Table.HeadCell>
                <Table.HeadCell>Resident Name</Table.HeadCell>
                <Table.HeadCell>Resident Phone</Table.HeadCell>
                <Table.HeadCell>Resident Email</Table.HeadCell>
                <Table.HeadCell>Resident NIC</Table.HeadCell>
                <Table.HeadCell>Booking Date</Table.HeadCell>
                <Table.HeadCell>Booking Time</Table.HeadCell>
                <Table.HeadCell>Booking Status</Table.HeadCell>
                <Table.HeadCell>Update Status</Table.HeadCell>
                <Table.HeadCell>Update</Table.HeadCell>
                <Table.HeadCell
                  onClick={() => handleServiceListingDelete(booking._id)}
                >
                  Delete
                </Table.HeadCell>
              </Table.Head>
              {filteredBookings.map((booking) => (
                <Table.Body key={booking._id} className="divide-y">
                  <Table.Row
                    className={`bg-white dark:border-gray-700 dark:bg-gray-800 ${
                      booking.bookingStatus === "Confirmed"
                        ? "text-green-500"
                        : booking.bookingStatus === "Pending"
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    <Table.Cell>{booking.serviceBookingID}</Table.Cell>
                    <Table.Cell>{booking.serviceID}</Table.Cell>
                    <Table.Cell>{booking.serviceName}</Table.Cell>
                    <Table.Cell>{booking.residentName}</Table.Cell>
                    <Table.Cell>{booking.residentPhone}</Table.Cell>
                    <Table.Cell>{booking.residentEmail}</Table.Cell>
                    <Table.Cell>{booking.residentNIC}</Table.Cell>
                    <Table.Cell style={{ whiteSpace: "nowrap" }}>
                      {formatDate(booking.bookingDate)}
                    </Table.Cell>
                    <Table.Cell>{booking.bookingTime}</Table.Cell>
                    <Table.Cell className="py-2">
                      <div
                        className={`w-20 h-5 rounded-md text-center ${
                          booking.bookingStatus === "Confirmed"
                            ? "bg-green-500 text-white"
                            : booking.bookingStatus === "Pending"
                            ? "bg-red-700 text-white"
                            : ""
                        }`}
                      >
                        {booking.bookingStatus}
                      </div>
                    </Table.Cell>

                    <Table.Cell className="py-2">
                      <select
                        value={booking.bookingStatus}
                        onChange={(e) =>
                          handleStatusChange(booking._id, e.target.value)
                        }
                        className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                      </select>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="text-teal-500 hover:underline"
                        to={`/update-sbooking/${booking._id}`}
                      >
                        <span>Update</span>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => handleBookingDelete(booking._id)}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    {/* <Table.Cell>
                                        <span onClick={() => handleBookingDelete(booking._id)} 
                                        className="font-medium text-red-500 hover:underline cursor-pointer">Delete</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            className="text-teal-500 hover:underline"
                                            to = {`/update-sbooking/${booking._id}`}>
                                                <span>Update</span>
                                            </Link>
                                    </Table.Cell> */}
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          ) : (
            <p className="text-gray-500 text-center">
              No matching services found.
            </p>
          )}
          <br />
          <Button onClick={handleDownloadPDF}>Download report</Button>

          <p className="text-red-700 mt-5">
            {showBookingError ? "Error fetching services" : ""}
          </p>

          {showBooking &&
            showBooking.length === 0 &&
            showBooking.map((booking) => (
              <Link
                key={booking._id}
                className="text-slate-700 font-semiblod hover:underline truncate flex-1"
                to={`/update-sbooking/${booking._id}`}
              ></Link>
            ))}
        </>
      ) : (
        <>
          {/* Resident view */}
          <div className="flex gap-4 mb-4">
            <TextInput
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={handleChange}
            />
            <Button
              onClick={handleToggleConfirmOnly}
              className={
                showConfirmOnly ? "bg-green-500 text-white" : "bg-gray-200"
              }
            >
              Confirmed Bookings
            </Button>
            <Button
              onClick={handleTogglePendingOnly}
              className={
                showPendingOnly ? "bg-red-500 text-white" : "bg-gray-200"
              }
            >
              Pending Bookings
            </Button>

            <label className="block text-sm font-semibold text-gray-700 dark:text-white pt-3">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="appearance-none block w-56 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            <label className="block text-sm font-semibold text-gray-700 dark:text-white pt-3">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="appearance-none block w-56 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {filteredBookings.length > 0 ? (
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Booking ID</Table.HeadCell>
                <Table.HeadCell>Service ID</Table.HeadCell>
                <Table.HeadCell>Service Name</Table.HeadCell>
                <Table.HeadCell>Resident Name</Table.HeadCell>
                <Table.HeadCell>Resident Phone</Table.HeadCell>
                <Table.HeadCell>Resident Email</Table.HeadCell>
                <Table.HeadCell>Booking Date</Table.HeadCell>
                <Table.HeadCell>Booking Time</Table.HeadCell>
                <Table.HeadCell>Booking Status</Table.HeadCell>
                <Table.HeadCell
                  onClick={() => handleServiceListingDelete(booking._id)}
                >
                  Delete
                </Table.HeadCell>
                {/* handleServicesDelete */}
                <Table.HeadCell>
                  <span>Upadte</span>
                </Table.HeadCell>
              </Table.Head>
              {filteredBookings
                .filter(
                  (booking) =>
                    booking.residentEmail === currentUser.residentEmail
                )
                .map((booking) => (
                  <Table.Body key={booking._id} className="divide-y">
                    <Table.Row
                      className={`bg-white dark:border-gray-700 dark:bg-gray-800 ${
                        booking.bookingStatus === "Confirmed"
                          ? "text-green-600"
                          : booking.bookingStatus === "Pending"
                          ? "text-red-600"
                          : ""
                      }`}
                    >
                      <Table.Cell>{booking.serviceBookingID}</Table.Cell>
                      <Table.Cell>{booking.serviceID}</Table.Cell>
                      <Table.Cell>{booking.serviceName}</Table.Cell>
                      <Table.Cell>{booking.residentName}</Table.Cell>
                      <Table.Cell>{booking.residentPhone}</Table.Cell>
                      <Table.Cell>{booking.residentEmail}</Table.Cell>
                      <Table.Cell>{booking.bookingDate}</Table.Cell>
                      <Table.Cell>{booking.bookingTime}</Table.Cell>
                      <Table.Cell>{booking.bookingTime}</Table.Cell>
                      <Table.Cell className="py-2">
                        <div
                          className={`w-20 h-5 rounded-md text-center ${
                            booking.bookingStatus === "Confirmed"
                              ? "bg-green-500 text-white"
                              : booking.bookingStatus === "Pending"
                              ? "bg-red-700 text-white"
                              : ""
                          }`}
                        >
                          {booking.bookingStatus}
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => handleBookingDelete(booking._id)}
                          className="font-medium text-red-500 hover:underline cursor-pointer"
                        >
                          Delete
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          className="text-teal-500 hover:underline"
                          to={`/update-sbooking/${booking._id}`}
                        >
                          <span>Update</span>
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          ) : (
            <p className="text-gray-500 text-center">
              No matching services found.
            </p>
          )}
          <p className="text-red-700 mt-5">
            {showBookingError ? "Error fetching bookings" : ""}
          </p>
          {showBooking.length === 0 && <p>No services found</p>}
        </>
      )}
    </div>
  );
};

export default DashServiceBookList_06;
