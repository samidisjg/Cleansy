import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const BookingConfirmationPage_05 = ({ formData }) => {
    const [amenityPrice, setAmenityPrice] = useState(null);
    const [totalPayment, setTotalPayment] = useState(null);
    const params = useParams();
  
    // Simulate fetching amenity price based on amenity ID
    useEffect(() => {
        const fetchAmenityPrice = async () => {
          try {
            
            const res = await fetch(`/api/amenitiesListing/get/${AmenityID}`);
            const data = await res.json();
            if (data.success) {
              setAmenityPrice(data.amenityPrice);
            } else {
              console.error('Error fetching amenity price');
            }
          } catch (error) {
            console.error('Error fetching amenity price:', error);
          }
        };
  
      fetchAmenityPrice();
    }, [formData.amenityId]);
  
    // Calculate total payment based on duration and amenity price
    useEffect(() => {
      if (formData.duration && amenityPrice) {
        const duration = parseFloat(formData.duration);
        const total = duration * amenityPrice;
        setTotalPayment(total.toFixed(2));
      }
    }, [formData.duration, amenityPrice]);
  
    return (
      <div className="min-h-screen mt-20">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Booking Details</h1>
        <div className="flex p-3 w-[40%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
          <div className="flex flex-col gap-4 w-full justify-center">
            <div>
              <label>Booking ID:</label>
              <span>{formData.bookingID}</span>
            </div>
            <div>
              <label>Amenity ID:</label>
              <span>{formData.amenityId}</span>
            </div>
            <div>
              <label>Amenity Title:</label>
              <span>{formData.amenityTitle}</span>
            </div>
            <div>
              <label>Duration:</label>
              <span>{formData.duration} hours</span>
            </div>
            <div>
              <label>Amenity Price:</label>
              <span>${amenityPrice}</span>
            </div>
            <div>
              <label>Total Payment:</label>
              <span>${totalPayment}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default BookingConfirmationPage_05;
