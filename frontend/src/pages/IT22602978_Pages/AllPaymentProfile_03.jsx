import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Checkbox,
  Label,
  TextInput,
  Modal,
  ModalBody,
} from "flowbite-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { HiOutlineX ,HiDownload ,HiQrcode } from "react-icons/hi";
import PayNowpage_03 from './PayNowpage_03';
import QRCode from "qrcode";

const AllPaymentProfiles_03 = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [paymentProfiles, setPaymentProfiles] = useState([]);
  const [paymentsError, setPaymentsError] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState([]); // State to hold selected payment data
  const [showPayNowPage, setShowPayNowPage] = useState(false); // State to control visibility of PayNow page
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [selectHouseNumber, setSelectHouseNumber] = useState(null);
  const [PaymentProfileNameQR,setPaymentProfileNameQR] = useState(null);
  const [HouseNumberQr,setHouseNumberQr] = useState(null);
  const [text, setText] = useState("");
  
 
 
  const { setShow,PaymentId, HouseId } = useParams();
  useEffect(() => {
    const fetchPaymentProfiles = async () => {
      try {
        setPaymentsError(false);
        const res = await fetch(
          `/api/PaymentProfileCreation/getpayments/${currentUser.username}`
        );
        const resdata = await res.json();
        if (resdata.success === false) {
          setPaymentsError(true);
          return;
        }
        setPaymentProfiles(resdata);
      } catch (error) {
        setPaymentsError(true);
      }
    };
    fetchPaymentProfiles();
  }, [currentUser.username]);

  // Function to fetch data for the selected payment profile
  const fetchPaymentData = async (paymentId) => {
    try {
      const res = await fetch(
        `/api/PaymentProfileCreation/getpayment/${paymentId}`
      );
      const data = await res.json();
      setSelectedPayment(data);
      setShowModal1(true); // Show the modal once data is fetched
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };
 

  //function for delete payment profile
  const DeletePaymentProfile = async (paymentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this request?"
    );
    if (!confirmDelete) {
      return; // If user cancels deletion, exit function
    }

    try {
      const res = await fetch(
        `/api/PaymentProfileCreation/deletepaymentprofile/${paymentId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (data.success === true) {
        setSelectedPayment((prevList) =>
          prevList.filter((request) => request._id !== paymentId)
        );
        setShowModal1(false);
        toast.success("Payment Profile Deleted Successfully");
        window.location.reload();
        window.location.href = "/dashboard?tab=userpayments";
      } else {
        throw new Error("Failed to delete payment profile");
      }
    } catch (error) {
      console.error("Error deleting payment profile:", error);
      toast.error("Failed to delete payment profile");
    }
  };

 
 // Function to handle "Pay Now" button click
 const handlePayNowClick = (paymentId,housenumber) => {
  setSelectedPaymentId(paymentId);
  setSelectHouseNumber(housenumber); // Set the selected payment ID
  setShowPayNowPage(true); // Show the PayNow page
 
};


const generateQRCode = async () => {
  try {
    const response = await QRCode.toDataURL(text);
    const downloadLink = document.createElement("a");
    downloadLink.href = response;
    downloadLink.download = `${PaymentProfileNameQR}.${HouseNumberQr}.png`; 
    downloadLink.click();
    URL.revokeObjectURL(response);
    setText("");
  } catch (error) {
    console.log("Error in generating QR code: ", error);
  }
};
useEffect(() => {
  if (selectedPayment && selectedPayment.length > 0) {
    setText(currentUser.email + ","+selectedPayment[0].PaymentProfileName +","+ selectedPayment[0].ownerhousenumber);
    setPaymentProfileNameQR(selectedPayment[0].PaymentProfileName);
    setHouseNumberQr(selectedPayment[0].ownerhousenumber);
  }
}, [currentUser.email, selectedPayment]);



  return (
    <div>
      <h1 className="text-3xl font-bold text-center m-5">Payment Profiles</h1>
      <div className=" p-3 rounded-lg m-4  overflow-x-auto bg-transparent shadow-xl">
        <div className=" px-3 mt-6 mx-auto flex flex-row ">
          {paymentProfiles && paymentProfiles.length > 0 ? (
            paymentProfiles.map((payment) => (
              <div key={payment._id}>
                <div className="flex flex-row overflow-x-auto">
                 
                    <div className="mx-5 grid place-content-center">
                    <Link onClick={() => fetchPaymentData(payment._id)}>
                      <div className="bg-gradient-to-r from-orange-400 to-indigo-900 rounded-2xl text-white p-8 text-center h-60 max-w-sm mx-auto">
                        <h1 className="text-3xl m-2 font-bold">Hi </h1>
                        <h1 className="text-2xl m-2 font-semibold text-white font-courier">
                          {payment.ownerUsername}
                        </h1>
                      </div>
                      </Link>
                      <div className="bg-white py-4 px-6 text-center rounded-md shadow-lg transform -translate-y-20 sm:-translate-y-24 max-w-xs mx-auto">
                      <Link onClick={() => fetchPaymentData(payment._id)}>
                        <h2 className="font-semibold text-2xl mb-6 text-black h-10">
                          {payment.PaymentProfileName || "-"}
                        </h2>
                        </Link>
                        <button className="rounded-md bg-gradient-to-r from-blue-400 to-indigo-900 text-xl text-white pt-3 pb-4 px-8 " onClick={() => handlePayNowClick(payment.PaymentProfileName,payment.ownerhousenumber)}>
                          Pay Now
                        </button>
                      </div>
                    </div>
                  
                  
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center w-screen py-40">
            <div className="text-center">
              <h1>No payment profiles found</h1>
            </div>
          </div>
          
          )}
        </div>
        {/* Modal to display payment data */}
        <Modal
          className="bg-blue-900 bg-opacity-40"
          show={showModal1}
          onClose={() => setShowModal1(false)}
        >
          <div className="p-4 justify-center rounded-xl space-x-6 shadow-xl hover:rounded-2xl">
            <div className=" flex flex-row justify-end">
              <Button
                className="flex float-right m-2 content-size-m bg-blue-700"
                onClick={() => generateQRCode()}
              >
                <HiQrcode className="h-5 w-5" />
              </Button>
              <Button
                className=" flex float-right m-2 content-size-m bg-black"
                onClick={() => setShowModal1(false)}
              >
                <HiOutlineX className="h-5 w-5" />
              </Button>
            </div>
            <ModalBody>
            
              {selectedPayment &&
                selectedPayment.map((selectpayment) => (
                  <div key={selectpayment._id}>
                    
                    <div className="m-3 flex items-center flex-col justify-center">
                      {/* Render payment data here */}
                      <p className="text-2xl font-bold pb-12">
                        {selectpayment.PaymentProfileName}
                      </p>
                      <p className="text-lg font-semibold">House Number </p>
                      <p className="text-xl">
                        {" "}
                        {selectpayment.ownerhousenumber}
                      </p>
                      <p className="text-lg font-semibold"> Username: </p>
                      <p className="text-xl"> {selectpayment.ownerUsername}</p>
                      {console.log(selectpayment._id)}
                    </div>
                    <div className="flex flex-row justify-center pt-3">
                      <Link to={`/update-paymentprofile/${selectpayment._id}`}>
                        <Button className="m-3">Update</Button>
                      </Link>
                      <Button
                        className="bg-red-500 m-3"
                        onClick={() => DeletePaymentProfile(selectpayment._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
            </ModalBody>
          </div>
        </Modal>
      </div>
      {showPayNowPage && <PayNowpage_03 paymentId={selectedPaymentId} housenumber={selectHouseNumber}/>}
      {setShow && <PayNowpage_03 paymentId={PaymentId} housenumber={HouseId}/>}
      {console.log("pID",PaymentId,"hID",HouseId)},
      {/*65f7f008c80351f5eb2c5f25*/}
    </div>
  );
};

export default AllPaymentProfiles_03;
