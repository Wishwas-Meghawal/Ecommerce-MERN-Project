import React, { useRef, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { FiCopy } from "react-icons/fi";
import "./otp.css";

const OTPInput = ({ length, onChange, disabled = false, autoFocus = true }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [activeInput, setActiveInput] = useState(0);
  const inputsRef = useRef([]);

  // Focus management
  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [autoFocus]);

  // Reset OTP
  const resetOTP = useCallback(() => {
    setOtp(new Array(length).fill(""));
    setActiveInput(0);
    inputsRef.current[0]?.focus();
    onChange("");
  }, [length, onChange]);

  // Handle paste functionality
  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .replace(/\D/g, '') // Remove non-digits
      .slice(0, length);

    if (!pastedData) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < length) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);
    const otpValue = newOtp.join("");
    onChange(otpValue);

    // Focus on next available input
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputsRef.current[nextIndex]?.focus();
    setActiveInput(nextIndex);
  }, [otp, length, onChange]);

  // Handle input change
  const handleChange = useCallback((element, index) => {
    const value = element.value.trim();
    
    if (!/^\d*$/.test(value)) return; // Only numbers allowed
    
    const newOtp = [...otp];
    
    // Handle multiple digits pasted into single input
    if (value.length > 1) {
      const digits = value.split('').slice(0, length - index);
      digits.forEach((digit, digitIndex) => {
        if (index + digitIndex < length) {
          newOtp[index + digitIndex] = digit;
        }
      });
      
      const otpValue = newOtp.join("");
      setOtp(newOtp);
      onChange(otpValue);
      
      // Focus on appropriate input
      const focusIndex = Math.min(index + digits.length, length - 1);
      inputsRef.current[focusIndex]?.focus();
      setActiveInput(focusIndex);
    } else {
      // Single digit input
      newOtp[index] = value;
      setOtp(newOtp);
      const otpValue = newOtp.join("");
      onChange(otpValue);

      // Auto-focus next input
      if (value && index < length - 1) {
        inputsRef.current[index + 1].focus();
        setActiveInput(index + 1);
      }
    }
  }, [otp, length, onChange]);

  // Handle key down events
  const handleKeyDown = useCallback((e, index) => {
    // Move left on backspace when empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
      setActiveInput(index - 1);
    }
    
    // Move left with arrow key
    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1].focus();
      setActiveInput(index - 1);
      e.preventDefault();
    }
    
    // Move right with arrow key
    if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1].focus();
      setActiveInput(index + 1);
      e.preventDefault();
    }
    
    // Select all text on Ctrl+A
    if (e.key === "a" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      const input = inputsRef.current[index];
      input.select();
    }
  }, [otp, length]);

  // Handle focus
  const handleFocus = useCallback((index) => {
    setActiveInput(index);
    const input = inputsRef.current[index];
    if (input) {
      input.select();
    }
  }, []);

  // Handle click on container to focus first empty input
  const handleContainerClick = () => {
    const firstEmptyIndex = otp.findIndex(value => value === "");
    const focusIndex = firstEmptyIndex === -1 ? length - 1 : firstEmptyIndex;
    inputsRef.current[focusIndex]?.focus();
    setActiveInput(focusIndex);
  };

  return (
    <div className="otp-container">
      <div 
        className="otp-box"
        onClick={handleContainerClick}
        role="group"
        aria-label="One-Time Password input"
      >
        {otp.map((data, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            id={`otp-input-${index}`}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={() => handleFocus(index)}
            onPaste={handlePaste}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength="1"
            autoComplete="one-time-code"
            disabled={disabled}
            aria-label={`Digit ${index + 1} of ${length}`}
            className={`otp-input ${index === activeInput ? 'active' : ''} ${
              data ? 'filled' : ''
            }`}
          />
        ))}
      </div>
      
      <div className="otp-actions">
        <button
          type="button"
          onClick={resetOTP}
          className="otp-reset-btn"
          aria-label="Clear OTP"
        >
          Clear
        </button>
        
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.readText().then(text => {
              const event = {
                clipboardData: {
                  getData: () => text
                },
                preventDefault: () => {}
              };
              handlePaste(event);
            });
          }}
          className="otp-paste-btn"
          aria-label="Paste OTP from clipboard"
        >
          <FiCopy className="w-4 h-4 mr-1" />
          Paste
        </button>
      </div>
    </div>
  );
};

OTPInput.propTypes = {
  length: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

export default OTPInput;