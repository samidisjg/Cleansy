import React from "react";
import * as XLSX from "xlsx";
import { useState } from "react";
import {
  Alert,
  Button,
  Checkbox,
  Label,
  TextInput,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "flowbite-react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AdminDuePayments_03 from "./../../components/IT22602978_Components/AdminPaymentsComponents_03/AdminDuePayments_03";
import AdminAddPayments_03 from "./../../components/IT22602978_Components/AdminPaymentsComponents_03/AdminAddPayments_03";
import { useNavigate } from "react-router-dom";

import FinalAdminPaymentspage from "./FinalAdminPayments_03";

const AdminPayments_03 = () => {
  const [Addpaymentdata, setAddpaymentData] = useState({
    PaymentID: "",
    UserID: "",
    HouseID: "",
    paidAmount: "",
    PaymentDate: "",
    PaymentStatus: "",
    PaymentMethod: "",
  });
  const [Duepaymentdata, setDuepaymentData] = useState({
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

  const {
    PaymentID,
    UserID,
    HouseID,
    Amount,
    PaymentDate,
    PaymentStatus,
    PaymentMethod,
  } = Addpaymentdata;
  const { BillID, Billperiod, BillStatus } = Duepaymentdata;
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAddPayments, setShowAddPayments] = useState(false);
  const [showDuePayments, setShowDuePayments] = useState(false);
  const navigate = useNavigate();


  //handle the add payments

  //handle the add payments file upload function
  const handleFileAddPaymentsUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (evt) => {
      const data = evt.target.result;
      const workBook = XLSX.read(data, { type: "binary" });
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      const fileData = XLSX.utils.sheet_to_json(workSheet);

      const modifiedData = fileData.map((row) => {
        const modifiedRow = {
          PaymentID: row["PaymentID"] || "N/A",
          UserID: row["UserID"] || "N/A",
          HouseID: row["HouseID"] || "N/A",
          paidAmount: row["paidAmount"] || "N/A",
          PaymentDate: row["PaymentDate"] || "N/A",
          PaymentStatus: row["PaymentStatus"] || "N/A",
          PaymentMethod: row["PaymentMethod"] || "N/A",
        };
        return modifiedRow;
      });

      setAddpaymentData(modifiedData);
    };
  };

  //handle the add payments submit function
  const handleAddpaymentsubmitdata = async (e) => {
    e.preventDefault();
    if (
      Addpaymentdata[0].PaymentID === "N/A" ||
      Addpaymentdata[0].UserID === "N/A" ||
      Addpaymentdata[0].HouseID === "N/A" ||
      Addpaymentdata[0].paidAmount === "N/A" ||
      Addpaymentdata[0].PaymentDate === "N/A" ||
      Addpaymentdata[0].PaymentStatus === "N/A" ||
      Addpaymentdata[0].PaymentMethod === "N/A"
    ) {
      setErrorMessage("Please fill all the fields");

      return;
    }
    if (Addpaymentdata.length === 0 || Duepaymentdata.length === 0) {
      setErrorMessage("Please fill all the fields");
      return;
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/AdminPaymentHandling/AdminAddPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Addpaymentdata),
      });
      const succcess = await res.json();
      setLoading(false);
      if (succcess.success === false) {
        setErrorMessage(Addpaymentdata.message);
      }
      if (res.status === 201) {
        navigate("/AdminFinal");
        console.log("Success", succcess);
        toast.success("Payment Profile Created successfully");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  //handle the due payments

  //handle the due payments file upload function
  const handleFileDuePaymentsUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (evt) => {
      const data = evt.target.result;
      const workBook = XLSX.read(data, { type: "binary" });
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      const fileData = XLSX.utils.sheet_to_json(workSheet);

      const modifiedData = fileData.map((row) => {
        const modifiedRow = {
          BillID: row["BillID"] || "N/A",
          UserID: row["UserID"] || "N/A",
          HouseID: row["HouseID"] || "N/A",
          dueAmount: row["dueAmount"] || "N/A",
          MaintenanceFee: row["MaintenanceFee"] || "N/A",
          PenaltyFee: row["PenaltyFee"] || "N/A",
          StartDate: row["StartDate"] || "N/A",
          EndDate: row["EndDate"] || "N/A",
          BillStatus: row["BillStatus"] || "N/A",
        };
        return modifiedRow;
      });

      setDuepaymentData(modifiedData);
    };
  };

  //handle the due payments submit function
  const handleDuepaymentsubmitdata = async (e) => {
    e.preventDefault();

    if (
      Duepaymentdata[0].BillID === "N/A" ||
      Duepaymentdata[0].UserID === "N/A" ||
      Duepaymentdata[0].HouseID === "N/A" ||
      Duepaymentdata[0].dueAmount === "N/A" ||
      Duepaymentdata[0].MaintenanceFee === "N/A" ||
      Duepaymentdata[0].PenaltyFee === "N/A" ||
      Duepaymentdata[0].StartDate === "N/A" ||
      Duepaymentdata[0].EndDate === "N/A" ||
      Duepaymentdata[0].BillStatus === "N/A"
    ) {
      setErrorMessage("Please fill all the fields");

      return;
    }
    if (Addpaymentdata.length === 0 || Duepaymentdata.length === 0) {
      setErrorMessage("Please fill all the fields");
      return;
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/AdminPaymentHandling/AdminDuePayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Duepaymentdata),
      });
      const success = await res.json();
      setLoading(false);
      if (success.success === false) {
        setErrorMessage(success.message);
      }
      if (res.status === 201) {
        navigate("/AdminFinal");
        console.log("Success", success);
        toast.success("Payment Profile Created successfully");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center w-[100%] ">
      <div className="flex  flex-row justify-between items-center bg-gradient-to-t from-slate-700 to-slate-300 m-4 rounded-lg overflow-hidden">
        <div className="  m-3">
          <h1 className="font-bold text-xl text-black">
            For Acess the Payments Using Excel Sheets
          </h1>
        </div>
        <div className="flex flex-row p-2">
          <Button
            className=" bg-red-700 m-3"
            onClick={() => setShowModal3(true)}
          >
            Add Payments
          </Button>
          <Button
            className=" bg-blue-800 m-3 "
            onClick={() => setShowModal4(true)}
          >
            Due Payments
          </Button>
        </div>
      </div>

      <Modal
        size={"5xl"}
        show={showModal3}
        onClose={() => setShowModal3(false)}
      >
        <ModalHeader className="bg-slate-300 ">
          <h1>Add Payments </h1>
        </ModalHeader>
        <ModalBody>
          <div>
            <input
              type="file"
              className="rounded-xl my-1 bg-slate-500"
              accept=".xlsx, .xls"
              onChange={handleFileAddPaymentsUpload}
            />
          </div>
          <div className=" my-3">
            {Addpaymentdata.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th className="bg-slate-300  px-3   text-center ">
                      PaymentID
                    </th>

                    <th className="bg-slate-300 px-3    text-center">UserID</th>

                    <th className="bg-slate-300 px-3   text-center">HouseID</th>

                    <th className="bg-slate-300 px-3   text-center">Amount</th>

                    <th className="bg-slate-300 px-3  text-center">
                      PaymentDate
                    </th>

                    <th className="bg-slate-300 px-3   text-center">
                      PaymentStatus
                    </th>

                    <th className="bg-slate-300 px-3  text-center">
                      PaymentMethod
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Addpaymentdata.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="text-center font-bold text-red-700 ">
                        {row["PaymentID"]}
                      </td>
                      <td className="text-center font-bold text-red-800">
                        {row["UserID"]}
                      </td>
                      <td className="text-center font-bold text-red-900">
                        {row["HouseID"]}
                      </td>
                      <td className="text-center">{row["paidAmount"]}</td>
                      <td className="text-center">{row["PaymentDate"]}</td>
                      <td className="text-center">{row["PaymentStatus"]}</td>
                      <td className="text-center">{row["PaymentMethod"]}</td>
                    </tr>
                  ))}
                  {Addpaymentdata.length === 0 && (
                    <tr>
                      <td colSpan={4}>No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <div>
            <Button className="bg-red-700" onClick={handleAddpaymentsubmitdata}>
              Upload
            </Button>
          </div>
          <div>
            {errorMessage && (
              <Alert color="red" className="m-3">
                {errorMessage}
              </Alert>
            )}
          </div>
        </ModalFooter>
      </Modal>

      <div>
        <Modal size={"5xl"} show={showModal4} onClose={() => setShowModal4(false)}>
          <ModalHeader className="bg-slate-300 ">
            <h1>Due Payments </h1>
          </ModalHeader >
          <ModalBody>
            <div >
              <input
                type="file"
                className="rounded-xl my-1 bg-slate-500"
                accept=".xlsx, .xls"
                onChange={handleFileDuePaymentsUpload}
              />
            </div>
            <div className=" my-3">
              {Duepaymentdata.length > 0 && (
                <table>
                  <thead>
                    <tr>
                      <th className="bg-slate-300  px-3   text-center ">BillID</th>
                      <th className="bg-slate-300  px-3   text-center ">UserID</th>
                      <th className="bg-slate-300  px-3   text-center "> HouseID</th>
                      <th className="bg-slate-300  px-3   text-center ">Amount</th>
                      <th className="bg-slate-300  px-3   text-center ">MaintenanceFee</th>
                      <th className="bg-slate-300  px-3   text-center ">PenaltyFee</th>
                      <th className="bg-slate-300  px-3   text-center ">Start Date</th>
                      <th className="bg-slate-300  px-3   text-center ">End Date</th>
                      <th className="bg-slate-300  px-3   text-center ">BillStatus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Duepaymentdata.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        <td className="text-center font-bold text-red-700 ">{row["BillID"]}</td>
                        <td className="text-center font-bold text-red-800">{row["UserID"]}</td>
                        <td className="text-center font-bold text-red-900">{row["HouseID"]}</td>
                        <td className="text-center">{row["dueAmount"]}</td>
                        <td className="text-center">{row["MaintenanceFee"]}</td>
                        <td className="text-center">{row["PenaltyFee"]}</td>
                        <td className="text-center">{row["StartDate"]}</td>
                        <td className="text-center">{row["EndDate"]}</td>
                        <td className="text-center">{row["BillStatus"]}</td>
                      </tr>
                    ))}
                    {Duepaymentdata.length === 0 && (
                      <tr>
                        <td colSpan={4}>No data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
           
          </ModalBody>
          <ModalFooter>
          <div>
              <Button className="bg-blue-700" onClick={handleDuepaymentsubmitdata}>Upload</Button>
            </div>
            <div>
              {errorMessage && (
                <Alert color="red" className="m-3">
                  {errorMessage}
                </Alert>
              )}
            </div>

          </ModalFooter>
        </Modal>
      </div>
      <div className="flex  flex-col justify-between items-center bg-gradient-to-t from-slate-700 to-slate-300 m-4 rounded-lg overflow-hidden">
        <div className="px-80 py-5">
          <h1 className="font-bold text-xl text-black">
            For Accessing the Payments using Form
          </h1>
        </div>
        <div className="flex flex-row p-2">
          <input
            type="radio"
            id="addPayments"
            name="paymentType"
            className="hidden"
            onClick={() => {
              setShowAddPayments(true);
              setShowDuePayments(false);
            }}
            checked={showAddPayments}
          />
          <label
            htmlFor="addPayments"
            className={`cursor-pointer  text-xl m-3  bg-slate-300 rounded-xl p-2 ${
              showAddPayments
                ? " font-bold text-xl underline  text-red-800"
                : "text-red-600 font-semibold"
            }`}
          >
            Add Payments
          </label>
          <input
            type="radio"
            id="duePayments"
            name="paymentType"
            className="hidden"
            onClick={() => {
              setShowDuePayments(true);
              setShowAddPayments(false);
            }}
            checked={showDuePayments}
          />
          <label
            htmlFor="duePayments"
            className={`cursor-pointer  text-xl m-3  bg-slate-300 rounded-xl p-2 ${
              showDuePayments
                ? "font-bold text-xl underline text-blue-800 "
                : "text-blue-600 font-semibold"
            }`}
          >
            Due Payments
          </label>
        </div>

        <div className="flex  flex-col justify-between items-center ">
          {showAddPayments && <AdminAddPayments_03 />}
          {showDuePayments && <AdminDuePayments_03 />}
        </div>
      </div>
    </div>
  );
};

export default AdminPayments_03;
