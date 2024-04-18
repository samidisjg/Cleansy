import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import visitorListing from '../../../../backend/models/IT22561466_Models/visitorListing.model';


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
    const phoneNumberPattern = /^\d{10}$/;

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

  const handleShowListings = async () => {
    try {
      setError(false);
      const res = await fetch(`/api/user/visitorListings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Update Visitors</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Owner Name" className="border p-3 rounded-lg" id="ownerName" required onChange={handleChange} value={formData.ownerName}  />
        <input type="text" placeholder="Guest Name" className="border p-3 rounded-lg" id="guestName" required onChange={handleChange} value={formData.guestName} />
        <input type="text" placeholder="Tel No" className="border p-3 rounded-lg" id="telNo" required onChange={handleChange} value={formData.telNo} />
        <input type="text" placeholder="Date of visit" className="border p-3 rounded-lg" id="date" required onChange={handleChange} value={formData.date}  />
        <input type="text" placeholder="Time of visit(around)" className="border p-3 rounded-lg" id="time" required onChange={handleChange} value={formData.time}  />
        <input type="text" placeholder="Purpose of visit" className="border p-3 rounded-lg" id="purpose" required onChange={handleChange} value={formData.purpose}  />
        <button className="bg-slate-700 text-white mb-4 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ? 'Updating...' : 'Update'}</button>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </form>
    </div>
  );
}
