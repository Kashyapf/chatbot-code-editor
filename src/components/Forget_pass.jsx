import React, { useState, useRef, useEffect } from "react";
import { Send, PenLine } from "lucide-react";

const VerifyOtpPage = () => {
  const [email, setEmail] = useState("user@example.com"); // Default email
  const [isEmailEditable, setIsEmailEditable] = useState(false); // Toggle email edit state
  const [otp, setOtp] = useState(Array(6).fill("")); // OTP input fields
  const [isOtpValid, setIsOtpValid] = useState(false); // OTP validation state
  const [otpTimer, setOtpTimer] = useState(0); // OTP timer in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false); // Track if timer is running
  const otpInputRefs = useRef([]); // Refs for OTP input fields

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Toggle email edit mode
  const toggleEmailEdit = () => {
    if (isEmailEditable) {
      // If editing is being disabled (Pencil icon clicked), start the OTP timer
      setIsTimerRunning(true);
      setOtpTimer(60);
    }
    setIsEmailEditable(!isEmailEditable);
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value; // Update the specific OTP box
    setOtp(newOtp);

    // Auto-focus to the next input box
    if (value && index < 5) {
      otpInputRefs.current[index + 1].focus();
    }

    // Check if all OTP boxes are filled (only after the last box is filled)
    if (index === 5 && value !== "") {
      validateOtp(newOtp.join("")); // Validate OTP
    }
  };

  // Validate OTP (dummy validation for example)
  const validateOtp = (enteredOtp) => {
    const validOtp = "123456"; // Replace with actual OTP validation logic
    if (enteredOtp === validOtp) {
      setIsOtpValid(true);
      alert("OTP is valid!"); // Replace with actual success logic
    } else {
      setIsOtpValid(false);
      setOtp(Array(6).fill("")); // Reset OTP fields if invalid
      alert("Invalid OTP. Please try again."); // Replace with actual error logic
    }
  };

  // Handle Resend OTP
  const handleResendOtp = () => {
    setOtp(Array(6).fill("")); // Reset OTP fields
    setOtpTimer(60); // Reset OTP timer
    setIsTimerRunning(true); // Restart the timer
    alert("OTP has been resent!"); // Replace with actual resend logic
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
        <h2 className="text-3xl font-bold text-center mb-8 text-black">Sign up</h2>

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
              onChange={handleEmailChange}
              disabled={!isEmailEditable}
              maxLength={25}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-zinc-300"
            />
            <button
              type="button"
              onClick={toggleEmailEdit}
              className="text-gray-500"
            >
              {isEmailEditable ? <PenLine size={20} /> : <Send size={20} />}
            </button>
          </div>
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
                  maxLength={1}
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  ref={(el) => (otpInputRefs.current[index] = el)} // Assign ref to each input
                  className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-zinc-300"
                />
                {index < 5 && (
                  <span className="absolute top-1/2 right-[-13px] transform -translate-y-1/2 text-zinc-500 font-extrabold">-</span>
                )}
              </div>
            ))}
          </div>
          {/* Timer and Resend Link */}
          {isTimerRunning ? (
            otpTimer > 0 ? (
              <div className="text-base text-gray-700 mt-2">
                OTP expires in <span className="text-gray-800 font-medium">{otpTimer} seconds</span> 
              </div>
            ) : (
              <div className="flex items-center gap-1 mt-2">
                <span className="text-base text-gray-600">Not received the OTP?</span>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-base text-black hover:underline"
                >
                  Resend
                </button>
              </div>
            )
          ) : null}
        </div>

        {/* Submit Button */}
        <div className='flex flex-col gap-2'> 
            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Verify OTP
            </button>

            <p className="text-center text-base text-gray-600">
              Already have an account?{' '}
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