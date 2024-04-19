import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

const BookServiceCreate = () => {
  const { serviceID } = useParams(); // Get the service ID from URL params
  const { currentUser } = useSelector((state) => state.user); // Get current user from Redux store
  const navigate = useNavigate(); // Navigation hook
  const [loading, setLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, serUploading] = useState(false);
  const [formData, setFormData] = useState({
    serviceID: serviceID || "",
    serviceName: "",
    residentName: "",
    residentPhone: "",
    residentEmail: "",
    bookingDate: "",
    bookingTime: "",
    bookingStatus: "Pending",
    imageUrls: [],
  });

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image Upload failed (2mb max per Image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 Images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`/api/serviceListing/read/${serviceID}`);
        const data = await response.json();
        if (data.success === false) {
          console.error("Failed to fetch service details:", data.message);
          return;
        }
        setFormData((prevFormData) => ({
          ...prevFormData,
          serviceID: data.serviceID,
          serviceName: data.serviceName,
        }));
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    fetchServiceDetails();
  }, [serviceID]); // Run the effect whenever serviceID changes





  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // Fetch service name when service ID is changed
    if (name === "serviceID") {
      try {
        const response = await fetch(`/api/serviceListing/${value}`);
        const data = await response.json();
        if (data.success) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            serviceName: data.serviceName,
          }));
        } else {
          console.error("Failed to fetch service name:", data.message);
        }
      } catch (error) {
        console.error("Error fetching service name:", error);
      }
    }
  };



  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit booking data to backend
      const response = await fetch("/api/serviceBooking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        // Booking successful, navigate to dashboard or booking confirmation page
        navigate("/dashboard?tab=services");
      } else {
        // Handle booking failure
        console.error("Booking failed:", data.message);
      }
    } catch (error) {
      console.error("Error booking service:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-semibold mb-4">Book Service</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="serviceID" className="block mb-1">
            Service ID
          </label>
          <input
            type="text"
            name="serviceID"
            value={formData.serviceID}
            onChange={handleChange}
            placeholder="Service ID"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="serviceName" className="block mb-1">
            Service Name
          </label>
          <input
            type="text"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
            placeholder="Service Name"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="residentName" className="block mb-1">
            Resident Name
          </label>
          <input
            type="text"
            name="residentName"
            value={formData.residentName}
            onChange={handleChange}
            placeholder="Resident Name"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="residentPhone" className="block mb-1">
            Resident Phone
          </label>
          <input
            type="text"
            name="residentPhone"
            value={formData.residentPhone}
            onChange={handleChange}
            placeholder="Resident Phone"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="residentEmail" className="block mb-1">
            Resident Email
          </label>
          <input
            type="email"
            name="residentEmail"
            value={formData.residentEmail}
            onChange={handleChange}
            placeholder="Resident Email"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="bookingDate" className="block mb-1">
            Booking Date
          </label>
          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            placeholder="Booking Date"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="bookingTime" className="block mb-1">
            Booking Time
          </label>
          <input
            type="time"
            name="bookingTime"
            value={formData.bookingTime}
            onChange={handleChange}
            placeholder="Booking Time"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {/* Add other form fields for booking details */}
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Book Service
        </button>
      </form>
    </div>
  );
};

export default BookServiceCreate;
