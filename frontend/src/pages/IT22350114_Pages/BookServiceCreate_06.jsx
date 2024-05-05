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
import {
  Button,
  Label,
  Select,
  TextInput,
  Textarea,
  FileInput,
  Alert,
} from "flowbite-react";

const BookServiceCreate = () => {
  const { serviceID } = useParams(); // Get the service ID from URL params
  const { currentUser } = useSelector((state) => state.user); // Get current user from Redux store
  const navigate = useNavigate(); // Navigation hook
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [timeslots, setTimeslots] = useState([]); // Array to store time slots
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Function to generate a unique booking ID
  const generateBookingId = () =>
    `SID-${Math.floor(10000 + Math.random() * 90000)}`;

  const [formData, setFormData] = useState({
    serviceID: serviceID || "",
    serviceName: "",
    serviceBookingID: generateBookingId(),
    residentName: "",
    residentPhone: "",
    residentEmail: "",
    residentNIC: "",
    bookingDate: "",
    bookingTime: "",
    bookingStatus: "Confirmed",
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
          residentEmail: currentUser.email,
        }));
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    setTimeslots(generateTimeSlots());
    fetchServiceDetails();
  }, [serviceID]); // Run the effect whenever serviceID changes

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imageUrls.length < 1)
        return setError("Please upload at least one image");
      if (formData.servicePrice < 0) {
        return setError("Price cannot be negative");
      }
      if (formData.serviceBookingID === currentUser.serviceBookingID)
        return setError("Booking ID already exists");

      const payload = {
        ...formData,
        userRef: currentUser._id,
        bookingStatus: "Pending",
      };

      console.log(formData); // Log form data to console

      setLoading(true);
      setError(false);

      const res = await fetch("/api/serviceBooking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate("/service-User:serviceID");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  function generateTimeSlots() {
    var timeSlots = [];
    var startTime = new Date();
    startTime.setHours(8, 0, 0, 0); // Set start time to 8:00 AM
    var endTime = new Date();
    endTime.setHours(18, 0, 0, 0); // Set end time to 6:00 PM

    var currentTime = new Date(startTime);

    while (currentTime < endTime) {
      var timeSlotStart = new Date(currentTime);

      timeSlots.push({
        start: timeSlotStart.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      currentTime.setTime(currentTime.getTime() + 30 * 60000); // Move to next 30-minute slot
    }

    return timeSlots;
  }
  const handleToggleTerms = () => {
    setAgreeTerms(!agreeTerms);
    if (!agreeTerms) {
      alert(`Terms and Conditions:
  
  1. Pricing:
     - The price displayed during booking is for the first 30 minutes of service.
     - Once the initial inspection is completed and the job requirements are assessed, the final price will be quoted accordingly.
  
  2. Service Duration:
     - The duration of service may vary depending on the complexity of the job and the service provider's assessment.
     - Additional charges may apply for extended service beyond the initial booking duration.

  3. Payment:
     - Payment is due upon completion of the service.
     - We accept various payment methods, including credit/debit cards, online transfers, and cash.
  
 
  By checking the box, you agree to abide by the above terms and conditions.`);
    }
  };
  
  

  console.log("timeslots", timeslots);

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-semibold mb-4">Book Service</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="serviceBookingID" className="block mb-1">
            Booking ID
          </label>
          <input
            type="text"
            name="serviceID"
            value={formData.serviceBookingID}
            onChange={handleChange}
            placeholder="Booking ID"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            disabled
          />
        </div>
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
            readOnly
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
            readOnly
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
          <label htmlFor="residentNIC" className="block mb-1">
            Resident NIC
          </label>
          <input
            type="text"
            name="residentNIC"
            value={formData.residentNIC}
            onChange={handleChange}
            placeholder="Resident NIC"
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
          <select
            name="bookingTime"
            value={formData.bookingTime}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            {timeslots.map((timeSlot, index) => (
              <option
                key={index}
                value={timeSlot.start}
              >{`${timeSlot.start}`}</option>
            ))}
          </select>
          {/* <input
            type="time"
            name="bookingTime"
            value={formData.bookingTime}
            onChange={handleChange}
            placeholder="Booking Time"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          /> */}
        </div>
        <div>
          <p className="font-semibold">
            Images:{" "}
            <span className="font-normal text-gray-600 ml-2">6 Photos Max</span>
          </p>
          <div className="flex gap-4">
            <FileInput
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              id="image"
              accept="image/*"
              multiple
              className="w-full"
            />
            <button
              onClick={handleImageSubmit}
              type="button"
              disabled={uploading}
              className="p-1 text-orange-700 border border-orange-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-blue-700">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={`image-${index}`}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt={`listing image ${index}`}
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <Button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  gradientDuoTone="pinkToOrange"
                >
                  Delete
                </Button>
              </div>
            ))}
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={handleToggleTerms}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the terms and conditions
            </span>
          </label>
        </div>
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          className={`uppercase ${
            !agreeTerms && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!agreeTerms}
        >
          {loading ? "Service Booking..." : "Service Booking"}
        </Button>

        {error && (
          <Alert className="mt-7 py-3 bg-gradient-to-r from-blue-500 via-black to-blue-900 shadow-lg text-center text-white text-lg font-semibold tracking-wide transform -translate-y-2 hover:translate-y-0 transition-transform">
            {error}
          </Alert>
        )}

        {/* Add other form fields for booking details 
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Book Service
        </button> */}
      </form>
    </div>
  );
};

export default BookServiceCreate;
