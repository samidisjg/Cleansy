import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import mongoose from 'mongoose';


const CreateServiceListing = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    serviceID: "",
    serviceName: "",
    serviceDescription: "",
    servicePrice: "",
    serviceType: "",
    serviceImageUrls: [],
    serviceAvailability: true,
    serviceContactInfo: {
      phone: "",
      email: "",
      address: "",
    },
    serviceRequirements: [],
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);

  const handleChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: boolean !== null ? boolean : e.target.value,
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.serviceID === currentUser.serviceID) return setError('serviceID already exists');
      setLoading(true);
      setError(false);

      const response = await fetch("/api/amenitiesListing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...(formData),
          userRef: currentUser._id,
        })
      });
      const data = await response.json();
      setLoading(false);
      if (data.success === false) {
        return setError(data.message);
      }
      navigate("/dashboard?tab=services");
    }
    catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen mt-20">
    <h1 className="text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300"> Create Amenity</h1>
  </div>
);
}

export default CreateServiceListing;