import { Button, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Contact from '../../components/IT22561466_Components/Contact';
import { ToastContainer, toast } from 'react-toastify';


export default function RequestCarPark() {
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    telNo: '',
    vehicleType: '',
    vehicleNum: '',
    nic: '',
  });
  console.log(formData);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [contact, setContact] = useState(false);

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
    const nicPattern = /^\d{11}(V|\d)$/;

    
    
    if (!namePattern.test(formData.ownerName)) {
      toast.error('Name must not contain numbers.');
    } else if (!phoneNumberPattern.test(formData.telNo)) {
      toast.error('Enter a valid phone number');
    } else if (!nicPattern.test(formData.nic)) {
      toast.error('NIC must be either a 12-digit number or 11 digits followed by a V');
    } else {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch('/api/carparkListing/create', {
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
        navigate(`/park-slot/${data.carparkListingId}`);

        
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
  }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Request Car Parking Facility</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput type="text" placeholder="Owner Name"  id="ownerName" onChange={handleChange} value={formData.ownerName} required />
        <TextInput type="email" placeholder="Email"  id="email" onChange={handleChange} value={formData.email} required />
        <TextInput type="text" placeholder="Tel No(07XXXXXXXX)"  id="telNo" onChange={handleChange} value={formData.telNo} required  />
        <TextInput type="text" placeholder="Vehicle Type"  id="vehicleType" onChange={handleChange} value={formData.vehicleType} required />
        <TextInput type="text" placeholder="Vehicle Number"  id="vehicleNum" onChange={handleChange} value={formData.vehicleNum} required />
        <TextInput type="text" placeholder="NIC"  id="nic" onChange={handleChange} value={formData.nic} required />
        <Button type='submit' gradientDuoTone='purpleToBlue'>{loading ? 'Proceeding...' : 'Proceed'}</Button>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </form>

      {!contact && (
      <div className="flex justify-center mt-5 py-5">
        <Button onClick={() => setContact(true)} gradientDuoTone="purpleToBlue">Contact for Help</Button>
      </div>
      )}
      {contact && <Contact />}
      
    </div>
  )
}

