import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BookAmenity = () => {
  const { amenityId } = useParams();
  const { userId } = useParams();
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    time: "",
    duration: "",
    amenityId: "",
    amenityTitle: "",
    // Add more booking details if needed
  });

  useEffect(() => {
    const fetchAmenityDetails = async () => {
      try {
        const res = await fetch(`/api/amenitiesListing/get/${amenityId}`);
        const data = await res.json();
        if (data.success === false) {
          console.error("Error fetching amenity details");
          return;
        }
        // Update the booking details state with the fetched amenity details
        setBookingDetails((prevDetails) => ({
          ...prevDetails,
          amenityId: data.amenityID,
          amenityTitle: data.amenityTitle,
          userId: data.userId,
        }));
      } catch (error) {
        console.error("Error fetching amenity details", error);
      }
    };

    fetchAmenityDetails();
  }, [amenityId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send booking details to server
    console.log("Booking details:", bookingDetails);
    // Redirect to confirmation page or perform any other action after booking
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Book Amenity</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="amenityId" className="block text-gray-700">Amenity ID:</label>
          <input
            type="text"
            id="amenityId"
            name="amenityId"
            value={bookingDetails.amenityId}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amenityTitle" className="block text-gray-700">Amenity Title:</label>
          <input
            type="text"
            id="amenityTitle"
            name="amenityTitle"
            value={bookingDetails.amenityTitle}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Resident Name:</label>
            <input
              type="text"
              id="residentName"
              name="residentName"
              value={bookingDetails.userId}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
              onChange={handleInputChange}
            />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700">Date:</label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700">Time:</label>
          <input
            type="time"
            id="eventTime"
            name="eventTime"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
            onChange={handleInputChange}
          />   
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookAmenity;
