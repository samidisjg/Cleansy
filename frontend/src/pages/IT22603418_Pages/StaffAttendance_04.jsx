import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Label, TextInput } from "flowbite-react";
import DashStaff_04 from "../../components/IT22603418_Components/DashStaff_04";
import StaffAttendanceView_04 from "./StaffAttendanceView_04";

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

  const handleLogin = () => {
    setShowLoginForm(true);
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("startTime");
      localStorage.removeItem("timer");
      setLoggedIn(false);
      setShowLoginForm(false);
      setTimer(0);
      // Send logout time to backend
      try {
        await fetch(`/api/StaffAttendance/attendance/${currentUser._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser._id,
            logoutTime: new Date().toLocaleString(),
          }),
        });

        toast.success("You are Logged Out");
      } catch (error) {
        console.error("Error submitting logout time:", error);
      }
    }
  };

  // Function to handle login
  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    setLoggedIn(true);
    setShowLoginForm(false);
    setFormData({ staffName: "" });
    if (!intervalRef.current) {
      startTimer();
    }

    // Send login time and user info to backend
    try {
      await fetch("/api/StaffAttendance/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser._id, // Pass user ID from Redux store
          staffName: formData.staffName,
          loginTime: new Date().toLocaleString(),
        }),
      });

      toast.success("You are Logged In");

      const data = await response.json();

      // Update the attendance records state with the new login record
      setLoggedIn(true);
    } catch (error) {
      console.error("Error submitting login time:", error);
    }
  };

  // Function to format the timer value to HH:MM:SS
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-3xl text-center my-7 font-extrabold underline text-blue-950 dark:text-slate-300">
        Staff Attendance
      </h1>
      {!loggedIn && (
        <Button onClick={handleLogin} gradientDuoTone="pinkToOrange">
          {showLoginForm ? "Cancel" : "Login"}
        </Button>
      )}
      {loggedIn && (
        <>
          <div className="flex justify-between">
            <span>Staff Name: {staffName}</span>
            <span>Working Hours: {formatTime(timer)}</span>
          </div>
          <Button onClick={handleLogout} gradientDuoTone="pinkToOrange">
            Logout
          </Button>
        </>
      )}
      <DashStaff_04
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
      </DashStaff_04>
      <StaffAttendanceView_04 currentUser={currentUser} />
    </div>
  );
}

export default StaffAttendance_04;
