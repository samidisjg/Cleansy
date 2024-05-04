import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AdminLeaveRequests_04 from "./AdminLeaveRequests_04";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Button } from "flowbite-react";

const AdminLeaveRequestHandle_04 = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLeaveRequests, setFilteredLeaveRequests] = useState([]);

  useEffect(() => {
    // Fetch leave requests from the server
    const fetchLeaveRequests = async () => {
      try {
        const res = await fetch("/api/StaffAdmin/get_04");
        if (res.ok) {
          const data = await res.json();
          setLeaveRequests(data);
        } else {
          toast.error("Failed to fetch leave requests");
        }
      } catch (error) {
        toast.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  useEffect(() => {
    // Filter leave requests based on the search query
    const filtered = leaveRequests.filter(
      (request) =>
        request.staffID.includes(searchQuery) ||
        request.leaveType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLeaveRequests(filtered);
  }, [searchQuery, leaveRequests]);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle accepting a leave request
  const handleAccept = async (requestId) => {
    try {
      const res = await fetch(`/api/StaffAdmin/${requestId}/accept`, {
        method: "PUT",
      });
      if (res.ok) {
        // Update leave request status in the UI
        setLeaveRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === requestId
              ? { ...request, status: "accepted" }
              : request
          )
        );
      } else {
        toast.error("Failed to accept leave request");
      }
    } catch (error) {
      toast.error("Error accepting leave request:", error);
    }
  };

  // Function to handle denying a leave request
  const handleDeny = async (requestId) => {
    try {
      const res = await fetch(`/api/StaffAdmin/${requestId}/deny`, {
        method: "PUT",
      });
      if (res.ok) {
        // Update leave request status in the UI
        setLeaveRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === requestId
              ? { ...request, status: "denied" }
              : request
          )
        );
      } else {
        toast.error("Failed to deny leave request");
      }
    } catch (error) {
      toast.error("Error denying leave request:", error);
    }
  };

  // Function to generate PDF report
  const generatePDFReport = () => {
    const doc = new jsPDF("l");
    const tableColumn = [
      "Request ID",
      "Staff ID",
      "Staff Name",
      "Leave Type",
      "Start Date",
      "End Date",
      "Start Time",
      "End Time",
      "Duration",
    ];
    const tableRows = [];

    // Populate tableRows with data from filteredLeaveRequests
    filteredLeaveRequests.forEach((record) => {
      const duration = calculateDuration(
        record.startDate,
        record.endDate,
        record.startTime,
        record.endTime
      );
      const rowData = [
        record._id,
        record.staffID,
        record.staffName,
        record.leaveType,
        record.startDate,
        record.endDate,
        record.startTime,
        record.endTime,
        duration,
      ];
      tableRows.push(rowData);
    });

    doc.setTextColor("#172554");
    doc.setFont("times", "bold");
    const logo = "/cleansyBG.png";
    const imgWidth = 180;
    const imgHeight = 120;
    const watermark = () => {
      doc.addImage(logo, "JPEG", centerX, centerY, imgWidth, imgHeight);
    };
    const centerX = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
    const centerY = (doc.internal.pageSize.getHeight() - imgHeight) / 2;

    doc.text("Leave Request Report", doc.internal.pageSize.getWidth() / 2, 15, {
      align: "center",
    });

    // Increase row height by setting cell padding
    const styles = {
      cellPadding: 2.5,
    };

    // Add table to PDF document
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      addPageContent: watermark,
      styles: styles,
    });

    // Save the PDF document
    doc.save("leave_requests_report.pdf");
  };

  // Function to calculate duration
  const calculateDuration = (startDate, endDate, startTime, endTime) => {
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    const sTime = new Date(`${startDate}T${startTime}`);
    const eTime = new Date(`${endDate}T${endTime}`);

    if (startDate === endDate) {
      // Calculate duration in hours and minutes
      const durationInMilliseconds = eTime - sTime;
      const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
      const minutes = Math.floor(
        (durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
      );
      return `${hours}h ${minutes}min`;
    } else {
      // Calculate duration in days
      const durationInMilliseconds = eDate - sDate;
      const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);
      return `${durationInDays + 1} days`;
    }
  };

  return (
    <div className="mx-auto p-3 w-full">
      <h1 className="text-3xl text-center my-7 font-extrabold underline text-blue-950 dark:text-slate-300">
        Leave Requests
      </h1>
      <div className="flex flex-row">
        <input
          type="text"
          placeholder="Search by Staff ID, Leave Type, or Status"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-lg m-2 w-96"
        />

        <Button
          onClick={generatePDFReport}
          gradientDuoTone="pinkToOrange"
          className="m-2"
        >
          Generate Report
        </Button>
      </div>
      <div className="w-full mx-auto">
        <table>
          <thead>
            <tr>
              <th className="font-semibold">#</th>
              <th className="font-semibold">Request ID</th>
              <th className="font-semibold">Staff ID</th>
              <th className="font-semibold">Leave Type</th>
              <td className="font-semibold">Duration</td>
              <th className="font-semibold">Status</th>
              <th className="font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaveRequests.map((request, index) => (
              <AdminLeaveRequests_04
                key={request._id}
                index={index + 1} // Add 1 to start numbering from 1
                request={request}
                onAccept={handleAccept}
                onDeny={handleDeny}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLeaveRequestHandle_04;
