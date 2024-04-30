import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from 'flowbite-react'

const DashBooking = () => {
    const { currentUser } = useSelector((state) => state.user)

    return (
    <div></div>
    );
};

export default DashBooking;