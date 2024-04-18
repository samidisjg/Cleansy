import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {
    Button,
    Label,
    TextInput,
    Textarea,
    FileInput
} from "flowbite-react";

const AmenityUpdate_05 = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [files, setFiles] = useState([]);
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        AmenityID: "",
        AmenityName: "",
        Description: "",
        Location: "",
        Capacity: "",
        AvailableTime: "",
        Price: "",
        imageURLs: [],
    });

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchAmenity = async () => {
            const amenityID = params.amenityID;
            const res = await fetch(`/api/amenitiesListing/get/${amenityID}`);
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            setFormData((prevData) => ({
                ...prevData,
                AmenityID: data.amenityID,
                AmenityName: data.amenityTitle,
                Description: data.amenityDescription,
                Location: data.amenityLocation,
                Capacity: data.amenityCapacity,
                AvailableTime: data.amenityAvailableTimes,
                Price: data.amenityPrice,
                //imageURLs: data.imageURLs,
            }));
        }
        fetchAmenity();
    }
        , []);

    const handleChange = (e) => {
        console.log("Event:", e);
        const { name, value } = e.target;
        console.log("Name:", name);
        console.log("Value:", value);
        setFormData({
            ...formData,
            [name]: value,
        });
    };
        
        

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.AmenityID === currentUser.AmenityID) {
                setError("AmenityID already exists");
                return;
            }
            setLoading(true);
            console.log("Form Data:", formData); // Add this line
            setError(false);
            
            const res = await fetch(`/api/amenitiesListing/update/${params.amenityID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
                return;
            }
            navigate("/dashboard?tab=amenity");
        } catch (error) {
            setError("An error occurred while updating the amenity.");
            console.log(error);
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
            <main>
                <h1 className="text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">
                    Update Amenity
                </h1>
            </main>
            <div className="flex p-3 w-[40%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
                <form onSubmit = {handleSubmit} className="flex flex-col gap-4 w-full justify-center">
                    <div>
                        <Label value="AmenityID" />
                        <TextInput
                            type="text"
                            name="AmenityID"
                            required
                            value={formData.AmenityID}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label value="Amenity Name" />
                        <TextInput
                            type="text"
                            name="AmenityName"
                            required
                            value={formData.AmenityName}
                            onChange={handleChange}
                        />
                    </div>   
                    <div>
                        <Label value="Description" />
                        <Textarea
                            name="Description"
                            required
                            value={formData.Description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label value="Location" />
                        <TextInput
                            type="text"
                            name="Location"
                            required
                            value={formData.Location}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label value="Capacity" />
                        <TextInput
                            type="number"
                            name="Capacity"
                            required
                            value={formData.Capacity}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label value="Price" />
                        <TextInput
                            type="number"
                            name="Price"
                            required
                            value={formData.Price}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label value="AvailableTime" />
                        <TextInput
                            type="text"
                            name="AvailableTime"
                            required
                            value={formData.AvailableTime}
                            onChange={handleChange}
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
                    >{loading ? "Updating Amenity..." : "Update Amenity"}</Button>
                        {error && <Alert className='mt-7 py-3 bg-gradient-to-r from-red-100 via-red-300 to-red-400 shadow-shadowOne text-center text-red-600 text-base tracking-wide animate-bounce'>{error}</Alert>}
                    </div>
                </form>   
        </div>
    </div>
    );
}

export default AmenityUpdate_05;