import React from 'react';


export const TimeoutWarningModal = ({onRequestClose}) => {  

  return (
    <div> 
        <h2>Session Expired</h2>
        <button onClick={onRequestClose}>Stay Logged In</button>
    </div>  
  );
}