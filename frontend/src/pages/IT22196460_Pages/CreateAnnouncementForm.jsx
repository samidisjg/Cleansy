import React, { useState } from 'react';
import { Alert, Button, TextInput, Textarea, Select } from 'flowbite-react'; // Assuming these components are available
import { useNavigate } from 'react-router-dom';

const CreateAnnouncementForm = () => {
    const [formData, setFormData] = useState({
        Announcement_ID: generateAnnouncement_ID(),
        Title: '',
        Content: '',
        Category_ID: '',
        Attachment_URL: '',
        Create_At: new Date().toISOString()
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

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
            
            const res = await fetch('/api/announcements/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            setFormData(data);
            navigate('/dashboard?tab=announcement');
            
        } catch (error) {
            console.error('Error creating announcement:', error.message);
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setFormData({
            Announcement_ID: generateAnnouncement_ID(),
            Title: '',
            Content: '',
            Category_ID: '',
            Attachment_URL: '',
            Create_At: new Date().toISOString()
        });
    };

    function generateAnnouncement_ID() {
        return `A${Math.floor(Math.random() * 10000)}`;
    }

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Create Announcement</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <TextInput
                    type="text"
                    placeholder="Announcement ID"
                    name="Announcement_ID"
                    value={formData.Announcement_ID}
                    onChange={handleChange}
                    readOnly // Make the input readonly so the user can't change the ID directly
                />
                <TextInput
                    type="text"
                    placeholder="Title"
                    name="Title"
                    value={formData.Title}
                    onChange={handleChange}
                />
                <Textarea
                    placeholder="Content"
                    name="Content"
                    value={formData.Content}
                    onChange={handleChange}
                />
                <Select
                    placeholder="Category ID"
                    name="Category_ID"
                    value={formData.Category_ID}
                    onChange={handleChange}
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
                <div className="flex space-x-4">
                    <Button type="submit" disabled={loading} gradientDuoTone="purpleToBlue">
                        {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                    <Button type="button" onClick={handleClear} gradientDuoTone="pinkToOrange">
                        Clear
                    </Button>
                </div>
                {loading && (
                        <span className="text-white text-lg"></span>
                )}
            </form>
            {error && <p className="text-red-700 text-sm">{error}</p>}
            {success && <p className="text-green-700 text-sm">Announcement created Successfully!</p>}
        </div>
    );
};

export default CreateAnnouncementForm;
