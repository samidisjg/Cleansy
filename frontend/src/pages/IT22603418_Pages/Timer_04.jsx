import React, { useState, useEffect } from "react";

function Timer_04({ workingHours = 8 }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateRemainingTime = () => {
    const currentTimeInHours =
      currentTime.getHours() +
      currentTime.getMinutes() / 60 +
      currentTime.getSeconds() / 3600;
    const remainingTime = workingHours - currentTimeInHours;
    return remainingTime > 0 ? remainingTime : 0;
  };

  const formatTime = (time) => {
    const hours = Math.floor(time);
    const minutes = Math.floor((time - hours) * 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const remainingTime = calculateRemainingTime();
  const isOvertime = remainingTime < 0;
  const isUndertime = remainingTime > 0 && remainingTime < workingHours;

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`relative w-32 h-32 border-4 rounded-full ${
          isOvertime
            ? "border-green-500"
            : isUndertime
            ? "border-red-500"
            : "border-blue-500"
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-blue-200 rounded-full"></div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-blue-500 rounded-full"
          style={{
            clipPath: `circle(${
              (remainingTime / workingHours) * 100
            }% at 50% 50%)`,
          }}
        ></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">
            {formatTime(remainingTime)}
          </span>
          <span className="text-sm">
            {isOvertime ? "Overtime" : isUndertime ? "Undertime" : "Worked"}
          </span>
        </div>
      </div>
      <div className="mt-2 text-xl font-bold">
        {formatTime(currentTime.getHours())}:
        {formatTime(currentTime.getMinutes())}
      </div>
    </div>
  );
}

export default Timer_04;
