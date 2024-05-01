import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {
    Button,
    Label,
    TextInput,
    Textarea,
    FileInput,
    Alert,
    } from "flowbite-react";

const AmenityCreate = () => {
   
    // const fetchAmenity = async () => {
    //     const amenityID = params.amenityID;
    //     const res = await fetch(`/api/amenitiesListing/get/${amenityID}`);
    //     const data = await res.json();
    //     if (data.success === false) {
    //         console.log(data.message);
    //         return;
    //     }
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         amenityID: data.amenityID,
    //         amenityTitle: data.amenityTitle,
    //         amenityDescription: data.amenityDescription,
    //         amenityLocation: data.amenityLocation,
    //         amenityCapacity: data.amenityCapacity,
    //         amenityAvailableTimes: data.amenityAvailableTimes,
    //         amenityPrice: data.amenityPrice,
    //         imageURLs: data.imageURLs,
    //     }));
    // }
    // fetchAmenity();

    const generateAmenityId = () => `AMD-${Math.floor(1000 + Math.random() * 9000)}`;
    const [files, setFiles] = useState([]);
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        amenityID: generateAmenityId(),
        amenityTitle: '',
        amenityDescription: '',
        imageURLs: [],
        amenityLocation: '',
        amenityCapacity: 0,
        amenityAvailableTimes: '',
        amenityPrice: '',
        amenityStatus: "Unavailable",
    });

    // const { AmenityID, AmenityName, Description, Image, Location, Capacity, Availability, Price } = formData;
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type } = e.target;
    
        
        let processedValue = value;
    
        
        if (value === "true" || value === "false") {
            processedValue = value === "true";
        }
        

        
        if (name === "amenityPrice" && type === "number") {
            if (parseFloat(value) < 0) {
                console.log("Invalid input for Price: no negative values allowed.");
                return; 
            }
        }

        
        if (name === "amenityCapacity" && type === "number") {
            if (parseFloat(value) < 0) {
                console.log("Invalid input for Capacity: no negative values allowed.");
                return; 
            }
        }

        
        if (name === "amenityTitle" && type === "text") {
            const onlyLetters = /^[A-Za-z]+$/;  
            if (!(value === "" || onlyLetters.test(value))) {
                
                console.log("Invalid input for Amenity Name: only letters are allowed.");
                return; 
            }
        }
    
        
        setFormData(prevState => ({
            ...prevState,
            [name]: processedValue
        }));
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(formData.imageURLs.length < 1) return setError('You must upload at least one image')
            if (formData.amenityID === currentUser.amenityID) return setError('AmenityID already exists');
            setLoading(true);
            setError(false);

            console.log(formData.amenityID, currentUser.AmenityID);

            const payload = {
                ...formData,
                userRef: currentUser._id,
                amenityStatus: "Unavailable",
              };
        
              console.log("Submitting the following data to the backend:", payload);
        
              const response = await fetch('/api/amenitiesListing/create', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(payload)
            });

            const data = await response.json();
            setLoading(false);
            if (data.success === false) {
                return setError(data.message);
            }
            navigate('/dashboard?tab=amenity');
        }
        catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleImageSubmit = () => {
        if(files.length > 0 && files.length + formData.imageURLs.length < 7) {
           setUploading(true);
           setImageUploadError(false);
           const promises = [];
  
           for (let i = 0; i < files.length; i++) {
              promises.push(storeImage(files[i]));
           }
  
           Promise.all(promises).then((urls) => {
              setFormData({
                 ...formData,
                 imageURLs: formData.imageURLs.concat(urls)
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
          imageURLs: formData.imageURLs.filter((_, i) => i !== index),
        })
     }


    return (
        <div className="min-h-screen mt-20">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Create Amenity</h1>
            <div className="flex p-3 w-[40%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full justify-center">
                    <div>
                        <Label htmlFor="amenityID">Amenity ID</Label>
                        <TextInput
                            type="text"
                            name="amenityID"
                            value={formData.amenityID}
                            onChange={handleChange}
                            required
                            
                        />
                    </div>
                    <div>
                        <Label htmlFor="amenityTitle">Amenity Name</Label>
                        <TextInput
                            type="text"
                            name="amenityTitle"
                            value={formData.amenityTitle}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="amenityDescription">Description</Label>
                        <Textarea
                            name="amenityDescription"
                            value={formData.amenityDescription}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="amenityLocation">Location</Label>
                        <TextInput
                            type="text"
                            name="amenityLocation"
                            value={formData.amenityLocation}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div>
                        <Label htmlFor="amenityCapacity">Capacity</Label>
                        <TextInput
                            type="number"
                            name="amenityCapacity"
                            value={formData.amenityCapacity}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="amenityAvailableTimes Times">Available Times</Label>
                        <TextInput
                            type="text"
                            name="amenityAvailableTimes"
                            value={formData.amenityAvailableTimes}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="amenityPrice">Price</Label>
                        <TextInput
                            type="number"
                            name="amenityPrice"
                            value={formData.amenityPrice}
                            onChange={handleChange}
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
                            formData.imageURLs.length > 0 && formData.imageURLs.map((url, index) => (
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
                    >{loading ? "Creating Amenity..." : "Create Amenity"}</Button>
                        {error && <Alert className='mt-7 py-3 bg-gradient-to-r from-red-100 via-red-300 to-red-400 shadow-shadowOne text-center text-red-600 text-base tracking-wide animate-bounce'>{error}</Alert>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AmenityCreate