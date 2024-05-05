import React, { useState, useEffect } from "react";

function StaffAttendanceView_04({ currentUser }) {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    // Fetch attendance records from backend when the component mounts
    fetchAttendanceRecords(currentUser._id);
  }, [currentUser]);

  const fetchAttendanceRecords = async (userId) => {
    try {
      const response = await fetch(
        `/api/StaffAttendance/getAttendance/${userId}`
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

  const getTotalDuration = () => {
    let totalDuration = 0;
    attendanceRecords.forEach((record) => {
      if (record.logoutTime) {
        const login = new Date(record.loginTime);
        const logout = new Date(record.logoutTime);
        totalDuration += logout - login;
      }
    });
    return new Date(totalDuration).toISOString().substr(11, 8);
  };

  return (
    <div>
      <h1 className="text-2xl text-center my-7 font-extrabold underline text-blue-950 dark:text-slate-300">
        Attendance Report
      </h1>
      <table className="w-full">
        <thead className="border-b text-xl font-extrabold text-orange-500 text-center">
          <td className="py-2 px-4 font-semibold text-center" colSpan="2">
            Total Working Duration
          </td>
          <td className="py-2 px-4 font-semibold text-center" colSpan="2">
            {getTotalDuration()}
          </td>
        </thead>
        <thead>
          <tr className="border-b">
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
              <td colSpan="4" className="py-2 px-4 text-center">
                No attendance records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StaffAttendanceView_04;
