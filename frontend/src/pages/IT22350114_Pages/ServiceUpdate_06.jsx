import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ServiceUpdate_06 = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    serviceID: "",
    serviceName: "",
    serviceDescription: "",
    servicePrice: "",
    serviceType: "",
    serviceAvailability: true,
    servicePhone: "",
    serviceEmail: "",
    serviceRequirements: [],
    imageUrls: [],
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
      setLoading(true);
      // Your logic for updating the service
      console.log("Form data:", formData);
      setLoading(false);
      navigate("/dashboard"); // Redirect to dashboard after successful update
    } catch (error) {
      setLoading(false);
      setError("Error updating service. Please try again."); // Set error message
    }
  };

  // Function to handle image upload
  const handleImageSubmit = async () => {
    try {
      setUploading(true);
      // Your logic for handling image upload
      console.log("Image files:", files);
      setUploading(false);
    } catch (error) {
      setImageUploadError("Error uploading images. Please try again."); // Set image upload error message
      setUploading(false);
    }
  };

  // Function to handle removing an image
  const handleRemoveImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1 className="text-center mt-7 font-extrabold text-3xl underline">
        Update Service
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Add your form fields here */}
        {/* Example: */}
        <input
          type="text"
          name="serviceName"
          value={formData.serviceName}
          onChange={handleChange}
          placeholder="Service Name"
          required
        />
        {/* Add other form fields */}
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Service"}
        </button>
      </form>
      {/* Add logic for displaying uploaded images and error messages */}
    </div>
  );
};

export default ServiceUpdate_06;
