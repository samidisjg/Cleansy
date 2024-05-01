import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { Button, FileInput, Label, TextInput, Textarea } from "flowbite-react";
import { set } from "mongoose";

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
    serviceAvailability: "",
    servicePhone: "",
    serviceEmail: "",
    serviceRequirements: [],
    imageUrls: [],
  });

  const {
    serviceID,
    serviceName,
    serviceDescription,
    servicePrice,
    serviceType,
    serviceAvailability,
    servicePhone,
    serviceEmail,
    serviceRequirements,
    imageUrls,
  } = formData;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchServiceListings = async () => {
      const serviceID = params.serviceID;
      const response = await fetch(`/api/serviceListing/read/${serviceID}`);
      const data = await response.json(); // Parse response as JSON
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };
    fetchServiceListings();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.serviceID === currentUser.serviceID) {
        setError("Service ID already exists. Please try again.");
        return;
      }

      setLoading(true);
      // Your logic for updating the service
      console.log("Form data:", formData);
      setError(false);

      const response = await fetch(
        `/api/serviceListing/update/${params.serviceID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate("/dashboard?tab=services"); // Redirect to dashboard after successful update
    } catch (error) {
      setError("Error updating service. Please try again."); // Set error message
      console.log(error);
    }
  };

  // Function to handle image upload
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 5) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((imageUrls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(imageUrls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image Upload failed (2mb max per Image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("Maximum 5 images allowed.");
      setUploading(false);
    }
  };
  // Function to store image in cloud storage
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

  // Function to handle removing an image
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  return (
    <div>
      <main>
        <h1 className="text-center mt-7 font-extrabold text-3xl underline">
          Update Service
        </h1>
      </main>
      <div className="flex justify-center items-center mt-5">
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div>
            <label htmlFor="serviceID">Service ID</label>
            <TextInput
              type="text"
              name="serviceID"
              value={serviceID}
              onChange={handleChange}
              placeholder="Enter Service ID"
              required
            />
          </div>
          <div>
            <label value="Service Name"> Service Name</label>
            <TextInput
              type="text"
              name="serviceName"
              value={serviceName}
              onChange={handleChange}
              placeholder="Enter Service Name"
              required
            />
          </div>
          <div>
            <label value="Service Description"> Service Description</label>
            <Textarea
              name="serviceDescription"
              value={serviceDescription}
              onChange={handleChange}
              placeholder="Enter Service Description"
              required
            />
          </div>
          <div>
            <label value="Service Price"> Service Price</label>
            <TextInput
              type="number"
              name="servicePrice"
              value={servicePrice}
              onChange={handleChange}
              placeholder="Enter Service Price"
              required
            />
          </div>
          <div>
            <label value="Service Type"> Service Type</label>
            <TextInput
              type="text"
              name="serviceType"
              value={serviceType}
              onChange={handleChange}
              placeholder="Enter Service Type"
              required
            />
          </div>
          <div>
            <label value="Service Availability"> Service Availability</label>
            <TextInput
              type="text"
              name="serviceAvailability"
              value={serviceAvailability}
              onChange={handleChange}
              placeholder="Enter Service Availability"
              required
            />
          </div>
          <div>
            <label value="Service Phone"> Service Phone</label>
            <TextInput
              type="text"
              name="servicePhone"
              value={servicePhone}
              onChange={handleChange}
              placeholder="Enter Service Phone"
              required
            />
          </div>
          <div>
            <label value="Service Email"> Service Email</label>
            <TextInput
              type="email"
              name="serviceEmail"
              value={serviceEmail}
              onChange={handleChange}
              placeholder="Enter Service Email"
              required
            />
          </div>
          <div>
            <label value="Service Requirements"> Service Requirements</label>
            <TextInput
              type="text"
              name="serviceRequirements"
              value={serviceRequirements}
              onChange={handleChange}
              placeholder="Enter Service Requirements"
              required
            />
          </div>

          {/* Update images section */}
          <div>
            <Label>Upload Images</Label>
            <FileInput
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              id="imageUrls"
              multiple
            />
            <Button onClick={handleImageSubmit} disabled={uploading}>
              {uploading ? "Uploading..." : "Upload Images"}
            </Button>
            {imageUploadError && <p>{imageUploadError}</p>}
            {files.length > 0 && (
              <div>
                {files.map((file, index) => (
                  <div key={index}>
                    <p>{file.name}</p>
                    <Button onClick={() => handleRemoveImage(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {error && <p>{error}</p>}

         
          {/* Add other form fields */}
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Service"}
          </button>
        </form>
        {/* Add logic for displaying uploaded images and error messages */}
      </div>
    </div>
  );
};

export default ServiceUpdate_06;
