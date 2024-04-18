import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from 'flowbite-react'

const DashAmenity = () => {
    const { currentUser } = useSelector((state) => state.user)

    return (
        <div>
            {currentUser.isBookingAdmin && (
                <div>
                    <h1>Amenities</h1>
                    <p>Manage Amenities</p>

                    <div className="flex flex-wrap gap-2"></div>
                    <Button pill>
                        <Link to="/amenity-create">Create Amenity</Link>
                    </Button>
                    <br />

                    <div className="flex flex-wrap gap-2"></div>
                    <Button pill>
                        <Link to="/amenity-List:amenityID">Show Amenities</Link>
                    </Button>
                    <br />

                </div>
            )}
        </div>
    );
};

export default DashAmenity;
