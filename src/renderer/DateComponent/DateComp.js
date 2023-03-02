import React, { useEffect, useState } from 'react';

function DateComp() {
  const [expiryDate, setExpiryDate] = useState(null);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (expiryDate) {
      // start the timer when the expiryDate is set
      const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance = expiryDate - now;
        if (distance <= 0) {
          // clear the timer and display the message when the distance is negative
          clearInterval(timer);
          setTimer(null);
          console.log('Session expired');
        } else {
          // update the timer every second
          setTimer(distance);
        }
      }, 1000);

      // clear the timer when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [expiryDate, timer]);


  const startSession = () => {
    // set the expiryDate to 5 days from now
    const now = new Date().getTime();
    const expiryDate = now + 5 * 24 * 60 * 60 * 1000;
    setExpiryDate(expiryDate);

    // start the timer
    setTimer(expiryDate - now);
  };

  return (
    <>
      <div>
      {timer ? (
        <div>Session expires in {Math.floor(timer / (1000 * 60 * 60 * 24))} days, {Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} hours, {Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60))} minutes, {Math.floor((timer % (1000 * 60)) / 1000)} seconds.</div>
      ) : (
        <button onClick={startSession}>Start session</button>
      )}
      </div>
    </>
    )
}

export default DateComp;
