import React, { useState, useRef, useEffect } from "react";
import { Send, PenLine, Eye, EyeOff, CircleCheck, CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VerifyOtpPage = ({ flow = "default" }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Default email
  const [isEmailEditable, setIsEmailEditable] = useState(true); // Start with email editable
  const [otp, setOtp] = useState(Array(6).fill("")); // OTP input fields
  const [isOtpValid, setIsOtpValid] = useState(false); // OTP validation state
  const [otpTimer, setOtpTimer] = useState(0); // OTP timer in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false); // Track if timer is running
  const [error, setError] = useState(""); // Error message
  const [emailError, setEmailError] = useState(""); // Email-specific error
  const otpInputRefs = useRef([]); // Refs for OTP input fields

  // Dynamic heading based on flow
  const heading = {
    forgotPassword: "Forget Password",
    verifyAccount: "Verify Account",
    default: "Verify OTP",
  }[flow];

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(""); // Clear error when typing
  };

  // Handle email sending/editing
  const handleEmailAction = () => {
    if (isEmailEditable) {
      // User is trying to send the email
      if (!email.trim()) {
        setEmailError("Email field cannot be empty");
        return;
      }
      if (!isValidEmail(email)) {
        setEmailError("Please enter a valid email address");
        return;
      }
      
      // Email is valid, disable editing and start OTP timer
      setIsEmailEditable(false);
      setIsTimerRunning(true);
      setOtpTimer(60);
      setEmailError("");
    } else {
      // User wants to edit email - just enable editing
      setIsEmailEditable(true);
      setOtp(Array(6).fill(""));
      setIsTimerRunning(false);
    }
  };

  // Validate email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) {
      return;
    }
    
    const newOtp = [...otp];
    newOtp[index] = value; // Update the specific OTP box
    setOtp(newOtp);
    setError(""); // Clear error when typing

    // Auto-focus to the next input box
    if (value && index < 5) {
      otpInputRefs.current[index + 1].focus();
    }

    // Check if all OTP boxes are filled (only after the last box is filled)
    if (index === 5 && value !== "") {
      validateOtp(newOtp.join("")); // Validate OTP
    }
  };

  // Handle key press for OTP fields
  const handleKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  // Validate OTP (dummy validation for example)
  const validateOtp = (enteredOtp) => {
    const validOtp = "123456"; // Replace with actual OTP validation logic
    if (enteredOtp === validOtp) {
      setIsOtpValid(true);
      setError("");
    } else {
      setIsOtpValid(false);
      setOtp(Array(6).fill("")); // Reset OTP fields if invalid
      setError("Invalid OTP. Please try again."); // Show error message
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // Check if email is provided
    if (!email.trim()) {
      setEmailError("Email field cannot be empty");
      return;
    }
    
    // Check if OTP is complete
    if (otp.some(digit => digit === "")) {
      setError("Please enter 6-digit OTP");
      return;
    }
    
    // Validate the OTP
    const enteredOtp = otp.join("");
    const validOtp = "123456"; // Replace with actual OTP validation logic
    
    if (enteredOtp === validOtp) {
      // OTP is valid, navigate based on flow
      if (flow === "forgotPassword") {
        navigate("/reset-password");
      } else if (flow === "verifyAccount") {
        navigate("/signup");
      } else {
        navigate("/");
      }
    } else {
      setIsOtpValid(false);
      setOtp(Array(6).fill("")); // Reset OTP fields
      setError("Invalid OTP. Please try again.");
    }
  };

  // Handle Resend OTP
  const handleResendOtp = () => {
    setOtp(Array(6).fill("")); // Reset OTP fields
    setOtpTimer(60); // Reset OTP timer
    setIsTimerRunning(true); // Restart the timer
    setError(""); // Clear any existing errors
    // Replace with actual resend logic
  };

  // OTP Timer Logic
  useEffect(() => {
    let timer;
    if (isTimerRunning && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setIsTimerRunning(false); // Stop the timer when it reaches 0
    }
    return () => clearInterval(timer); // Cleanup timer
  }, [otpTimer, isTimerRunning]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">{heading}</h2>

        {/* Email Input */}
        <div className="mb-6">
          <label htmlFor="email" className="px-2 block text-base font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="flex items-center gap-2">
            <input
              type="email"
              id="email"
              value={email}
              placeholder="user@example.com"
              onChange={handleEmailChange}
              disabled={!isEmailEditable}
              className={`w-full px-4 py-2 border ${
                emailError ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-zinc-300`}
            />
            <button
              type="button"
              onClick={handleEmailAction}
              className="text-gray-500"
              aria-label={isEmailEditable ? "Send verification code" : "Edit email"}
            >
              {isEmailEditable ? <Send size={20} /> : <PenLine size={20} />}
            </button>
          </div>
          {emailError && (
            <div className="flex items-center gap-2 mt-1 text-sm text-red-600">
              <CircleX size={16} className="text-red-600" />
              {emailError}
            </div>
          )}
        </div>

        {/* OTP Input */}
        <div className="mb-6">
          <label htmlFor="otp" className="px-2 block text-base font-medium text-gray-700 mb-1">
            OTP
          </label>
          <div className="flex justify-between gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="relative flex items-center">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (otpInputRefs.current[index] = el)} // Assign ref to each input
                  disabled={isEmailEditable} // Disable OTP input if email is still editable
                  className={`w-12 h-12 text-center border ${
                    error ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-zinc-300`}
                />
                {index < 5 && (
                  <span className="absolute top-1/2 right-[-10px] transform -translate-y-1/2 text-gray-600 font-bold">-</span>
                )}
              </div>
            ))}
          </div>
          
          {/* Timer and Resend Link */}
          {!isEmailEditable && (
            <>
              {otpTimer > 0 ? (
                <div className="text-base text-zinc-600 mt-2">
                  OTP expires in <span className="text-zinc-700 font-medium">{otpTimer} sec</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-base text-gray-600">Not received the OTP?</span>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-base text-black hover:underline font-medium"
                  >
                    Resend
                  </button>
                </div>
              )}
            </>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 mt-3 text-sm text-red-600">
              <CircleX size={16} className="text-red-600" />
              {error}
            </div>
          )}
        </div>
        
        {/* Submit Button */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isEmailEditable} // Disable button if email is still editable
            className={`w-full ${
              isEmailEditable ? "bg-gray-600" : "bg-black hover:bg-zinc-800"
            } text-white py-3 px-4 rounded-md transition-colors`}
          >
            Verify OTP
          </button>

          <p className="text-center text-base text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-black underline font-medium">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage; 