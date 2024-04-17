import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    Button,
    Label,
    TextInput,
    Textarea,
    Alert,
} from "flowbite-react";

const BookingUpdate_05 = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [formData, setFormData] = useState({
        bookingID: "",
        amenityID: "",
        amenityTitle: "",
        residentUsername: "",
        residentName: "",
        residentEmail: "",
        residentContact: "",
        date: "",
        time: "",
        duration: "",
        specialRequests: "",
    });

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

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
                bookingID: data.bookingID,
                amenityID: data.amenityId,
                amenityTitle: data.amenityTitle,
                residentUsername: data.residentUsername,
                residentName: data.residentName,
                residentEmail: data.residentEmail,
                residentContact: data.residentContact,
                date: formattedDate,
                time: data.bookingTime,
                duration: data.duration,
                specialRequests: data.specialRequests,
            }));
        }
        fetchBooking();
    }
        , []);

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
            e.target.type === "textarea"||
            e.target.type === "date" ||
            e.target.type === "time"
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
    };
        

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData); // Add this line
        setLoading(true);
        setError(false);

        try {
            const res = await fetch(`/api/amenitiesBooking/update/${params.bookingID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                setLoading(false);
                return;
            }
            navigate("dashboard?tab=bookings");
        } catch (error) {
            setError("An error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen mt-20">
            <main>
                <h1 className="text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">
                    Update Booking
                </h1>
            </main>
            <div className="flex p-3 w-[40%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
                <form onSubmit = {handleSubmit} className="flex flex-col gap-4 w-full justify-center">
                    <div>
                        <Label htmlFor="bookingId">Booking ID:</Label>
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
                        <Label htmlFor="date">Date:</Label>
                        <TextInput
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="time">Time:</Label>
                        <TextInput
                            type="time"
                            id="time"
                            name="time"
                            value={formData.time}
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
                        <Button 
                        type="submit"
                        gradientDuoTone="purpleToBlue"
                        className="uppercase"
                        >{loading ? "Updating Booking" : "Update Booking"}</Button> 
                        {error && <Alert className='mt-7 py-3 bg-gradient-to-r from-red-100 via-red-300 to-red-400 shadow-shadowOne text-center text-red-600 text-base tracking-wide animate-bounce'>{error}</Alert>}
                    </div>
                </form>    
            </div>
        </div>
    );
};

export default BookingUpdate_05;



