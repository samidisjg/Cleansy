import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Parkingslot() {
  const navigate = useNavigate(); 
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatSelection = (seatNumber) => {
    setSelectedSeat(seatNumber);
    navigate(`/park-slot/${seatNumber}`);
  };

  const renderSeatButtons = () => {
    const seatButtons = [];
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 5; col++) {
        const seatNumber = (row - 1) * 5 + col;
        seatButtons.push(
          <button
            key={seatNumber}
            onClick={() => handleSeatSelection(seatNumber)}
            className={`w-20 h-12 rounded-lg bg-blue-500 text-white ${
              selectedSeat === seatNumber ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
            disabled={selectedSeat === seatNumber}
          >
            {seatNumber}
          </button>
        );
      }
    }
    return seatButtons;
  };

  return (
    <div>
      <h2 className="text-3xl text-center font-semibold my-7">Reserve Car Parking Slot</h2>
      <div>
        <p className='text-2xl font-semibold my-7'>Select the slot that you are preferred:</p>
        <div className="grid grid-cols-5 gap-x-1 gap-y-4">
          {renderSeatButtons()}
        </div>
      </div>
    </div>
  );
}
