import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    Button,
    Label,
    Select,
    TextInput,
    Textarea,
    } from "flowbite-react";

const AmenityCreate = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        AmenityID: "",
        AmenityName: "",
        Description: "",
        Image: "",
        Location: "",
        Capacity: "",
        Availability: "",
        Price: "",
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.AmenityID === currentUser.AmenityID) return setError('AmenityID already exists');
            setLoading(true);
            setError(false);

            const response = await fetch('api/amenitiesListing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...(formData),
                    userRef: currentUser._id,
            }),
            });
            const data = await response.json();
            setLoading(false);
            if (data.success === false) {
                return setError(data.message);
            }
            navigate('/dashboard?tab=amenities');
        }
        catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            Image: e.target.files[0],
        });
    }


    return (
        <div className="min-h-screen mt-20">
            <h1 className="text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300"> Create Amenity</h1>
            <div className="flex p-3 w-[40%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full justify-center">
                    <div>
                        <Label for="AmenityID">Amenity ID</Label>
                        <TextInput
                            type="text"
                            name="AmenityID"
                            value={formData.AmenityID}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label for="AmenityName">Amenity Name</Label>
                        <TextInput
                            type="text"
                            name="AmenityName"
                            value={formData.AmenityName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label for="Description">Description</Label>
                        <Textarea
                            name="Description"
                            value={formData.Description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label for="Image">Image</Label>
                        <input
                            type="file"
                            name="Image"
                            value={formData.Image}
                            onChange={handleImageChange}
                            required
                        />
                    </div>
                    <div>
                        <Label for="Capacity">Capacity</Label>
                        <TextInput
                            type="number"
                            name="Capacity"
                            value={formData.Capacity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label for="Available Times">Available Times</Label>
                        <TextInput
                            type="text"
                            name="Times"
                            value={formData.Times}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label for="Price">Price</Label>
                        <TextInput
                            type="number"
                            name="Price"
                            value={formData.Price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <Button
                        type="submit"
                        gradientDuoTone="purpleToBlue"
                        className="uppercase"
                    >{loading ? "Creating Amenity..." : "Create Amenity"}</Button>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default AmenityCreate;