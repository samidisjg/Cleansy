import React from 'react'

const DashServices = () => {
   const { currentUser } = useSelector((state) => state.user)

    return (
        <div>
            {currentUser.isFacilityServiceAdmin && (
                <h1>Services</h1>
            )}
        </div>
    );
}

export default DashServices;