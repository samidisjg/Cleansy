import { Button, TextInput } from 'flowbite-react'
import React from 'react'

export default function RequestCarPark() {

  const handleChange = (e) => {
    if (e.target) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Request Car Parking Facility</h1>
      <form  className="flex flex-col gap-4">
        <TextInput type="text" placeholder="Owner Name"  id="ownerName" onChange={handleChange} />
        <TextInput type="email" placeholder="Email"  id="guestName" onChange={handleChange} />
        <TextInput type="text" placeholder="Tel No(07XXXXXXXX)"  id="telNo" onChange={handleChange} />
        <TextInput type="text" placeholder="Vehicle Type"  id="date" onChange={handleChange} />
        <TextInput type="text" placeholder="Vehicle Number"  id="time" onChange={handleChange} />
        <TextInput type="text" placeholder="NIC"  id="purpose" onChange={handleChange} />
        <Button type='submit' gradientDuoTone='purpleToBlue'>Proceed</Button>
      </form>
      
    </div>
  )
}

