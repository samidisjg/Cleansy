import React, { useEffect, useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const FinalAdminAllPayments_03 = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [finalpaymentdata, setFinalPaymentData] = useState([]);
  const [selectedHouseID, setSelectedHouseID] = useState("");
  const [filteredPayments, setFilteredPayments] = useState([]);

  useEffect(() => {
    fetchAdminAllPayments();
  }, []);

  const fetchAdminAllPayments = async () => {
    try {
      setErrorMessage(null);
      const finalpaymentresponse = await fetch(
        `/api/AdminPaymentHandling/AdminFinalPayments`
      );
      const finalpaymentdata = await finalpaymentresponse.json();

      if (finalpaymentdata.success === false) {
        setErrorMessage("Failed to fetch payment data.");
        return;
      }

      finalpaymentdata.sort((a, b) => {
        if (a.HouseID !== b.HouseID) {
          return a.HouseID.localeCompare(b.HouseID);
        } else {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
      });
      setFinalPaymentData(finalpaymentdata);
    } catch (error) {
      setErrorMessage("Failed to fetch payment data: " + error.message);
      console.error("Error fetching payment data:", error);
    }
  };

  const handleHouseIDChange = (e) => {
    const value = e.target.value;
    setSelectedHouseID(value);

    // Filter payments as the user types
    let filtered = [];
    if (value && value !== "0") {
      filtered = finalpaymentdata.filter(
        (payment) => payment.HouseID === value
      );
    } else {
      filtered = [];
    }
    setFilteredPayments(filtered);
  };

  return (
    <div>
      <div className="flex flex-row justify-center">
        <TextInput
          type="text"
          value={selectedHouseID}
          placeholder="Search With House ID"
          onChange={handleHouseIDChange}
          className="m-2 justify-center"
        />
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button bg-black text-white p-2 rounded-lg m-2 justify-center"
          table="payments-table"
          filename={
            selectedHouseID.length > 0
              ? `Cleansy_House_No${selectedHouseID}`
              : `Cleansy_House_AllPayments`
          }
          sheet="payments"
          buttonText={
            selectedHouseID.length > 0
              ? `Cleansy_House_No${selectedHouseID} As Excel`
              : ` All Payments As Excel`
          }
        />
      </div>

      {filteredPayments.length > 0 ? (
        <div className="w[100%] bg-gray-300 p-2 shadow-2xl rounded-lg m-2">
          <div className="flex justify-center bg-black text-white p-2 rounded-xl">
            <h2>House ID: {selectedHouseID}</h2>
          </div>
          <table id="payments-table">
          <thead className="bg-gray-400 ">
                  <tr className="rounded-xl m-1">
                    <th className="text-black p-1">Payment ID</th>
                    <th className="text-black p-1">User ID</th>
                    <th className="text-black p-1">Payment Date</th>
                    <th className="text-black p-1">Payment Status</th>
                    <th className="text-black p-1">Payment Method</th>
                    <th className="text-black p-1">Created Date</th>
                    <th className="text-black p-1">Bill ID</th>
                   
                      <th className="text-black p-2">Start Date</th>
                      <th className="text-black p-2">End Date</th>
                    
                    <th className="text-black p-1">Maintenance Fee</th>
                    <th className="text-black p-1">Penalty Fee</th>
                    <th className="text-black p-1">Bill Status</th>
                    <th className="text-black p-1">Paid Amount</th>
                    <th className="text-black p-1">Due Amount</th>
                    <th className="text-black p-1">Outstanding Amount</th>
                  </tr>
                </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.PaymentID}>
                  <td className="text-black p-1 text-lg text-center ">
                      {payment.PaymentID || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.UserID || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.PaymentDate || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.PaymentStatus || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.PaymentMethod || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {new Date(payment.createdAt).toLocaleString() || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.BillID || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.StartDate || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.EndDate || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.MaintenanceFee || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.PenaltyFee || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.BillStatus || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.paidAmount || 0}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">{payment.dueAmount || 0}</td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.OutstandingAmount || 0}
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : filteredPayments.length === 0 && selectedHouseID.length > 0 ? (
        <p>No payments available for House ID: {selectedHouseID}</p>
      ) : finalpaymentdata.length > 0 ? (
        <div className="w[100%] bg-gray-300 p-2 shadow-2xl rounded-lg m-2">
          {finalpaymentdata.map((payment, index) => (
            <div key={payment.PaymentID}>
              {index === 0 ||
              payment.HouseID !== finalpaymentdata[index - 1].HouseID ? (
                <div className="flex justify-center bg-black text-white p-3 rounded-lg">
                  <h2 className="text-xl font-bold">House ID: {payment.HouseID}</h2>
                </div>
              ) : null}
              <table className="w-full ">
                <thead className="bg-gray-400 ">
                  <tr className="rounded-xl m-1">
                    <th className="text-black p-1">Payment ID</th>
                    <th className="text-black p-1">User ID</th>
                    <th className="text-black p-1">Payment Date</th>
                    <th className="text-black p-1">Payment Status</th>
                    <th className="text-black p-1">Payment Method</th>
                    <th className="text-black p-1">Created Date</th>
                    <th className="text-black p-1">Bill ID</th>
                    <th className="text-black" colSpan={2}>
                      Bill Period
                      <th className="text-black p-2">Start Date</th>
                      <th className="text-black p-2">End Date</th>
                    </th>
                    <th className="text-black p-1">Maintenance Fee</th>
                    <th className="text-black p-1">Penalty Fee</th>
                    <th className="text-black p-1">Bill Status</th>
                    <th className="text-black p-1">Paid Amount</th>
                    <th className="text-black p-1">Due Amount</th>
                    <th className="text-black p-1">Outstanding Amount</th>
                  </tr>
                </thead>

                <tbody className="bg-white ">
                  <tr key={payment.PaymentID}>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.PaymentID || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.UserID || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.PaymentDate || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.PaymentStatus || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.PaymentMethod || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {new Date(payment.createdAt).toLocaleString() || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.BillID || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.StartDate || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.EndDate || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.MaintenanceFee || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.PenaltyFee || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.BillStatus || "-"}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.paidAmount || 0}
                    </td>
                    <td className="text-black p-1 text-lg text-center ">{payment.dueAmount || 0}</td>
                    <td className="text-black p-1 text-lg text-center ">
                      {payment.OutstandingAmount || 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
          <table id="payments-table" className="hidden">
          <thead >
                  <tr >
                    <th>House ID</th>
                    <th >Payment ID</th>
                    <th >User ID</th>
                    <th>Payment Date</th>
                    <th >Payment Status</th>
                    <th >Payment Method</th>
                    <th >Created Date</th>
                    <th >Bill ID</th>
                   
                      <th >Start Date</th>
                      <th >End Date</th>
                    
                    <th >Maintenance Fee</th>
                    <th >Penalty Fee</th>
                    <th >Bill Status</th>
                    <th >Paid Amount</th>
                    <th >Due Amount</th>
                    <th >Outstanding Amount</th>
                  </tr>
                </thead>
            <tbody>
              {finalpaymentdata.map((payment) => (
                <tr key={payment.PaymentID}>
                  <td>{payment.HouseID}</td>
                  <td >
                      {payment.PaymentID || "N/A"}
                    </td>
                    <td >
                      {payment.UserID || "N/A"}
                    </td>
                    <td >
                      {payment.PaymentDate || "N/A"}
                    </td>
                    <td >
                      {payment.PaymentStatus || "N/A"}
                    </td>
                    <td >
                      {payment.PaymentMethod || "N/A"}
                    </td>
                    <td >
                      {new Date(payment.createdAt).toLocaleString() || "N/A"}
                    </td>
                    <td >
                      {payment.BillID || "N/A"}
                    </td>
                    <td >
                      {payment.StartDate || "N/A"}
                    </td>
                    <td >
                      {payment.EndDate || "N/A"}
                    </td>
                    <td>
                      {payment.MaintenanceFee || "N/A"}
                    </td>
                    <td >
                      {payment.PenaltyFee || "N/A"}
                    </td>
                    <td >
                      {payment.BillStatus || "N/A"}
                    </td>
                    <td >
                      {payment.paidAmount || 0}
                    </td>
                    <td >{payment.dueAmount || 0}</td>
                    <td >
                      {payment.OutstandingAmount || 0}
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No payments available</p>
      )}
    </div>
  );
};

export default FinalAdminAllPayments_03;
