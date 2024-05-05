import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";

const DashServices = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex justify-center mt-8 mx-auto "> 
      {currentUser.isFacilityServiceAdmin && (
        <div className="w-full max-w-xs">
          <h1 className="text-2xl font-semibold mt-8 mb-4 text-center"> 
            Book Service
          </h1>
          <div className="flex justify-center gap-6">
            {" "}
            {/* Increased the gap size */}
            <Button pill>
              <Link to="/service-create">Create Service</Link>
            </Button>
            <Button pill>
              <Link to="/service-list:serviceID">View Service</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashServices;
