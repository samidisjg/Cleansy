import Attendance from "../../models/IT22603418_Models/StaffAttendance.model_04.js";

// Controller to create a new attendance record
export const createAttendance = async (req, res) => {
  try {
    const { userId, staffName, loginTime } = req.body;
    const attendance = new Attendance({
      staffID: userId,
      staffName,
      loginTime,
    });
    await attendance.save();
    return res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update attendance record with logout time
export const updateAttendance = async (req, res) => {
  try {
    const { userId } = req.body;
    const attendance = await Attendance.findOneAndUpdate(
      { staffID: userId, logoutTime: null }, // Find the attendance record for the user that doesn't have a logout time
      { $set: { logoutTime: new Date().toLocaleString() } }, // Update the logout time to the current local time
      { sort: { loginTime: -1 }, new: true }
    );

    if (!attendance) {
      return res
        .status(404)
        .json({ error: "No active attendance record found" });
    }

    return res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get attendance records for the logged-in user
export const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({ staffID: req.params.staffID });

    // Check if any attendance records were found
    if (attendance.length === 0) {
      return res
        .status(404)
        .json({ error: "No attendance records found for the current user" });
    }

    // If authorized, return the attendance records
    return res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Face recognition attendance mark
export const recognizeFace = async (req, res) => {
  try {
    console.log(req.body);

    const { rollno, name, time, date, time_type } = req.body;
    let loginTime1, logoutTime1; // Declare variables here

    if (time_type === "login") {
      // For login, create a new attendance record
      loginTime1 = date + " " + time; // Combine date and time
      logoutTime1 = null; // Set logout time to null
    } else if (time_type === "logout") {
      // For logout, find and update the latest attendance record for the staffID
      const latestAttendance = await Attendance.findOne(
        { staffID: rollno },
        {},
        { sort: { loginTime: -1 } }
      );

      if (!latestAttendance) {
        return res
          .status(404)
          .json({ error: "No active attendance record found" });
      }

      // Update the found attendance record with the logout time
      latestAttendance.logoutTime = date + " " + time; // Combine date and time
      await latestAttendance.save();

      return res.status(200).json(latestAttendance);
    }

    // Create a new attendance record
    const attendance = new Attendance({
      staffID: rollno,
      staffName: name,
      loginTime: loginTime1,
      logoutTime: logoutTime1,
    });

    await attendance.save();
    return res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to retrieve all attendance records
export const getAllStaffAttendance = async (req, res) => {
  try {
    // Find all attendance records in the collection
    const allAttendance = await Attendance.find();

    // Check if any attendance records were found
    if (allAttendance.length === 0) {
      return res.status(404).json({ error: "No attendance records found" });
    }

    // If found, return the attendance records
    return res.status(200).json(allAttendance);
  } catch (error) {
    // If an error occurs, return a 500 status code with the error message
    res.status(500).json({ error: error.message });
  }
};
