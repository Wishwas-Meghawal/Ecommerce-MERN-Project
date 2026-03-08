import React, { useRef, useState } from "react";
import "./otp.css";

const OTPInput = ({length , onChange}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (element, index) => {
    const value = element.value;
    if(isNaN(value)) return; // Only number allowed
   
    // Update OTP Value
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Focus on next input
    if (value && index < length -1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

//   const handlePaste = (e) => {
//     const pastedData = e.clipboardData.getData("text").slice(0, 6);
//     if (!/^\d+$/.test(pastedData)) return;

//     const newOtp = pastedData.split("");
//     setOtp(newOtp);

//     newOtp.forEach((_, i) => {
//       if (inputsRef.current[i]) {
//         inputsRef.current[i].value = newOtp[i];
//       }
//     });

//     inputsRef.current[pastedData.length - 1]?.focus();
//   };

//   const handleSubmit = () => {
//     alert(`Entered OTP: ${otp.join("")}`);
//   };

  return (
    <div className="otp-container">
      <div className="otp-box">
        {otp.map((data, index) => (
          <input
            key={index}
            id = {`otp-input-${index}`}
            value={otp[index]}
            onChange = {(e) => handleChange(e.target,index)}
            onKeyDown = {(e) => handleKeyDown(e,index)}
            type="text"
            maxLength="1"
          />
        ))}
      </div>
    </div>
  );
};

export default OTPInput;
