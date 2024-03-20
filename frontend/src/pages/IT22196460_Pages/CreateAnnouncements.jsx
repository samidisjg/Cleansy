import React, { useState} from 'react';
import { useSelector } from "react-redux";
import {BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { tost } from 'react-toastify';
import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";

const CreateAnnouncements = () => {

    const [fromData, setFormData] = useState({

        Announcement_ID: '',
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

        setFormData({ ...fromData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try{
            if(!FormData.Title || !fromData.Content){
                throw new Error('Title and Content are required.');
            }

            setTimeout(() => {
                setSuccess(true);
                tost.success('Announcement create successfully!');
                setTimeout(() =>{
                    setSuccess(false);
                    setFormData({
                        Announcement_ID: '',
                        Title: '',
                        Content: '',
                        Category_ID: '',
                        Attachment_URL: '',
                        Create_At: new Date().toISOString()
                    });
                }, 3000)
            }, 2000)
        }catch(error) {
            console.error('Error creating announcement:', error.message);
            setError('An error occurred. Please try again later.')
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-semibold mb-6">Create Announcement</h2>
            {error && <Alert type="danger">{error}</Alert>}
            {success && <Alert type="success">Announcement created Successfully!</Alert>}
            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Label className="flex flex-col">
                    <span className="text-sm font-semibold mb-1">Announcement ID:</span>                    
                    <TextInput type="text" name="Announcement_ID" value={FormData.Announcement_ID} onChange={handleChange} className="px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500" />
                </Label>
                    <Label className="flex flex-col">
                    <span className="text-sm font-semibold mb-1">Title:</span>
                    <TextInput type="text" name="Title" value={FormData.Title} onChange={handleChange} className="px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"/>
                </Label>
                <Label className="flex flex-col">
                    <span className="text-sm font-semibold mb-1">Content:</span>
                    <TextInput type="textarea" name="Content" value={FormData.Content} onChange={handleChange} className="px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"/>
                </Label>
                <Label className="flex flex-col">
                    <span className="text-sm font-semibold mb-1">Category ID:</span>
                    <TextInput type="text" name="Category_ID" value={FormData.Category_ID} onChange={handleChange} className="px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"/>
                </Label>
                <Label className="flex flex-col">
                     <span className="text-sm font-semibold mb-1">Attachment URL:</span>
                    <TextInput type="text" name="Attachment_URL" value={FormData.Attachment_URL} onChange={handleChange} className="px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"/>
                </Label>
                </div>
                <Button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
                    {loading ? "Submitting..." : "Submit"}
                </Button>
                {loading && <span>Loading...........</span>}
            </form>
        </div>
    );

};

export default CreateAnnouncements;