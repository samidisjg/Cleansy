import React, { useState } from "react";
import { Alert, Button, Label, TextInput, Textarea } from "flowbite-react";
import { UseSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const AnnouncementPage = () => {

    const [formData, setFormData] = useState({
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
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
            if(!formData.Title || !formData.Content) {
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
            if(data.success) {
                setSuccess(true);
                setError('');
                setTimeout(() => {
                    setSuccess(false);
                    setFormData({
                        Announcement_ID: '',
                        Title: '',
                        Content: '',
                        Category_ID: '',
                        Attachment_URL: '',
                        Create_At: new Date().toISOString()
                    });
                    navigate('/announcement-list');
                }, 3000);
            } else {
                setError('Failed to create announcement');
            }
        }catch {
            console.error('Error creating announcement:', error.message);
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setFormData({
            Announcement_ID: '',
            Title: '',
            Content: '',
            Category_ID: '',
            Attachment_URL: '',
            Create_At: new Date().toISOString()
    });
};

return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-6">Create Announcement</h2>
      {error && <Alert type="danger">{error}</Alert>}
      {success && <Alert type="success">Announcement created Successfully!</Alert>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Label className="flex flex-col">
          <span className="text-sm font-semibold mb-1">Announcement ID:</span>
          <TextInput type="text" name="Announcement_ID" value={formData.Announcement_ID} onChange={handleChange} className="px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500" />
        </Label>
        <Label className="flex flex-col">
          <span className="text-sm font-semibold mb-1">Title:</span>
          <TextInput type="text" name="Title" value={formData.Title} onChange={handleChange} className="px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500" />
        </Label>
        <Label className="flex flex-col">
          <span className="text-sm font-semibold mb-1">Content:</span>
          <Textarea name="Content" value={formData.Content} onChange={handleChange} className="px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500" />
        </Label>
        <Label className="flex flex-col">
          <span className="text-sm font-semibold mb-1">Category ID:</span>
          <TextInput type="text" name="Category_ID" value={formData.Category_ID} onChange={handleChange} className="px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500" />
        </Label>
        <Label className="flex flex-col">
          <span className="text-sm font-semibold mb-1">Attachment URL:</span>
          <TextInput type="text" name="Attachment_URL" value={formData.Attachment_URL} onChange={handleChange} className="px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500" />
        </Label>
        <div className="flex space-x-4">
          <Button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
            {loading ? "Submitting..." : "Submit"}
          </Button>
          <Button type="button" onClick={handleClear} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
            Clear
          </Button>
        </div>
        {loading && <span>Loading...........</span>}
      </form>
    </div>
  );
};

export default AnnouncementPage;








/*const AnnouncementPage = () => {
    
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() =>{
        //Fetch announcements from backend when component mounts
        axios.get('/api/announcements/read')
        .then(response => {
            setAnnouncements(response.data);
        })
        .catch(error => {
            console.error('Error fetching announcements:', error);
        });

    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-4">Announcements</h1>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">Title</th>
                        <th className="py-2 px-4 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {announcements.map(announcement =>(
                        <tr key ={announcement._id} className="bg-white hover:bg-gray-100">
                            <td className="py-2 px-4 border">{announcement.Title}</td>
                            <td className="py-2 px-4 border">
                                <button onClick={() => handleUpdate(announcement)} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded mr-2 focus:outline-none focus:shadow-outline">
                                    Update
                                </button>
                                <button onClick={() => handleDelete(announcement._id)} className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

};

export default AnnouncementPage; */