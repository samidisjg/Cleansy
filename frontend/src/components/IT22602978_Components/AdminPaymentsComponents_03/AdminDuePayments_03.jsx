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

const AdminDuePayments_03 = () => {
  const [DuepaymentdataForm, setDuepaymentDataForm] = useState({
    BillID: "",
    UserID: "",
    HouseID: "",
    dueAmount: "",
    MaintenanceFee: "",
    PenaltyFee: "",
    StartDate: "",
    EndDate: "",
    BillStatus: "",
  });
  const [errorMessageForm, setErrorMessageForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const updatedField = type === "checkbox" ? checked : value;
  
    // Perform specific validation for end date
    if (id === "EndDate") {
      const startDate = new Date(DuepaymentdataForm.StartDate);
      const endDate = new Date(value);
  
      // Check if end date is before start date
      if (endDate < startDate) {
        return setErrorMessageForm("End date cannot be before start date."); // Stop further execution
      } else {
        setErrorMessageForm(null); // Reset error message
      }
    }
  
    // Check for terms and conditions checkbox
    if (id === "agree") {
      if (!checked) {
        return setErrorMessageForm("Please agree to the terms and conditions.");
      } else {
        setErrorMessageForm(null); // Reset error message
        setAgreeTerms(true);
      }
    }
  
    setDuepaymentDataForm((prevData) => ({
      ...prevData,
      [id]: updatedField,
    }));
  };
  

  const handleDuepaymentsubmitdataForm = async (e) => {
    e.preventDefault();

    if (DuepaymentdataForm.HouseID.length !== 3 || isNaN(DuepaymentdataForm.HouseID)) {
      return setErrorMessageForm("House number should have 3 digits");
      
    }
    if (!agreeTerms) {
      return setErrorMessageForm("Please agree to the terms and conditions");
    }

    if (
      !DuepaymentdataForm.BillID ||
      !DuepaymentdataForm.UserID ||
      !DuepaymentdataForm.HouseID ||
      !DuepaymentdataForm.dueAmount ||
      !DuepaymentdataForm.MaintenanceFee ||
      !DuepaymentdataForm.PenaltyFee ||
      !DuepaymentdataForm.StartDate ||
      !DuepaymentdataForm.EndDate ||
      !DuepaymentdataForm.BillStatus
    ) {
      return setErrorMessageForm("Please fill out all the fields");
    }

    try {
      setLoading(true);
      setErrorMessageForm(null);
      const res = await fetch("/api/AdminPaymentHandling/AdminDuePayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DuepaymentdataForm),
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
    <div className="bg-slate-100 m-3 px-20 py-5 rounded-lg overflow-hidden ">
      <div className="flex-col h-screen mt-20 justify-center">
        <h1 className="flex justify-center text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-black">
          Add Due Payments
        </h1>
        <div className="flex p-3 w-[100%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
          <form
            className="flex flex-col gap-4 w-full justify-center "
            onSubmit={handleDuepaymentsubmitdataForm}
          >
            <div>
              <Label value="Bill ID" className="text-black dark:text-black" />
              <TextInput
                type="text"
                placeholder="PaymentProfileName"
                id="BillID"
                value={DuepaymentdataForm.BillID}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Username" className="text-black dark:text-black" />
              <TextInput
                type="text"
                placeholder="Username"
                id="UserID"
                value={DuepaymentdataForm.UserID}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label
                value="HouseNumber"
                className="text-black dark:text-black"
              />
              <TextInput
                type="text"
                placeholder="HouseNumber"
                id="HouseID"
                value={DuepaymentdataForm.HouseID}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="dueAmount" className="text-black dark:text-black" />
              <TextInput
                type="text"
                placeholder="dueAmount"
                id="dueAmount"
                value={DuepaymentdataForm.dueAmount}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Maintenance Fee" className="text-black dark:text-black" />
              <TextInput
                type="text"
                placeholder="Maintenance Fee"
                id="MaintenanceFee"
                value={DuepaymentdataForm.MaintenanceFee}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Penalty Fee" className="text-black dark:text-black" />
              <TextInput
                type="text"
                placeholder="Penalty Fee"
                id="PenaltyFee"
                value={DuepaymentdataForm.PenaltyFee}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label
                value="Bill Period"
                className="text-black dark:text-black"
              />
              <div className="flex flex-row items-center">
                <Label
                  value="From "
                  className="dark:text-black flex text-slate-700"
                />
                <TextInput
                  type="date"
                  className="mx-3 my-1 w-[100%]"
                  id="StartDate"
                  value={DuepaymentdataForm.StartDate}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-row items-center">
                <Label value="To" className="text-slate-700 dark:text-black" />
                <TextInput
                  type="date"
                  className="mx-7 w-[100%]"
                  id="EndDate"
                  value={DuepaymentdataForm.EndDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Label value="Bill Status " className="text-black dark:text-black" />
               <Select id="BillStatus" required onChange={handleChange} value={DuepaymentdataForm.BillStatus}>
                            <option value="N/A">Not Selected</option>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Unpaid</option>
                            <option value="Overdue">Overdue</option>       
                </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Checkbox id="agree" onChange={handleChange} />
              <Label
                htmlFor="agree"
                className="flex text-black dark:text-black"
              >
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
export default AdminDuePayments_03;
