import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Button } from 'antd';
import { toast } from 'react-toastify';

export default function Parkingslot() {
  let parms = useParams();
  const navigate = useNavigate();
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    fetch('/api/carparkListing/getAllboked')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setBookedSlots(data.bookedSlots);
        } else {
          console.error('Failed to fetch booked slots');
        }
      })
      .catch(error => {
        console.error('Error fetching booked slots:', error);
      });
  }, []); 

  const handleSeatSelection = (seatNumber) => {
    Modal.confirm({
      title: 'Confirm Slot Selection',
      content: `Are you sure you want to select slot number ${seatNumber}?`,
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        const payload = {
          carparkListingId: parms.slotID, 
          slotId: seatNumber, 
        };
  
        fetch('/api/carparkListing/updateSlotID', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        .then(response => {
          if (response.ok) {
            toast.success('Parking slot successfully reserved');
            navigate(`/park-slot-order/${parms.slotID}`);
          } else {
            throw new Error('Failed to update slot ID');
          }
        })
        .catch(error => {
          console.error('Error updating slot ID:', error);
        });
      },
      onCancel() {
      },
    });
  };

  const renderSeatButtons = () => {
    const seatButtons = [];
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 5; col++) {
        const seatNumber = (row - 1) * 5 + col;
        seatButtons.push(
          <Button
            key={seatNumber}
            onClick={() => handleSeatSelection(seatNumber)}
            className={`w-20 h-12 rounded-lg bg-blue-500 text-white ${
              selectedSeat === seatNumber ? 'opacity-50 cursor-not-allowed' : bookedSlots.includes(seatNumber) ? 'bg-gray-300 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
            disabled={selectedSeat === seatNumber || bookedSlots.includes(seatNumber)}
            style={{ marginLeft: col === 1 ? '10px' : '0' }} // Add left margin for the first column
          >
            {seatNumber}
          </Button>
        );
      }
    }
    return seatButtons;
  };
  

  return (
    <div>
      <h2 className="text-3xl text-center font-semibold my-7">Reserve Car Parking Slot</h2>
      <div>
        <p className="text-2xl font-semibold my-7">Select the slot that you prefer:</p>
        <div className="parkingllot grid grid-cols-5 gap-x-1 gap-y-4">{renderSeatButtons()}</div>
      </div>
    </div>
  );
}
