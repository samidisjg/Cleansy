import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from 'flowbite-react'

const DashBooking = () => {
    const { currentUser } = useSelector((state) => state.user)

    return (
        <div>
            
                <div>
                    <h1>Bookings</h1>
                    <p>Manage Bookings</p>

                    <div className='flex flex-wrap gap-2'></div>
                    <Button pill>
                        <Link to="/booking-List:bookingID">Show Booking</Link>
                    </Button>
                    <br />
                </div>
            
        </div>
    );
};

export default DashBooking;