import React, { useState } from 'react';
import { Alert, Button, Label, TextInput, Textarea } from 'flowbite-react'; // Assuming these components are available

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

            const res = await fetch('/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                setSuccess(true);
                setError('');
                setTimeout(() => {
                    setSuccess(false);
                    setFormData({
                        Announcement_ID: generateAnnouncement_ID(),
                        Title: '',
                        Content: '',
                        Category_ID: '',
                        Attachment_URL: '',
                        Create_At: new Date().toISOString()
                    });
                }, 3000);
            } else {
                setError('Failed to create announcement');
            }
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
        <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md h-full">
                <h2 className="text-3xl font-semibold mb-6 text-black text-center">Create Announcement</h2>
                {error && <Alert type="danger">{error}</Alert>}
                {success && <Alert type="success">Announcement created Successfully!</Alert>}
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Label className="flex flex-col">
                            <span className="text-sm font-semibold mb-1 text-black">Announcement ID:</span>
                            <TextInput
                                type="text"
                                name="Announcement_ID"
                                value={formData.Announcement_ID}
                                onChange={handleChange}
                                className="px-4 py-2 rounded-lg border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 text-white"
                                readOnly // Make the input readonly so the user can't change the ID directly
                            />
                        </Label>
                        <Label className="flex flex-col">
                            <span className="text-sm font-semibold mb-1 text-white">Title:</span>
                            <TextInput type="text" name="Title" value={formData.Title} onChange={handleChange} className="px-4 py-2 rounded-lg border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 text-white" />
                        </Label>
                        <Label className="flex flex-col">
                            <span className="text-sm font-semibold mb-1 text-white">Content:</span>
                            <Textarea name="Content" value={formData.Content} onChange={handleChange} className="px-4 py-2 rounded-lg border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 text-white" />
                        </Label>
                        <Label className="flex flex-col">
                            <span className="text-sm font-semibold mb-1 text-white">Category ID:</span>
                            <TextInput type="text" name="Category_ID" value={formData.Category_ID} onChange={handleChange} className="px-4 py-2 rounded-lg border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 text-white" />
                        </Label>
                        <Label className="flex flex-col">
                            <span className="text-sm font-semibold mb-1 text-white">Attachment URL:</span>
                            <TextInput type="text" name="Attachment_URL" value={formData.Attachment_URL} onChange={handleChange} className="px-4 py-2 rounded-lg border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 text-white" />
                        </Label>
                        <div className="flex space-x-4">
                            <Button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
                                {loading ? 'Submitting...' : 'Submit'}
                            </Button>
                            <Button type="button" onClick={handleClear} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
                                Clear
                            </Button>
                        </div>
                        {loading && <span>Loading...........</span>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateAnnouncementForm;
