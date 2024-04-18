import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { HiOutlineX } from "react-icons/hi";
import { set } from "mongoose";
import {
  Alert,
  Button,
  Checkbox,
  Label,
  TextInput,
  Modal,
  ModalBody,
} from "flowbite-react";

const FinalAdminPayments_03 = () => {
  const navigate = useNavigate();
  const [paymentsData, setPaymentsData] = useState([]);
  const [errorMessageForm, setErrorMessageForm] = useState(null);

  const calculateOutstandingAmount = (payment, previousOutstandingAmount) => {
    const paidAmount = parseFloat(payment.paidAmount || 0);
    const dueAmount = parseFloat(payment.dueAmount || 0);
    const newOutstandingAmount = dueAmount - paidAmount;
    return (
      parseFloat(previousOutstandingAmount) + newOutstandingAmount
    ).toFixed(2);
  };

  useEffect(() => {
    const fetchAdminPayments = async () => {
      try {
        setErrorMessageForm(false);
        const addPaymentsResponse = await fetch(
          `/api/AdminPaymentHandling/.AdminFinal`
        );
        const duePaymentsResponse = await fetch(
          `/api/AdminPaymentHandling/..AdminFinal`
        );
        const addPaymentsData = await addPaymentsResponse.json();
        const duePaymentsData = await duePaymentsResponse.json();

        if (
          addPaymentsData.success === false ||
          duePaymentsData.success === false
        ) {
          setErrorMessageForm("Failed to fetch payment data.");
          return;
        }

        // Combine add payments and due payments data into a single array
        const combinedData = [...addPaymentsData, ...duePaymentsData];

        // Sort the combined array by House ID and created date
        combinedData.sort((a, b) => {
          if (a.HouseID !== b.HouseID) {
            return a.HouseID.localeCompare(b.HouseID);
          } else {
            return (
              new Date(a.createdAt) -
              new Date(b.createdAt)
            );
          }
        });

        // Calculate outstanding amounts
        let previousOutstandingAmount = 0;
        const updatedPaymentsData = combinedData.map((payment, index) => {
          if (
            index > 0 &&
            payment.HouseID === combinedData[index - 1].HouseID
          ) {
            payment.OutstandingAmount = calculateOutstandingAmount(
              payment,
              previousOutstandingAmount
            );
          } else {
            payment.OutstandingAmount = calculateOutstandingAmount(payment, 0);
          }
          previousOutstandingAmount = payment.OutstandingAmount;
          return payment;
        });
        console.log(updatedPaymentsData);

        setPaymentsData(updatedPaymentsData);
      } catch (error) {
        setErrorMessageForm("Failed to fetch payment data: " + error.message);
      }
    };

    fetchAdminPayments();
  }, []);

  const handlefinalpaymentsubmitdata = async (e) => {
    e.preventDefault();
      // Remove duplicate entries based on PaymentID
  const uniquePaymentsData = Array.from(
    new Set(paymentsData.map((p) => p._id))
  ).map((_id) => paymentsData.find((p) => p._id === _id));

  // Check if the length of uniquePaymentsData is different from paymentsData
  if (uniquePaymentsData.length !== paymentsData.length) {
    setErrorMessageForm(
      "Duplicate payments detected. Please review your entries."
    );
    // Filter out duplicate payments and continue processing
    const filteredPaymentsData = paymentsData.filter(
      (payment, index, self) =>
        index === self.findIndex((p) => p._id === payment._id)
    );
    setPaymentsData(filteredPaymentsData);
    return;
  }
    if (
      paymentsData[0].PaymentID === "N/A" ||
      paymentsData[0].UserID === "N/A" ||
      paymentsData[0].HouseID === "N/A" ||
      paymentsData[0].paidAmount === "N/A" ||
      paymentsData[0].PaymentDate === "N/A" ||
      paymentsData[0].PaymentStatus === "N/A" ||
      paymentsData[0].PaymentMethod === "N/A" ||
      paymentsData[0].BillID === "N/A" ||
      paymentsData[0].StartDate === "N/A" ||
      paymentsData[0].EndDate === "N/A" ||
      paymentsData[0].BillStatus === "N/A" ||
      paymentsData[0].MaintenanceFee === "N/A" ||
      paymentsData[0].PenaltyFee === "N/A" ||
      paymentsData[0].dueAmount === "N/A" ||
      paymentsData[0].OutstandingAmount === "N/A" ||
      paymentsData[0].createdAt === "N/A" ||
      paymentsData[0].updatedAt === "N/A" ||
      paymentsData[0]._id === "N/A"
    ) {
      setErrorMessageForm("Please fill all the fields");

      return;
    }
    if (paymentsData.length === 0) {
      setErrorMessageForm("Please fill all the fields");
      return;
    }
    try {
      setErrorMessageForm(null);
      const res = await fetch("/api/AdminPaymentHandling/Finalize", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentsData),
      });
      const succcess = await res.json();

      if (succcess.success === false) {
        setErrorMessageForm(error.message);
      }
      if (res.status === 201) {
        navigate("/AdminFinal");
        console.log("Success", succcess);
        toast.success("Payment Profile Created successfully");
      }
    } catch (error) {
      setErrorMessageForm(error.message);
    }
  };

  let previousHouseID = null;
  return (
    <div>
      <div className="flex justify-center" style={{ minHeight: "80vh" }}>
        {/* Display the sorted payments data */}
        <table className="bg-gray-200 rounded-md m-4 shadow-2xl">
          <thead
            className="bg-white rounded-md "
            style={{ position: "sticky", top: 60, zIndex: 2 }}
          >
            <tr>
              <th className="p-3 ">Date created</th>
              <th className="p-3">Payment ID</th>
              <th className="p-3">User ID</th>
              <th className="p-3">Payment Date</th>
              <th className="p-3">Payment Status</th>
              <th className="p-3">Payment Method</th>
              <th className="p-3">Bill ID</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">End Date</th>
              <th className="p-3">Bill Status</th>
              <th className="p-3">Maintenance Fee</th>
              <th className="p-3">Penalty Fee</th>
              <th className="p-3">paid Amount</th>
              <th className="p-3">Due Amount</th>
              <th className="p-3">Outstanding Amount</th>
            </tr>
          </thead>
          <tbody>
            {paymentsData.map((payment, index) => {
              // Check if the current House ID is different from the previous one
              const isNewWindow = previousHouseID !== payment.HouseID;
              previousHouseID = payment.HouseID; // Update previous House ID

              return (
                <React.Fragment key={index}>
                  {isNewWindow && (
                    <tr className="bg-black rounded-lg shadow-xl">
                      <td
                        colSpan="15"
                        className="font-bold text-2xl text-white p-3"
                      >
                        House ID: {payment.HouseID}
                      </td>
                    </tr>
                  )}
                  <tr key={index}>
                    <td className="p-3 text-center">
                      {new Date(payment.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3 text-center">{payment.PaymentID}</td>
                    <td className="p-3 text-center">{payment.UserID}</td>
                    <td className="p-3 text-center">{payment.PaymentDate}</td>
                    <td className="p-3 text-center">{payment.PaymentStatus}</td>
                    <td className="p-3 text-center">{payment.PaymentMethod}</td>
                    <td className="p-3 text-center">{payment.BillID}</td>
                    <td className="p-3 text-center">{payment.StartDate}</td>
                    <td className="p-3 text-center">{payment.EndDate}</td>
                    <td className="p-3 text-center">{payment.BillStatus}</td>
                    <td className="p-3 text-center">
                      {payment.MaintenanceFee}
                    </td>
                    <td className="p-3 text-center">{payment.PenaltyFee}</td>
                    <td className="p-3 text-center">
                      {payment.paidAmount || 0}
                    </td>
                    <td className="p-3 text-center">
                      {payment.dueAmount || 0}
                    </td>
                    <td className="p-3 text-center">
                      {payment.OutstandingAmount || 0}
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        {errorMessageForm && <Alert type="danger">{errorMessageForm}</Alert>}
      </div>
      <div className="flex flex-col m-4 p-3">
        <Button
          className="flex float-end bg-red-800"
          style={{ position: "sticky", top: 60, zIndex: 2 }}
          onClick={handlefinalpaymentsubmitdata}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FinalAdminPayments_03;
