import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const BookingUpdate_05 = () => {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const params = useParams();
    const [formData, setFormData] = useState({
        serviceID: serviceID || "",
        serviceName: "",
        serviceBookingID: generateBookingId(),
        residentName: "",
        residentPhone: "",
        residentEmail: "",
        bookingDate: "",
        bookingTime: "",
        bookingStatus: "Pending",
        imageUrls: [],
    });

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [durationDisabled, setDurationDisabled] = useState(false); 


    useEffect(() => {
        const fetchBooking = async () => {
            const bookingID = params.bookingID;
            const res = await fetch(`/api/amenitiesBooking/get/${bookingID}`);
            const data = await res.json();
            if (data.success === false) {
                console.error(data.message);
                return;
            }
            const formattedDate = new Date(data.bookingDate).toISOString().split('T')[0];
            setFormData((prevData) => ({
                ...prevData,
                serviceBookingID: data.serviceBookingID,
                serviceID: data.serviceID,
                serviceName: data.serviceName,
                residentName: data.residentName,
                residentPhone: data.residentPhone,
                residentEmail: data.residentEmail,
                bookingDate: formattedDate,
                bookingTime: data.bookingTime,
                status: data.bookingStatus,
                imageUrls: data.imageUrls,
            }));
        }
        fetchBooking();
    }, []);



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
    
        const handleChange = (e) => {
            const { name, value, type } = e.target;
        
            // Convert the input value if it's meant to be a boolean
            let adjustedValue = value;
            if (value === "true") {
                adjustedValue = true;
            } else if (value === "false") {
                adjustedValue = false;
            }
        
            // Update the formData state with the adjusted value
            setFormData({
                ...formData,
                [name]: adjustedValue,
            });
        
            // Log the name and adjusted value (remove or limit this in production)
            console.log("Name:", name);
            console.log("Value:", adjustedValue);
        };
        
    
        const updateDatabase = async (fieldName, fieldValue) => {
            try {
                // Make the API call to update the database with the new date or time
                const res = await fetch(`/api/serviceBooking/update/${params.serviceBookingID}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        [fieldName]: fieldValue,
                    }),
                });
                const data = await res.json();
                if (data.success === false) {
                    console.error(data.message);
                    return;
                }
                console.log(`Updated ${fieldName} successfully`);
            } catch (error) {
                console.error("An error occurred while updating the database:", error);
            }
        };
        
        

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        console.log("Form Data:", formData); 
        

        try {
            if (formData.imageUrls.length < 1)
                return setError("Please upload at least one image");

            const res = await fetch(`/api/serviceBooking/update/${params.serviceBookingID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    bookingStatus: "Pending",
                }),
                
            });
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                setLoading(false);
                return;
            }

            

            navigate('/dashboard?tab=bookings');
        } catch (error) {
            setError("An error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen mt-20">
            <main>
                <h1 className="text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">
                    Update Service Booking
                </h1>
            </main>
            <div className="flex p-3 w-[40%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
                <form onSubmit = {handleSubmit} className="flex flex-col gap-4 w-full justify-center">
                    <div>
                        <Label htmlFor="serviceBookingID">Booking ID:</Label>
                        <TextInput
                            type="text"
                            id="bookingId"
                            name="bookingID"
                            value={formData.bookingID}
                            readOnly
                        />
                    </div>

                    <div>
                        <Label htmlFor="amenityId">Amenity ID:</Label>
                        <TextInput
                            type="text"
                            id="amenityId"
                            name="amenityID"
                            value={formData.amenityID}
                            readOnly
                        />
                    </div>

                    <div>
                        <Label htmlFor="amenityTitle">Amenity Title:</Label>
                        <TextInput
                            type="text"
                            id="amenityTitle"
                            name="amenityTitle"
                            value={formData.amenityTitle}
                            readOnly
                        />
                    </div>

                    <div>
                        <Label htmlFor="residentUsername">Resident Username:</Label>
                        <TextInput
                            type="text"
                            id="residentUsername"
                            name="residentUsername"
                            value={formData.residentUsername}
                            readOnly
                        />
                    </div>

                    <div>
                        <Label htmlFor="residentName">Resident Name:</Label>
                        <TextInput
                            type="text"
                            id="residentName"
                            name="residentName"
                            value={formData.residentName}
                            onChange={handleChange}
                            
                        />
                    </div>

                    <div>
                        <Label htmlFor="residentEmail">Resident Email:</Label>
                        <TextInput
                            type="text"
                            id="residentEmail"
                            name="residentEmail"
                            value={formData.residentEmail}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="residentContact">Resident Contact:</Label>
                        <TextInput
                            type="text"
                            id="residentContact"
                            name="residentContact"
                            value={formData.residentContact}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="Date">Date:</Label>
                        <TextInput
                            type="date"
                            id="date"
                            name="bookingDate"
                            min={new Date().toISOString().split('T')[0]}
                            value={formData.bookingDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="Time">Time:</Label>
                        <TextInput
                            type="time"
                            id="time"
                            name="bookingTime"
                            value={formData.bookingTime}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div>
                        <Label htmlFor="duration">Duration:</Label>
                        <TextInput
                            type="number"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            disabled={durationDisabled} 
                        />
                        <Button onClick={calculateTotalPrice} gradientDuoTone={"purpleToBlue"} disabled={calculateDisabled}>
                            Calculate Total Price
                        </Button>
                    </div>

                    <div>
                        <Label htmlFor="bookingPrice">Total Price:</Label>
                        <TextInput
                            type="text"
                            id="bookingPrice"
                            name="bookingPrice"
                            value={formData.bookingPrice}
                            disabled
                        />
                    </div>
                    <div>
                        <Label htmlFor="priceDifference">Amount Need to Paid:</Label>
                        <TextInput
                            type="text"
                            id="priceDifference"
                            name="priceDifference"
                            value={formData.priceDifference || 0} 
                            readOnly
                        />
                    </div>

                    <div>
                        <Label htmlFor="specialRequests">Special Requests:</Label>
                        <Textarea
                            id="specialRequests"
                            name="specialRequests"
                            value={formData.specialRequests}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col gap-4 flex-1">
                        <p className="font-semibold">Paymennt Images: <span className="font-normal text-gray-600 ml-2">2 Photos Max</span></p>
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
                    >{loading ? "Updating Booking..." : "Update Booking"}</Button>
                        {error && <Alert className='mt-7 py-3 bg-gradient-to-r from-red-100 via-red-300 to-red-400 shadow-shadowOne text-center text-red-600 text-base tracking-wide animate-bounce'>{error}</Alert>}
                    </div>
                </form>    
            </div>
        </div>
    );
};

export default BookingUpdate_05;