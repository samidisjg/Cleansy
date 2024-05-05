import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";
import imgsrc1 from "/paymentgateway.jpg"


const PayNowpage_03 = ({ paymentId, housenumber }) => {
    
    const { currentUser } = useSelector((state) => state.user);
    const [errorMessage, setErrorMessage] = useState(null);
    const [outstandingamount, setOutstandingamount] = useState("");
    const [loading, setLoading] = useState(false);
    const username = currentUser.username;
    const { HouseIdQR, PaymentIdQR } = useParams();
    

    useEffect(() => {
        const fetchoutstandingPayments = async () => {
            try {
                setErrorMessage(false);
                const res = await fetch(`/api/AdminPaymentHandling/${housenumber || HouseIdQR}`);
                const resdata = await res.json();
                
                if (resdata.success === false) {
                    setErrorMessage(true);
                    return;
                }
                if (resdata.length === 0) {
                    setErrorMessage("No outstanding payments");
                    return;
                }
               
                console.log(resdata);
                setOutstandingamount(resdata);
                
    
            } catch(error) {
                setErrorMessage(error.message);
            }
        };
        fetchoutstandingPayments();
       
    }, [paymentId, housenumber,HouseIdQR]);

    const handleChange = (e) => {
        const { value } = e.target;
        setOutstandingamount(value); // Update the outstanding amount state
    };

    return (
        <div className="p-3 rounded-lg m-2 overflow-x-auto bg-transparent shadow-xl flex flex-row justify-center ">
            <img src={imgsrc1} alt="logo" width='500' />
            <div className="container w-[20%]">
                <div className="flex-col mt-20 justify-center">
                    <h1 className="flex justify-center text-center text-3xl mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">Payment Summary</h1>
                    <div className="flex p-3 w-[100%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
                        <form className="flex flex-col gap-4 w-full justify-center m-4">
                            <div>
                                <Label value="User Name" />
                                <TextInput type="text" placeholder="UserName" id="UserName" value={username} />
                            </div>
                            <div>
                                <Label value="HouseNumber" />
                                <TextInput type="text" placeholder="HouseNumber" id="ownerhousenumber" value={housenumber || HouseIdQR } />
                            </div>
                            <div>
                                <Label value="Paymentprofile" />
                                <TextInput type="text" placeholder="Paymentprofile" id="Paymentprofile" value={paymentId || PaymentIdQR} />
                                

                            </div>
                            <div>
                                <Label value="Outstanding Amount" />
                                <TextInput type="text" placeholder="Outstanding Amount" id="Outstanding_Amount" value={outstandingamount ? outstandingamount.OutstandingAmount : ''}  onChange={handleChange}/>
                            </div>
                            <Button type="submit" gradientDuoTone='purpleToBlue' disabled={loading}>
                                {loading ? 'Submitting...' : 'PayNow'}
                            </Button>
                        </form>
                        {errorMessage && (
                            <Alert className="mt-7 py-3 bg-gradient-to-r from-red-100 via-red-300 to-red-400 shadow-shadowOne text-center text-red-600 text-base tracking-wide animate-bounce">{errorMessage}</Alert>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayNowpage_03;
