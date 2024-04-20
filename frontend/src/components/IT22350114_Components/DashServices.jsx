import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";

const DashServices = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      {currentUser.isFacilityServiceAdmin && (
        <div>
          <h1>Create Services</h1>

          <div className="flex flex-wrap gap-2"></div>
          <Button pill>
                        <Link to="/service-create">Create Service</Link>
                    </Button>
                    <Button pill>
                        <Link to="/service-list:serviceID">View Service</Link>
                    </Button>
                    <br />
                   
          <br />
        </div>
      )}
    </div>
  );
};

export default DashServices;
