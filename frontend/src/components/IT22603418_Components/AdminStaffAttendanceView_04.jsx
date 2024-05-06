import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { Button } from "flowbite-react";

function AdminStaffAttendanceView_04() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    // Check if data needs to be refreshed
    const isRefreshNeeded = localStorage.getItem("refreshData");

    if (isRefreshNeeded) {
      fetchAllAttendanceRecords();
      // Remove the flag from localStorage
      localStorage.removeItem("refreshData");
    } else {
      // Fetch attendance records for all staff members from backend
      fetchAllAttendanceRecords();
    }
  }, []);

  const fetchAllAttendanceRecords = async () => {
    try {
      const response = await fetch(
        `/api/StaffAttendance/getAllStaffAttendance`
      );
      if (response.ok) {
        const data = await response.json();
        // Set attendance records to the state
        setAttendanceRecords(data);
      } else {
        // If response is not OK, set attendance records to an empty array
        setAttendanceRecords([]);
      }
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString(); // Get only the time portion
  };

  const calculateDuration = (loginTime, logoutTime) => {
    if (!logoutTime) {
      return "N/A";
    }
    const login = new Date(loginTime);
    const logout = new Date(logoutTime);
    const duration = logout - login;
    return new Date(duration).toISOString().substr(11, 8);
  };

  // Function to handle generate button click
  const handleGenerateButtonClick = () => {
    setShowReportForm(true); // Show the report form
  };

  // Function to handle generate report button click
  const handleGenerateReportButtonClick = () => {
    // Check if the required inputs are provided
    if (reportType && (reportType !== "monthly" || (startDate && endDate))) {
      handleGeneratePDF(); // Generate the report
    } else {
      // Show an error message if the required inputs are missing
      toast.error("Please select report type and date range.");
    }
  };

  const handleGeneratePDF = async () => {
    try {
      let filteredRecords = attendanceRecords;

      if (reportType === "daily" && startDate) {
        // Filter records for the selected date
        const selectedDate = new Date(startDate);
        filteredRecords = attendanceRecords.filter((record) => {
          const loginDate = new Date(record.loginTime);
          return (
            loginDate.getFullYear() === selectedDate.getFullYear() &&
            loginDate.getMonth() === selectedDate.getMonth() &&
            loginDate.getDate() === selectedDate.getDate()
          );
        });
      } else if (reportType === "monthly" && startDate) {
        // Filter records for the selected month range
        const startMonth = new Date(startDate).getMonth();
        const endMonth = new Date(endDate).getMonth();
        filteredRecords = attendanceRecords.filter((record) => {
          const loginMonth = new Date(record.loginTime).getMonth();
          return loginMonth >= startMonth && loginMonth <= endMonth;
        });
      } else if (reportType === "annual" && startDate) {
        // Filter records for the selected year
        const selectedYear = new Date(startDate).getFullYear();
        filteredRecords = attendanceRecords.filter(
          (record) => new Date(record.loginTime).getFullYear() === selectedYear
        );
      }

      generateReport(filteredRecords);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Function to generate report
  const generateReport = (filteredRecords) => {
    const doc = new jsPDF();
    const tableColumn = [
      "Staff Name",
      "Date",
      "In Time",
      "Out Time",
      "Duration",
    ]; // Add "Staff Name" to the table column
    const tableRows = [];

    filteredRecords.forEach((record) => {
      const rowData = [
        record.staffName, // Include staff name in the rowData
        new Date(record.loginTime).toLocaleDateString(),
        new Date(record.loginTime).toLocaleTimeString(),
        record.logoutTime
          ? new Date(record.logoutTime).toLocaleTimeString()
          : "N/A",
        record.logoutTime
          ? calculateDuration(record.loginTime, record.logoutTime)
          : "N/A",
      ];
      tableRows.push(rowData);
    });

    doc.setTextColor("#172554");
    doc.setFont("times", "bold");
    const logo = "/cleansyBG.png";

    const imgWidth = 180;
    const imgHeight = 120;
    const centerX = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
    const centerY = (doc.internal.pageSize.getHeight() - imgHeight) / 2;

    doc.addImage(logo, "JPEG", centerX, centerY, imgWidth, imgHeight);

    let fileName = "all_staffs_attendance_report_"; // Default file name

    // Format file name based on report type and date range
    if (reportType === "daily" && startDate) {
      const formattedDate = new Date(startDate)
        .toLocaleDateString()
        .replaceAll("/", "_");
      fileName = `all_staffs_attendance_report_${formattedDate}.pdf`;
    } else if (reportType === "monthly" && startDate && endDate) {
      const startMonth = new Date(startDate).toLocaleDateString("en-GB", {
        month: "short",
      });
      const endMonth = new Date(endDate).toLocaleDateString("en-GB", {
        month: "short",
      });
      fileName = `all_staffs_attendance_report_${startMonth}_${endMonth}_${new Date(
        startDate
      ).getFullYear()}.pdf`;
    } else if (reportType === "annual" && startDate) {
      fileName = `all_staffs_attendance_report_${new Date(
        startDate
      ).getFullYear()}.pdf`;
    }

    doc.text(
      "All Staffs Attendance Report",
      doc.internal.pageSize.getWidth() / 2,
      15,
      {
        align: "center",
      }
    ); // Added heading
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 65 });
    doc.addImage(logo, "JPEG", centerX, centerY, imgWidth, imgHeight);
    doc.save(fileName);
  };

  return (
    <div>
      <h1 className="text-2xl text-center my-7 font-extrabold underline text-blue-950 dark:text-slate-300">
        Attendance Report for All Staff
      </h1>
      <div className="flex flex-col justify-center w-40">
        {/* generate report button */}
        <Button
          onClick={handleGenerateButtonClick}
          gradientDuoTone="pinkToOrange"
          className="m-2"
        >
          Generate Report
        </Button>
        {showReportForm && (
          <div className="mt-4">
            <label htmlFor="reportType" className="block font-semibold mb-2">
              Report Type:
            </label>
            <select
              id="reportType"
              className="w-full px-4 py-2 mb-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
            </select>
            {reportType === "daily" && (
              <div className="flex justify-between mb-4">
                <input
                  type="date"
                  className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]} // Set max to current date
                />
              </div>
            )}
            {reportType === "monthly" && (
              <div className="flex justify-between mb-4">
                <input
                  type="month"
                  className="w-1/2 px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  max={new Date().toISOString().slice(0, 7)} // Set max to current year and month
                />
                <input
                  type="month"
                  className="w-1/2 px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  max={new Date().toISOString().slice(0, 7)} // Set max to current year and month
                />
              </div>
            )}
            {reportType === "annual" && (
              <div className="flex justify-between mb-4">
                <input
                  type="number"
                  placeholder="Enter Year"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min="2020"
                  max={new Date().getFullYear()} // Set max to current year
                  step="1"
                />
              </div>
            )}
            <Button
              onClick={handleGenerateReportButtonClick}
              gradientDuoTone="pinkToOrange"
            >
              Generate
            </Button>
          </div>
        )}
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 font-semibold">Staff Name</th>
            <th className="py-2 px-4 font-semibold">Date</th>
            <th className="py-2 px-4 font-semibold">In Time</th>
            <th className="py-2 px-4 font-semibold">Out Time</th>
            <th className="py-2 px-4 font-semibold">Duration</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.length > 0 &&
            attendanceRecords.map((record) => (
              <tr className="border-b" key={record._id}>
                <td className="py-2 px-4 text-center">{record.staffName}</td>
                <td className="py-2 px-4 text-center">
                  {new Date(record.loginTime).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 text-center">
                  {formatTime(record.loginTime)}
                </td>
                <td className="py-2 px-4 text-center">
                  {record.logoutTime ? formatTime(record.logoutTime) : "N/A"}
                </td>
                <td className="py-2 px-4 text-center">
                  {record.logoutTime
                    ? calculateDuration(record.loginTime, record.logoutTime)
                    : "N/A"}
                </td>
              </tr>
            ))}
          {attendanceRecords.length === 0 && (
            <tr className="border-b">
              <td colSpan="5" className="py-2 px-4 text-center">
                No attendance records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminStaffAttendanceView_04;
