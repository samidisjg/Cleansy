// UpdateAnnouncementForm.js
import React, { useState, useEffect } from 'react';
import { TextInput, Textarea, Select, Button } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateAnnouncementForm = () => {
    const [formData, setFormData] = useState({
        Title: '',
        Content: '',
        Category_ID: '',
        Attachment_URL: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const id = params.id;
                const res = await fetch(`/api/announcements/read/${id}`);
                const data = await res.json();
                setFormData(data);
            } catch (error) {
                console.error('Error fetching announcement:', error.message);
                setError('An error occurred while fetching the announcement.');
            }
        };
        fetchAnnouncement();
    }, []);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            if (!formData.Title || !formData.Content) {
                throw new Error('Title and Content are required.');
            }
            const id = params.id;
            const res = await fetch(`/api/announcements/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            setFormData(data);
            setSuccess(true);
            navigate('/dashboard?tab=announcement');
            
        } catch (error) {
            console.error('Error updating announcement:', error.message);
            setError('An error occurred while updating the announcement.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Update Announcement</h1>
            {error && <p className="text-red-700 text-sm">{error}</p>}
            {success && <p className="text-green-700 text-sm">Announcement updated Successfully!</p>}
            <div className="p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <TextInput
                        type="text"
                        placeholder="Title"
                        name="Title"
                        value={formData.Title}
                        onChange={handleChange}
                        required
                    />
                    <Textarea
                        placeholder="Content"
                        name="Content"
                        value={formData.Content}
                        onChange={handleChange}
                        required
                    />
                    <Select
                        name="Category_ID"
                        value={formData.Category_ID}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="staff">Staff</option>
                        <option value="customer">Customer</option>
                    </Select>
                    <TextInput
                        type="text"
                        placeholder="Attachment URL"
                        name="Attachment_URL"
                        value={formData.Attachment_URL}
                        onChange={handleChange}
                    />
                    <Button type="submit" gradientDuoTone="purpleToBlue">
                        {loading ? 'Updating...' : 'Update'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default UpdateAnnouncementForm;
