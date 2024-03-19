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
        <div>
            <h2>Create Announcement</h2>
            {error && <Alert type="danger">{error}</Alert>}
            {success && <Alert type="success">Announcement created Successfully!</Alert>}
            <form onSubmit={handleSubmit}>
                <Label>
                    Announcement ID:
                    <TextInput type="text" name="Announcement_ID" value={FormData.Announcement_ID} onChange={handleChange} />
                </Label>
                <Label>
                    Title:
                    <TextInput type="text" name="Title" value={FormData.Title} onChange={handleChange} />
                </Label>
                <Label>
                    Content:
                    <TextInput type="textarea" name="Content" value={FormData.Content} onChange={handleChange} />
                </Label>
                <Label>
                    Category ID:
                    <TextInput type="text" name="Category_ID" value={FormData.Category_ID} onChange={handleChange} />
                </Label>
                <Label>
                    Attachment URL:
                    <TextInput type="text" name="Attachment_URL" value={FormData.Attachment_URL} onChange={handleChange} />
                </Label>
                <Button type="submit" disabled={loading}>Submit</Button>
                {loading && <span>Loading...........</span>}
            </form>
        </div>
    );

};

export default CreateAnnouncements;