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
