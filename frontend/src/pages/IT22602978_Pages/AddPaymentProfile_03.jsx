import { useState } from "react";
import { useSelector } from "react-redux";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Alert,Button, Checkbox, Label, TextInput, } from "flowbite-react"

const AddPaymentProfile_03 = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const {currentUser} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    PaymentProfileName: '', 
    ownerUsername: '',
    ownerhousenumber: '',
    password: '',
  })
  const { PaymentProfileName,ownerUsername, ownerhousenumber, password } = formData;
  
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileCounter, setProfileCounter] = useState(1);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value.trim()
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      // Validation for password length and capitalization
      if (!/^(?=.*[A-Z]).{8,}$/.test(formData.password)) {
        return setErrorMessage('Password must have at least 8 characters with the first letter capitalized');
    }

    // Phone number validation
    if (formData.ownerhousenumber.length !== 3 || isNaN(formData.ownerhousenumber)) {
      return setErrorMessage("House number should have 10 digits");
      
    }

    if (!formData.PaymentProfileName) {
      formData.PaymentProfileName = `Profile ${profileCounter}`;
      setProfileCounter(profileCounter +1);
    }
    
    if (!formData.ownerUsername || !formData.ownerhousenumber || !formData.password) {
      return setErrorMessage('Please fill out all the fields');
    }
   
    if(formData.ownerUsername !== currentUser.username){
      return setErrorMessage('Username does not match with your username');
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/PaymentProfileCreation/CreatePayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          OwnerId: `${currentUser._id}`,
          ...formData,
        })
      })
      const data = await res.json();
      setLoading(false);
      if(data.success === false) {
        setErrorMessage(data.message);
      }
      if(res.status === 201) {
        navigate('/dashboard?tab=userpayments');
        toast.success("Payment Profile Created successfully");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
};



  return (
    <div className="container mx-auto w-[20%]">
      <div className="flex-col h-screen mt-20 justify-center">
        <h1 className="flex justify-center text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">Add Payment Profile</h1>
        <div className="flex p-3 w-[100%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
          <form className="flex flex-col gap-4 w-full justify-center" onSubmit={handleSubmit}>
          <div>
              <Label value="ProfileName"/>
              <TextInput type="text" placeholder="PaymentProfileName" id="PaymentProfileName" value={PaymentProfileName} onChange={(e) => setFormData({ ...formData, PaymentProfileName: e.target.value })} />
            </div>
            <div>
              <Label value="Username"/>
              <TextInput type="text" placeholder="Username" id="ownerUsername" value={ownerUsername} onChange={handleChange} />
            </div>
            <div>
              <Label value="HouseNumber"/>
              <TextInput type="text" placeholder="HouseNumber" id="ownerhousenumber"value={ownerhousenumber} onChange={handleChange} />
            </div>
            <div>
              <Label value="Password ()"/>
              <TextInput type={showPassword ? "text" : "password"} placeholder="*************" id="password"  value ={password} onChange={handleChange} />
              {showPassword ? (<BsFillEyeSlashFill className='absolute right-3 top-9 text-md cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)}/>) : (<BsFillEyeFill className='absolute right-3 top-9 text-md cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)}/>)}
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="agree" onChange={handleChange} />
              <Label htmlFor="agree" className="flex">
                I agree with the&nbsp;
                <Link to="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                  terms and conditions
                </Link>
              </Label>
            </div>
            <Button type="submit" gradientDuoTone='purpleToBlue' disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
          {
            errorMessage && (
              <Alert className="mt-7 py-3 bg-gradient-to-r from-red-100 via-red-300 to-red-400 shadow-shadowOne text-center text-red-600 text-base tracking-wide animate-bounce">{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default AddPaymentProfile_03;
