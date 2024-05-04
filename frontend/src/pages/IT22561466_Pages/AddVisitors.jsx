import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BsTrash, BsPencilSquare } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import { Button, TextInput } from 'flowbite-react';


export default function AddVisitors() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
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
        const res = await fetch('/api/visitorListing/create', {
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
        toast.success('Submission successful!');
        
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

  const handleListingDelete = async (visitorListingId) => {
    try {
      const res = await fetch(`/api/visitorListing/delete/${visitorListingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) => prev.filter((visitorListing) => visitorListing._id !== visitorListingId));
    } catch (error) {
      console.log(error.message);
    }
    
  };

  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Add Visitors</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput type="text" placeholder="Owner Name"  id="ownerName" required onChange={handleChange} />
        <TextInput type="text" placeholder="Guest Name"  id="guestName" required onChange={handleChange} />
        <TextInput type="text" placeholder="Tel No(07XXXXXXXX)"  id="telNo" required onChange={handleChange} />
        <TextInput type="date" placeholder="Date of visit"  id="date" required onChange={handleChange} />
        <TextInput type="time" placeholder="Time of visit(around)"  id="time" required onChange={handleChange} />
        <TextInput type="text" placeholder="Purpose of visit"  id="purpose" required onChange={handleChange} />
        <Button type='submit' gradientDuoTone='purpleToBlue'>{loading ? 'Submitting...' : 'Submit'}</Button>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </form>
      <Button  gradientDuoTone="pinkToOrange" className="w-full mt-4" onClick={handleShowListings}>
        Visitor List
      </Button>
      <p className="text-red-700 mt-5">{error ? 'Error Showing visitor list' : ''}</p>

    
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">Visitor List</h1>

          {userListings.map((visitorListing) => (
            <div key={visitorListing._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">
              <Link to={`/visitorListing/${visitorListing._id}`}>
                <p className="flex-1 text-slate-700 font-semibold hover:underline dark:text-slate-100">{visitorListing.guestName}</p>
              </Link>
              <p>{visitorListing.date}</p>

              <div className="flex flex-col item-center">
                <button onClick={() => handleListingDelete(visitorListing._id)} className="text-red-700 uppercase">
                  {' '}
                  <BsTrash />
                </button>
                <Link to={`/update-list/${visitorListing._id}`}>
                  <button className="text-green-700 uppercase">
                    {' '}
                    <BsPencilSquare />
                  </button>
                </Link>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
