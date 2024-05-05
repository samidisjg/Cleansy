import React, { useState } from "react";
import AdminLeaveRequestHandle_04 from "./AdminLeaveRequestHandle_04"; // Import your leave request component
import AdminStaffRegisterList_04 from "./AdminStaffRegisterList_04";
import AdminStaffAttendanceView_04 from "./AdminStaffAttendanceView_04";
import { Button } from "flowbite-react";

const DashAdmin_04 = () => {
  const [showLeave, setShowLeave] = useState(false);
  const [showStaffRegister, setShowStaffRegister] = useState(false);
  const [showAttendance, setShowAttendance] = useState(true);

  const handleLeaveButton = () => {
    setShowLeave(true);
    setShowStaffRegister(false);
    setShowAttendance(false);
  };

  const handleStaffRegisterButton = () => {
    setShowStaffRegister(true);
    setShowLeave(false);
    setShowAttendance(false);
  };

  const handleStaffAttendanceButton = () => {
    setShowAttendance(true);
    setShowStaffRegister(false);
    setShowLeave(false);
  };

  return (
    <div className="mx-auto p-3 w-full overflow-x-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="w-full sm:w-auto flex flex-row space-x-4">
            <Button
              gradientDuoTone={showAttendance ? "pinkToOrange" : "purpleToBlue"}
              className="w-96 items-center focus:outline-none py-3 text-lg"
              onClick={handleStaffAttendanceButton}
            >
              Staff Attendance
            </Button>
            <Button
              gradientDuoTone={showLeave ? "pinkToOrange" : "purpleToBlue"}
              className="w-96 items-center focus:outline-none py-3 text-lg"
              onClick={handleLeaveButton}
            >
              Leave Requests
            </Button>
            <Button
              gradientDuoTone={
                showStaffRegister ? "pinkToOrange" : "purpleToBlue"
              }
              className="w-96 items-center focus:outline-none py-3 text-lg"
              onClick={handleStaffRegisterButton}
            >
              Staff Register
            </Button>
          </div>
        </div>
        <div className="mx-auto w-full overflow-x-auto">
          <div className="w-full mx-auto" style={{ overflowX: "auto" }}>
            {showAttendance && <AdminStaffAttendanceView_04 className="pb-5" />}
            {showLeave && <AdminLeaveRequestHandle_04 className="pb-5" />}
            {showStaffRegister && (
              <AdminStaffRegisterList_04 className="pb-5" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashAdmin_04;
