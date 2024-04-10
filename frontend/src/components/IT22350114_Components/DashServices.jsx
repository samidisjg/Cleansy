import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



const DashServices = () => {
   const { currentUser } = useSelector((state) => state.user)

    return (
        <div>
            {currentUser.isFacilityServiceAdmin && (
                <Link to="/service-create">
                    <button>Create Service</button>
                 </Link>
                
            )}
        </div>
    );
}

export default DashServices;