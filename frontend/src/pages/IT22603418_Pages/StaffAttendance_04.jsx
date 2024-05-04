import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Label, TextInput } from "flowbite-react";
import DashStaff_04 from "../../components/IT22603418_Components/DashStaff_04";
import StaffAttendanceView_04 from "./StaffAttendanceView_04";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

function StaffAttendance_04() {
  const { currentUser } = useSelector((state) => state.user); // Get current user ID from Redux store
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [formData, setFormData] = useState({
    staffName: "",
  });
  const { staffName } = formData;
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  //Report Generate
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportType, setReportType] = useState("daily");
  const [startDate, setStartDate] = useState(new Date().getFullYear());
  const [endDate, setEndDate] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  // //face recognition
  // const [recognizedName, setRecognizedName] = useState("");
  // const webcamRef = useRef(null);

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("loggedIn");
    if (storedLoggedIn === "true") {
      setLoggedIn(true);
      const storedStartTime = parseInt(localStorage.getItem("startTime"));
      const elapsedTime = Math.floor((Date.now() - storedStartTime) / 1000);
      const storedTimer = parseInt(localStorage.getItem("timer"));
      setTimer(storedTimer + elapsedTime);
    }

    if (loggedIn) {
      startTimer();
    } else {
      stopTimer();
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      stopTimer();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [loggedIn]);

  const handleBeforeUnload = () => {
    if (loggedIn) {
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("startTime", startTimeRef.current);
      localStorage.setItem("timer", timer.toString());
    }
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    startTimeRef.current = Date.now();
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  // const handleLogin = async () => {
  //   setShowLoginForm(true);
  //   // // Capture image from webcam
  //   // const imageSrc = webcamRef.current.getScreenshot();

  //   // // Send the image to the server for face recognition
  //   // const response = await fetch("http://localhost:8000/recognize-face", {
  //   //   method: "POST",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   body: JSON.stringify({ image: imageSrc }),
  //   // });

  //   // if (response.ok) {
  //   //   const data = await response.json();
  //   //   if (data.success) {
  //   //     // Face recognized successfully
  //   //     // Mark attendance
  //   //     markAttendance(data.staffID);
  //   //     // Start timer
  //   //     setLoggedIn(true);
  //   //   } else {
  //   //     // Face not recognized
  //   //     toast.error("Face not recognized. Please try again.");
  //   //   }
  //   // } else {
  //   //   // Error in face recognition
  //   //   toast.error("Error recognizing face. Please try again.");
  //   // }
  // };

  // Function to mark attendance
  // const markAttendance = async (staffID) => {
  //   try {
  //     await fetch(`/api/StaffAttendance/attendance`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userId: currentUser._id,
  //         staffID: staffID,
  //         loginTime: new Date().toLocaleString(),
  //       }),
  //     });
  //     toast.success("Attendance marked successfully");
  //   } catch (error) {
  //     console.error("Error marking attendance:", error);
  //     toast.error("Failed to mark attendance.");
  //   }
  // };

  // Function to handle logout
  // const handleLogout = async () => {
  //   const confirmLogout = window.confirm("Are you sure you want to log out?");
  //   if (confirmLogout) {
  //     localStorage.removeItem("loggedIn");
  //     localStorage.removeItem("startTime");
  //     localStorage.removeItem("timer");
  //     setLoggedIn(false);
  //     setShowLoginForm(false);
  //     setTimer(0);
  //     // Send logout time to backend
  //     try {
  //       await fetch(`/api/StaffAttendance/attendance/${currentUser._id}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           userId: currentUser._id,
  //           logoutTime: new Date().toLocaleString(),
  //         }),
  //       });

  //       toast.success("You are Logged Out");
  //     } catch (error) {
  //       console.error("Error submitting logout time:", error);
  //     }
  //   }
  // };

  // Function to handle login
  // const handleLoginFormSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoggedIn(true);
  //   setShowLoginForm(false);
  //   setFormData({ staffName: "" });
  //   if (!intervalRef.current) {
  //     startTimer();
  //   }

  //   // Send login time and user info to backend
  //   try {
  //     await fetch("/api/StaffAttendance/attendance", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userId: currentUser._id, // Pass user ID from Redux store
  //         staffName: formData.staffName,
  //         loginTime: new Date().toLocaleString(),
  //       }),
  //     });

  //     toast.success("You are Logged In");
  //     // Update the attendance records state with the new login record
  //     setLoggedIn(true);
  //   } catch (error) {
  //     console.error("Error submitting login time:", error);
  //     toast.error("Failed to log in. Please try again.");
  //   }
  // };

  // Function to format the timer value to HH:MM:SS
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Function to generate report
  useEffect(() => {
    fetchAttendanceRecords(currentUser._id);
  }, [currentUser]);

  const fetchAttendanceRecords = async (userId) => {
    try {
      const response = await fetch(
        `/api/StaffAttendance/getAttendance/${userId}`
      );
      const data = await response.json();
      setAttendanceRecords(data);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  const handleGeneratePDF = async () => {
    try {
      const response = await fetch(`/api/user/${currentUser._id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
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

      generateReport(
        filteredRecords,
        userData.username,
        userData.profilePicture
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Function to generate report
  const generateReport = (filteredRecords, userName, profilePicture) => {
    const doc = new jsPDF();
    const tableColumn = ["Date", "In Time", "Out Time", "Duration"];
    const tableRows = [];

    filteredRecords.forEach((record) => {
      const rowData = [
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

    // Add Staff ID and Total Duration
    const totalDuration = getTotalDuration(filteredRecords);
    const staffId = currentUser._id;
    doc.setTextColor("#172554");
    doc.setFont("times", "bold");
    const logo = "/cleansyBG.png";

    const imgWidth = 180;
    const imgHeight = 120;
    const centerX = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
    const centerY = (doc.internal.pageSize.getHeight() - imgHeight) / 2;

    doc.addImage(logo, "JPEG", centerX, centerY, imgWidth, imgHeight);
    // Add user name and profile picture to the PDF
    if (userName && profilePicture) {
      doc.addImage(profilePicture, "JPEG", 20, 25, 30, 30);
      doc.text(`User Name: ${userName}`, 90, 30);
    }

    let fileName = "attendance_report"; // Default file name

    // Format file name based on report type and date range
    if (reportType === "daily" && startDate) {
      const formattedDate = new Date(startDate)
        .toLocaleDateString()
        .replaceAll("/", "_");
      fileName = `attendance_report_${formattedDate}.pdf`;
    } else if (reportType === "monthly" && startDate && endDate) {
      const startMonth = new Date(startDate).toLocaleDateString("en-GB", {
        month: "short",
      });
      const endMonth = new Date(endDate).toLocaleDateString("en-GB", {
        month: "short",
      });
      fileName = `attendance_report_${startMonth}_${endMonth}_${new Date(
        startDate
      ).getFullYear()}.pdf`;
    } else if (reportType === "annual" && startDate) {
      fileName = `attendance_report_${new Date(startDate).getFullYear()}.pdf`;
    }

    doc.text("Attendance Report", doc.internal.pageSize.getWidth() / 2, 15, {
      align: "center",
    }); // Added heading
    doc.text(`Staff ID: ${staffId}`, 90, 40); // Added Staff ID
    doc.text(`Total Duration: ${totalDuration}`, 90, 50); // Added Total Duration
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 65 });
    doc.addImage(logo, "JPEG", centerX, centerY, imgWidth, imgHeight);
    doc.save(fileName);
  };

  // Function to get duration for a record
  const calculateDuration = (loginTime, logoutTime) => {
    const login = new Date(loginTime);
    const logout = new Date(logoutTime);
    const duration = logout - login;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Function to get total duration for a given set of records
  const getTotalDuration = (records) => {
    let totalDuration = 0;
    records.forEach((record) => {
      if (record.logoutTime) {
        const login = new Date(record.loginTime);
        const logout = new Date(record.logoutTime);
        totalDuration += logout - login;
      }
    });
    return new Date(totalDuration).toISOString().substr(11, 8);
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

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-3xl text-center my-7 font-extrabold underline text-blue-950 dark:text-slate-300">
        Staff Attendance
      </h1>
      <div className="flex flex-row">
        {/* {!loggedIn && (
          <Button
            onClick={handleLogin}
            gradientDuoTone="pinkToOrange"
            className="m-2"
          >
            {showLoginForm ? "Cancel" : "Login"}
          </Button>
        )} */}
        {loggedIn && (
          <>
            <div className="flex flex-col justify-between p-3 bg-gray-200 border border-gray-300 rounded-md">
              <span className="text-gray-700">Staff ID: {currentUser._id}</span>
              <span className="text-gray-700">
                Working Hours: {formatTime(timer)}
              </span>
            </div>
            {/* <Button
              onClick={handleLogout}
              gradientDuoTone="pinkToOrange"
              className="m-2"
            >
              Logout
            </Button> */}
          </>
        )}
      </div>

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
      {/* <DashStaff_04
        isOpen={showLoginForm}
        onClose={() => setShowLoginForm(false)}
      >
        <form onSubmit={handleLoginFormSubmit} className="flex flex-col gap-4">
          <div>
            <Label value="Staff Name" />
            <TextInput
              type="text"
              id="staffName"
              placeholder="Staff Name"
              value={staffName}
              onChange={(e) =>
                setFormData({ ...formData, staffName: e.target.value })
              }
              required
            />
          </div>
          <Button type="submit" gradientDuoTone="pinkToOrange">
            Login
          </Button>
        </form>
      </DashStaff_04> */}
      <StaffAttendanceView_04 currentUser={currentUser} />
    </div>
  );
}

export default StaffAttendance_04;
