import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import {
  Button,
  Label,
  TextInput,
  Textarea,
  Alert,
} from "flowbite-react";

const BookAmenity = () => {
  const { amenityId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Function to generate a unique booking ID
  const generateBookingId = () => `BID-${Math.floor(10000 + Math.random() * 90000)}`;

  // State for form data
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    duration: "",
    amenityId: "",
    amenityTitle: "",
    residentName: "",
    residentEmail: "",
    residentContact: "",
    specialRequests: "",
    bookingID: generateBookingId(), // Initial booking ID generated
  });

  // Effect to fetch amenity details
  useEffect(() => {
    const fetchAmenityDetails = async () => {
      try {
        const res = await fetch(`/api/amenitiesListing/get/${amenityId}`);
        const data = await res.json();
        if (data.success === false) {
          console.error("Error fetching amenity details");
          return;
        }
        // Update the form data state with the fetched amenity details
        setFormData((prevData) => ({
          ...prevData,
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

  // Function to handle form input changes
  const handleChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
        boolean = true;
    }
    if (e.target.value === "false") {
        boolean = false;
    }
    setFormData({
        ...formData,
        [e.target.name]: boolean !== null ? boolean : e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.bookingID === currentUser.bookingID) return setError('BookingID already exists');
      setLoading(true);
      setError(false);

      const response = await fetch('/api/amenitiesBooking/create', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              ...formData,
              userRef: currentUser._id,
          })
      });
      const data = await response.json();
      setLoading(false);
      if (data.success === false) {
          return setError(data.message);
      }
      // Assuming `navigate` is defined elsewhere
      navigate('/dashboard?tab=amenity');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Book Amenity</h1>
      <div className="flex p-3 w-[40%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full justify-center">
          <div>
            <Label htmlFor="bookingId">Booking ID:</Label>
            <TextInput
              type="text"
              id="bookingId"
              name="bookingID"
              value={formData.bookingID}
              readOnly 
            />
          </div>

          <div>
            <Label htmlFor="amenityID">Amenity ID:</Label>
            <TextInput
              type="text"
              id="amenityID"
              name="amenityNum"
              value={formData.amenityId}
              readOnly
            />
          </div>

          <div>
            <Label htmlFor="amenityTitle" >Amenity Title:</Label>
            <TextInput
              type="text"
              id="amenityTitle"
              name="amenityTitle"
              value={formData.amenityTitle}
              readOnly
              
            />
          </div>

          <div>
              <Label htmlFor="name" >Resident Name:</Label>
              <TextInput
                type="text"
                id="residentName"
                name="residentName"
                value={formData.userId}
                required
                onChange={handleChange}
              />
          </div>

          <div>
            <Label htmlFor="email" >Resident Email:</Label>
            <TextInput
              type="email"
              id="residentEmail"
              name="residentEmail"
              required
              onChange={handleChange}  
            />
          </div>

          <div>
            <Label htmlFor="contact" >Resident Contact:</Label>
            <TextInput
              type="tel"
              id="residentContact"
              name="residentContact"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="date" >Date:</Label>
            <TextInput
              type="date"
              id="eventDate"
              name="bookingDate"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="time" >Time:</Label>
            <TextInput
              type="time"
              id="eventTime"
              name="bookingTime"
              required
              onChange={handleChange}
            />   
          </div>

          <div>
            <Label htmlFor="duration" >Duration:</Label>
            <TextInput
              type="number"
              id="duration"
              name="duration"
              required
              onChange={handleChange}
            />  
          </div>

          <div>
            <Label htmlFor="specialRequests" >Special Requests:</Label>
            <Textarea
              id="specialRequests"
              name="specialRequests"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-4 flex-1">
            <Button 
            type="submit"
            gradientDuoTone="purpleToBlue"
            className="uppercase"
            >{loading ? "Booking Amenity" : "Book Amenity"}</Button> 
              {error && <Alert className='mt-7 py-3 bg-gradient-to-r from-red-100 via-red-300 to-red-400 shadow-shadowOne text-center text-red-600 text-base tracking-wide animate-bounce'>{error}</Alert>}
          </div>  
        </form>
      </div>  
    </div>
  );
};

export default BookAmenity;
