import { useState } from "react";
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

const ServiceListingCreate = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [imageUploadError, setImageUploadError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((results) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(results),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError(error.message);
          setUploading(false);
        });
    } else {
      setImageUploadError(
        "Please upload at least one image and no more than 6 images"
      );
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imageUrls.length < 1)
        return setError("Please upload at least one image");
      if (formData.servicePrice < 0) {
        return setError("Price cannot be negative");
      }
      if (formData.serviceID === currentUser.serviceID)
        return setError("Service ID already exists");

      setLoading(true);
      setError(false);

      const res = await fetch("/api/serviceListing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate("/dashboard?tab=services");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  const handleChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    // Check if the input is a file input
    if (e.target.type === "file") {
      setFiles(e.target.files);
    } else {
      // For non-file inputs, update the form data state
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: boolean ?? e.target.value,
      }));
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto mb-10">
      <h1 className="text-2xl text-center font-semibold mb-5">
        Create a Service Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <div>
            <Label for="serviceID">Service ID</Label>
            <TextInput
              type="text"
              name="serviceID"
              value={formData.serviceID}
              onChange={handleChange}
              id="serviceID"
              maxLength={6}
              minLength={6}
              required
            />
          </div>
          <div>
            <Label for="serviceName">Service Name</Label>
            <TextInput
              type="text"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              id="serviceName"
              required
            />
          </div>
          <div>
            <Label for="serviceDescription">Service Description</Label>
            <Textarea
              name="serviceDescription"
              value={formData.serviceDescription}
              onChange={handleChange}
              id="serviceDescription"
              required
            />
          </div>
          <div>
            <Label for="servicePrice">Service Price</Label>
            <TextInput
              type="number"
              name="servicePrice"
              value={formData.servicePrice}
              onChange={handleChange}
              id="servicePrice"
              required
            />
          </div>

          <div>
            <Label for="serviceType">Service Type</Label>
            <Select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              id="serviceType"
              required
            >
              <option value="">Select a service type</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Carpentry">Carpentry</option>
              <option value="Gardening">Gardening</option>
              <option value="Other">Other</option>
            </Select>
          </div>
          <div>
            <Label for="serviceAvailability">Service Availability</Label>
            <Select
              name="serviceAvailability"
              value={formData.serviceAvailability}
              onChange={handleChange}
              id="serviceAvailability"
              required
            >
              <option value="">Select availability</option>
              <option value={true}>Available</option>
              <option value={false}>Unavailable</option>
            </Select>
          </div>

          <div>
            <Label for="servicePhone">Phone Number</Label>
            <TextInput
              type="text"
              name="servicePhone"
              value={formData.servicePhone}
              onChange={handleChange}
              id="servicePhone" // corrected id attribute
              required
            />
          </div>
          <div>
            <Label for="serviceEmail">Email</Label> {/* corrected typo */}
            <TextInput
              type="email"
              name="serviceEmail"
              value={formData.serviceEmail}
              onChange={handleChange}
              id="serviceEmail"
              required
            />
          </div>

          <div>
            <Label for="serviceRequirements">Service Requirements</Label>
            <TextInput
              type="text"
              name="serviceRequirements"
              value={formData.serviceRequirements}
              onChange={handleChange}
              id="serviceRequirements"
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-lg font-semibold">Upload Images</p>
            <div className="flex flex-col gap-3">
              <FileInput
                onChange={(e) => setFiles(e.target.files)}
                type="file"
                id="image"
                accept="image/*"
                multiple
                className="w-full"
              />
              <Button
                onClick={handleImageSubmit}
                type="button"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Images"}
              </Button>
            </div>
            <p className="text-red-500">
              {imageUploadError && imageUploadError}
            </p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <>
                  <div key={url} className="flex items-center gap-3">
                    <img
                      src={url}
                      alt="service image"
                      className="w-20 h-20 object-cover"
                    />
                    <Button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </>
              ))}
            <Button type="submit" disabled={loading || uploading}>
              {loading ? "Creating..." : "Create Service Listing"}
            </Button>
            {error && <Alert type="error">{error}</Alert>}
          </div>
        </div>
      </form>
    </main>
  );
};

export default ServiceListingCreate;
