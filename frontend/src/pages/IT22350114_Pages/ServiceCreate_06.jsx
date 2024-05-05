import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [imageUploadError, setImageUploadError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageSubmit = () => {
    if(files.length > 0 && files.length + formData.imageUrls.length < 7) {
       setUploading(true);
       setImageUploadError(false);
       const promises = [];

       for (let i = 0; i < files.length; i++) {
          promises.push(storeImage(files[i]));
       }

       Promise.all(promises).then((urls) => {
          setFormData({
             ...formData,
             imageUrls: formData.imageUrls.concat(urls)
          })
          setImageUploadError(false);
          setUploading(false);
       }).catch((err) => {
          setImageUploadError('Image Upload failed (2mb max per Image)');
          setUploading(false);
       })
    } else {
       setImageUploadError('You can only upload 6 Images per listing')
       setUploading(false);
    }
 }

 const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
       const storage = getStorage(app);
       const fileName = new Date().getTime() + file.name;
       const storageRef = ref(storage, fileName);
       const uploadTask = uploadBytesResumable(storageRef, file);
       uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            })
          }
        )
    })
 }

 const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    })
 }

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
            <Label htmlFor="serviceID">Service ID</Label>
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
            <Label htmlFor="serviceName">Service Name</Label>
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
            <Label htmlFor="serviceDescription">Service Description</Label>
            <Textarea
              name="serviceDescription"
              value={formData.serviceDescription}
              onChange={handleChange}
              id="serviceDescription"
              required
            />
          </div>
          <div>
            <Label htmlFor="servicePrice">Service Price</Label>
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
            <Label htmlFor="serviceType">Service Type</Label>
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
            <Label htmlFor="serviceAvailability">Service Availability</Label>
            <Select
              name="serviceAvailability"
              value={formData.serviceAvailability}
              onChange={handleChange}
              id="serviceAvailability"
              required
            >
              <option value="">Select availability</option>
              <option value={"Available"}>Available</option>
              <option value={"Unavailable"}>Unavailable</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="servicePhone">Phone Number</Label>
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
            <Label htmlFor="serviceEmail">Email</Label> {/* corrected typo */}
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
            <Label htmlFor="serviceRequirements">Service Requirements</Label>
            <TextInput
              type="text"
              name="serviceRequirements"
              value={formData.serviceRequirements}
              onChange={handleChange}
              id="serviceRequirements"
              required
            />
          </div>

          <div className="flex flex-col gap-4 flex-1">
            <p className="font-semibold">Images: <span className="font-normal text-gray-600 ml-2">6 Photos Max</span></p>
            <div className="flex gap-4">
                <FileInput onChange={(e) => setFiles(e.target.files)} type='file' id="image" accept="image/*" multiple className="w-full" />
                <button onClick={handleImageSubmit} type="button" disabled={uploading} className="p-1 text-red-700 border border-red-700 rounded uppercase hover:shadow-lg disabled:opacity-80">{uploading ? 'Uploading...' : 'Upload'}</button>
            </div>
            <p className="text-red-700">{imageUploadError && imageUploadError}</p>
            {
                formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                    <div key={`image-${index}`} className="flex justify-between p-3 border items-center">
                        <img src={url} alt={`listing image ${index}`} className='w-20 h-20 object-contain rounded-lg' />
                        <Button type="button" onClick={() => handleRemoveImage(index)} gradientDuoTone="pinkToOrange">Delete</Button>
                    </div>
                ))
            }
            <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            className="uppercase"
        >{loading ? "Service Listing..." : "Service Listing"}</Button>
            {error && <Alert className='mt-7 py-3 bg-gradient-to-r from-red-100 via-red-300 to-red-400 shadow-shadowOne text-center text-red-600 text-base tracking-wide animate-bounce'>{error}</Alert>}
        </div>
        </div>
      </form>
    </main>
  );
};

export default ServiceListingCreate;