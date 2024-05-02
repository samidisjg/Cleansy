import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from '../../../redux/user/userSlice';
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"

const SignInQR = () => {
  const [scanner2, setScanner2] = useState(null);
  const [emailAddress, setEmailAddress] = useState(null);
  const [paymentId,setpaymentId] = useState(null)
  const [HouseId,setHouseId]= useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setShow = "true"

  useEffect(() => {
    if (!scanner2) {
      const newScanner = new Html5QrcodeScanner("qr-reader", {
        qrbox: {
          width: 400,
          height: 400
        },
        fps: 5,
      });
      
      setScanner2(newScanner);
    } else {
      scanner2.render(success, error);
    }

    return () => {
      if (scanner2) {
        scanner2.clear();
      }
    };
  }, [scanner2]);

  useEffect(() => {
    if (emailAddress) {
      try {
        dispatch(signInStart());
            
        fetch('/api/auth/signinQR', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: emailAddress })
        })
        .then(res => {
          if (res.status !== 200) {
            throw new Error("Invalid QR code");
           
            
          }
          return res.json();
        })
        .then(data => {
          dispatch(signInSuccess(data));
          navigate(`/pay-now/${HouseId}/${paymentId}`);
          console.log(data)
        })
        .catch(error => {
          console.error("Error:", error);
          setErrorMessage(error.message);
          dispatch(signInFailure(error.message));
        });
      } catch (error) {
        console.error("Error:", error);
        dispatch(signInFailure(error.message));
      }
    }
  }, [emailAddress, dispatch, navigate]);

  function success(result) {
    setScanner2(null); 
    const individualValues = result.split(',');
    const email = individualValues[0];
    const paymentId =  individualValues[1];
    const HouseId = individualValues[2];

    setEmailAddress(email);
    setpaymentId(paymentId);
    setHouseId(HouseId);
  }

  function error(error) {
    console.warn("Error scanning QR code:", error);
  }

  return (
    
    <div className="flex justify-center items-center ">
      <div id="qr-reader" className="shadow-xl flex flex-col justify-items-center items-center w-[80vh] h-[80vh] ">
       
      </div>
    
    
    {errorMessage && (
      <Alert className="mt-7 py-3 bg-gradient-to-r from-red-100 via-red-300 to-red-400 shadow-shadowOne text-center text-red-600 text-base tracking-wide animate-bounce">
        {errorMessage}
      </Alert>
    )}
  </div>
  
  );
};

export default SignInQR;
