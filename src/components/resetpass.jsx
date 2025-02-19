import React, { useState, useRef } from "react";
import { Eye, EyeOff, CircleCheck, CircleX  } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {

  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState(""); // New password field
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password field
  const [showNewPassword, setShowNewPassword] = useState(false); // Toggle new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm password visibility
  const [showRules, setShowRules] = useState(false); // Toggle password rules visibility
  const [error, setError] = useState(""); // Error message
  const rulesRef = useRef(null); // Ref for password rules container
  
  // Password rules
  const passwordRules = {
    length: password => password.length >= 8 && password.length <= 12,
    cases: password => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password),
    special: password => /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };

  // Handle new password change
  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    if (value.length <= 12) { // Enforce max length of 12
      setNewPassword(value);
    }
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Validate password rules
  const validatePasswordRules = (password) => {
    return (
      passwordRules.length(password) &&
      passwordRules.cases(password) &&
      passwordRules.special(password)
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate new password rules
    if (!validatePasswordRules(newPassword)) {
      setError("Password must follow the rules!");
      return;
    }
  
    // Validate confirm password
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    // If all validations pass
    alert("Password reset successful!"); // Replace with API call to reset password
  
    // Navigate only after successful validation
    navigate("/layout");
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
  
        <h2 className="text-3xl font-bold text-center mb-8 text-black">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password Field */}
          <div className="relative">
            <label htmlFor="newPassword" className="px-2 block text-base font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                onFocus={() => setShowRules(true)}
                onBlur={() => setShowRules(false)}
                className={`w-full px-4 py-2 border ${
                  error && !validatePasswordRules(newPassword)
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-zinc-300`}
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Password Rules */}
            <div
              ref={rulesRef}
              style={{
                maxHeight: showRules ? `${rulesRef.current?.scrollHeight}px` : "0",
                transition: "max-height 300ms ease-in-out, opacity 300ms ease-in-out",
                opacity: showRules ? 1 : 0,
              }}
              className="mt-2 space-y-2 text-sm text-gray-600 px-2 pt-2 rounded-md overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <CircleCheck
                  size={16}
                  className={
                    passwordRules.length(newPassword)
                      ? 'text-white fill-black'
                      : 'text-stone-400'
                  }
                />
                Use at least 8 characters
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck
                  size={16}
                  className={
                    passwordRules.cases(newPassword)
                      ? 'text-white fill-black'
                      : 'text-zinc-400'
                  }
                />
                Include uppercase, lowercase, and numbers
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck
                  size={16}
                  className={
                    passwordRules.special(newPassword)
                      ? 'text-white fill-black'
                      : 'text-zinc-400'
                  }
                />
                Include special symbols (e.g., @, #, $, &)
              </div>
            </div>

            {/* Error Message */}
            {error && !validatePasswordRules(newPassword) && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <CircleX size={18} className="text-red-600" />
                {error}
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="px-2 block text-base font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`w-full px-4 py-2 border ${
                  error && newPassword !== confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-zinc-300`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Error Message for Confirm Password */}
            {error && newPassword !== confirmPassword && (
              <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                <CircleX size={18} className="text-red-600" />
                {error}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className='flex flex-col gap-2'> 
            <button
              type="submit" 
              className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Reset Password
            </button>

            <p className="text-center text-base text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-black underline font-medium">
                Login
              </a>
            </p>      
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;