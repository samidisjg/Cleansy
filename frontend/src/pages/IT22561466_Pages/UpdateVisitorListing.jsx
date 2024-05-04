import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import visitorListing from '../../../../backend/models/IT22561466_Models/visitorListing.model';
import { Button, TextInput } from 'flowbite-react';


export default function AddVisitors() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    ownerName: '',
    guestName: '',
    telNo: '',
    date: '',
    time: '',
    purpose: '',
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    const fetchListing = async () => {
        const visitorListingId = params.visitorListingId;
        const res = await fetch(`/api/visitorListing/get/${visitorListingId}`);
        const data = await res.json();
        if(data.success === false) {
            console.log(data.message);
            return;
        }
        setFormData(data);
    };
    fetchListing();
  },[]);
  console.log(formData);

  
  const handleChange = (e) => {
    if (e.target) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const namePattern = /^[A-Za-z\s]+$/;
    const phoneNumberPattern = /^07\d{8}$/;


    if (!namePattern.test(formData.ownerName) || !namePattern.test(formData.guestName)) {
      toast.error('Name must not contain numbers.');
      
    }else if (!phoneNumberPattern.test(formData.telNo)) {
      toast.error('Enter valid phone number');
      
    }else{
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/visitorListing/update/${params.visitorListingId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            userRef: currentUser._id,
          }),
        });

        const data = await res.json();
        setLoading(false);
        if (data.success === false) {
          setError(data.message);
        }
        toast.success('Update successful!');
        navigate(`/visitorListing/${data._id}`);
        
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
  }
  };


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Update Visitors</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput type="text" placeholder="Owner Name" id="ownerName" required onChange={handleChange} value={formData.ownerName}  />
        <TextInput type="text" placeholder="Guest Name" id="guestName" required onChange={handleChange} value={formData.guestName} />
        <TextInput type="text" placeholder="Tel No" id="telNo" required onChange={handleChange} value={formData.telNo} />
        <TextInput type="date" placeholder="Date of visit" id="date" required onChange={handleChange} value={formData.date}  />
        <TextInput type="time" placeholder="Time of visit(around)" id="time" required onChange={handleChange} value={formData.time}  />
        <TextInput type="text" placeholder="Purpose of visit" id="purpose" required onChange={handleChange} value={formData.purpose}  />
        <Button type='submit' gradientDuoTone='purpleToBlue'>{loading ? 'Updating...' : 'Update'}</Button>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </form>
    </div>
  );
}
