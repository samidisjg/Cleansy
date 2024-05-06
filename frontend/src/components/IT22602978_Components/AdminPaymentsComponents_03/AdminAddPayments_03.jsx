import React from "react";
import * as XLSX from "xlsx";
import { useState } from "react";
import {
  Alert,
  Button,
  Checkbox,
  Label,
  TextInput,
  Select,
  Modal,
  ModalBody,
  ModalHeader,
} from "flowbite-react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminAddPayments_03 = () => {
  const [AddpaymentdataForm, setAddpaymentdataForm] = useState({
    PaymentID: "",
    UserID: "",
    HouseID: "",
    paidAmount: "",
    PaymentDate: "",
    PaymentStatus: "",
    PaymentMethod: "",
  });

  const [errorMessageForm, setErrorMessageForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    // Set the state based on the input field's id
    if (id === "PaymentID") {
      setAddpaymentdataForm((prevData) => ({
        ...prevData,
        PaymentID: type === "checkbox" ? checked : value,
      }));
    } else if (id === "UserID") {
      setAddpaymentdataForm((prevData) => ({
        ...prevData,
        UserID: type === "checkbox" ? checked : value,
      }));
    } else if (id === "HouseID") {
      setAddpaymentdataForm((prevData) => ({
        ...prevData,
        HouseID: type === "checkbox" ? checked : value,
      }));
    } else if (id === "paidAmount") {
      setAddpaymentdataForm((prevData) => ({
        ...prevData,
        paidAmount: type === "checkbox" ? checked : value,
      }));
    } else if (id === "PaymentDate") {
      setAddpaymentdataForm((prevData) => ({
        ...prevData,
        PaymentDate: type === "checkbox" ? checked : value,
      }));
    } else if (id === "PaymentStatus") {
      setAddpaymentdataForm((prevData) => ({
        ...prevData,
        PaymentStatus: type === "checkbox" ? checked : value,
      }));
    } else if (id === "PaymentMethod") {
      setAddpaymentdataForm((prevData) => ({
        ...prevData,
        PaymentMethod: type === "checkbox" ? checked : value,
      }));
    } else if (id === "agree") {
      setAgreeTerms(checked);
    }
  };

  const handleAddpaymentsubmitdataForm = async (e) => {
    e.preventDefault();
    if (AddpaymentdataForm.HouseID.length !== 3 || isNaN(AddpaymentdataForm.HouseID)) {
      return setErrorMessageForm("House number should have 3 digits");
    }
    if (!agreeTerms) {
      return setErrorMessageForm("Please agree to the terms and conditions");
    }

    if (
      !AddpaymentdataForm.PaymentID ||
      !AddpaymentdataForm.UserID ||
      !AddpaymentdataForm.HouseID ||
      !AddpaymentdataForm.paidAmount ||
      !AddpaymentdataForm.PaymentDate ||
      !AddpaymentdataForm.PaymentStatus ||
      !AddpaymentdataForm.PaymentMethod
    ) {
      return setErrorMessageForm("Please fill out all the fields");
    }

    try {
      setLoading(true);
      setErrorMessageForm(null);
      const res = await fetch("/api/AdminPaymentHandling/AdminAddPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(AddpaymentdataForm),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setErrorMessageForm(data.message);
      }
      if (res.status === 201) {
        navigate("/AdminFinal");
        toast.success("Due Payments added successfully");
      }
    } catch (error) {
      setErrorMessageForm(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 m-3 px-20 py-5 rounded-lg overflow-hidden">
      <div className="flex-col h-screen mt-20 justify-center">
        <h1 className="flex justify-center text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-black">
          Add Payments
        </h1>
        <div className="flex p-3 w-[100%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
          <form
            className="flex flex-col gap-4 w-full justify-center"
            onSubmit={handleAddpaymentsubmitdataForm}
          >
            <div>
              <Label value="Payment ID" className="text-black dark:text-black" />
              <TextInput
                type="text"
                placeholder="PaymentProfileName"
                id="PaymentID"
                value={AddpaymentdataForm.PaymentID}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Username" className="text-black dark:text-black" />
              <TextInput
                type="text"
                placeholder="Username"
                id="UserID"
                value={AddpaymentdataForm.UserID}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="NIC" className="text-black dark:text-black" />
              <TextInput
                type="text"
                placeholder="NIC"
                id="NIC"
                value={AddpaymentdataForm.NIC}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="HouseNumber" className="text-black dark:text-black" />
              <TextInput
                type="text"
                placeholder="HouseNumber"
                id="HouseID"
                value={AddpaymentdataForm.HouseID}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="paidAmount" className="text-black dark:text-black" />
              <TextInput
                type="text"
                placeholder="paidAmount"
                id="paidAmount"
                value={AddpaymentdataForm.paidAmount}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Payment Date" className="text-black dark:text-black" />
              <TextInput
                type="date"
                placeholder="HouseNumber"
                id="PaymentDate"
                value={AddpaymentdataForm.PaymentDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Payment Status" className="text-black dark:text-black" />
               <Select id="PaymentStatus" required onChange={handleChange} value={AddpaymentdataForm.PaymentStatus}>
                            <option value="N/A">Not Selected</option>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>          
                </Select>
            </div>
            <div>
              <Label value="Payment Method "className="text-black dark:text-black" />
             <Select id="PaymentMethod" required onChange={handleChange} value={AddpaymentdataForm.PaymentMethod}>
                            <option value="N/A">Not Selected</option>
                            <option value="Cash">Cash</option>
                            <option value="Card">Card</option>
                            <option value="Online">Online</option>        
                </Select>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="agree" onChange={handleChange} />
              <Label htmlFor="agree" className="flex text-black dark:text-black">
                I agree with the&nbsp;
                <Link
                  to="#"
                  className="text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  terms and conditions
                </Link>
              </Label>
            </div>
            <Button
              type="submit"
              gradientDuoTone="purpleToBlue"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
          {errorMessageForm && (
            <Alert className="mt-7 py-3 bg-gradient-to-r from-red-100 via-red-300 to-red-400 shadow-shadowOne text-center text-red-600 text-base tracking-wide animate-bounce">
              {errorMessageForm}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminAddPayments_03;
