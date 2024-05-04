import React, { useState } from "react";
import RequestLeave_04 from "../../pages/IT22603418_Pages/RequestLeave_04"; // Import your leave request component
import StaffRegister_04 from "../../pages/IT22603418_Pages/StaffRegister_04"; // Import your staff register component
import StaffAttendance_04 from "../../pages/IT22603418_Pages/StaffAttendance_04";
import { Button } from "flowbite-react";

const DashStaff_04 = () => {
  const [showLeaveForms, setShowLeaveForms] = useState(false);
  const [showStaffRegisterForms, setShowStaffRegisterForms] = useState(false);
  const [showAttendance, setShowAttendance] = useState(true);

  const handleLeaveButtonClick = () => {
    setShowLeaveForms(true);
    setShowStaffRegisterForms(false);
    setShowAttendance(false);
  };

  const handleStaffRegisterButtonClick = () => {
    setShowStaffRegisterForms(true);
    setShowLeaveForms(false);
    setShowAttendance(false);
  };

  const handleStaffAttendanceButtonClick = () => {
    setShowAttendance(true);
    setShowStaffRegisterForms(false);
    setShowLeaveForms(false);
  };

  return (
    <div className="mx-auto p-3 w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="w-full sm:w-auto flex flex-row space-x-4">
            <Button
              gradientDuoTone={showAttendance ? "pinkToOrange" : "purpleToBlue"}
              className="w-96 items-center focus:outline-none py-3 text-lg"
              onClick={handleStaffAttendanceButtonClick}
            >
              Attendance
            </Button>
            <Button
              gradientDuoTone={showLeaveForms ? "pinkToOrange" : "purpleToBlue"}
              className="w-96 items-center focus:outline-none py-3 text-lg"
              onClick={handleLeaveButtonClick}
            >
              Request Leave
            </Button>
            <Button
              gradientDuoTone={
                showStaffRegisterForms ? "pinkToOrange" : "purpleToBlue"
              }
              className="w-96 items-center focus:outline-none py-3 text-lg"
              onClick={handleStaffRegisterButtonClick}
            >
              Staff Register
            </Button>
          </div>
        </div>
        <div>
          <div>
            {showLeaveForms && <RequestLeave_04 className="pb-5" />}
            {showStaffRegisterForms && <StaffRegister_04 className="pb-5" />}
            {showAttendance && <StaffAttendance_04 className="pb-5" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashStaff_04;
