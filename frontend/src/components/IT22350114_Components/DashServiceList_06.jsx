import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from 'flowbite-react'




const DashServiceList_06 = () => {
    const { currentUser } = useSelector((state) => state.user)

    return (
        <div>
            {currentUser.isFacilityServiceAdmin && (
               <div>
                <h1>Create Services</h1>

                    
                   
                </div>
                
            )}
        </div>
    );
}

export default DashServiceList_06;