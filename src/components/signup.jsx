import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, CircleCheck } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const rulesRef = useRef(null); // Ref to track the rules container
  const [rulesHeight, setRulesHeight] = useState(0); // State to store the height of the rules container

  const passwordRules = {
    length: password => password.length >= 8 && password.length <= 12,
    alphanumeric: password => /^[a-zA-Z0-9]+$/.test(password),
    cases: password => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
  };

  // Update the height of the rules container when `showRules` changes
  useEffect(() => {
    if (showRules && rulesRef.current) {
      setRulesHeight(rulesRef.current.scrollHeight); // Set height to the actual content height
    } else {
      setRulesHeight(0); // Collapse the height
    }
  }, [showRules]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Ensure password contains only alphanumeric characters
    if (name === 'password' && !/^[a-zA-Z0-9]*$/.test(value)) {
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">Sign Up</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="px-2 block text-base font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              minLength={3}
              maxLength={12}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-zinc-300"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="px-2 block text-base font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setShowRules(true)}
                onBlur={() => setShowRules(false)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-zinc-300"
                maxLength={12}
                
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            {/* Password Rules Container */}
            <div
            style={{
            maxHeight: showRules ? `${rulesRef.current?.scrollHeight}px` : "0",
            transition: "max-height 300ms ease-in-out, opacity 500ms ease-in-out",
            opacity: showRules ? 1 : 0,
            }}
            className="mt-2 space-y-2 text-sm text-gray-600 px-2 pt-1 rounded-md overflow-hidden"
            ref={rulesRef}
            >
            <div className="flex items-center gap-2">
            <CircleCheck
                size={20}
                className={
                passwordRules.length(formData.password)
                    ? 'text-white fill-black'
                    : 'text-stone-400'
                }
            />
                Use 8-12 characters
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck
                  size={20}
                  className={
                    passwordRules.alphanumeric(formData.password)
                      ? 'text-white fill-black'
                      : 'text-zinc-400'
                  }
                />
                Use only letters and numbers
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck
                  size={20}
                  className={
                    passwordRules.cases(formData.password)
                      ? 'text-white fill-black'
                      : 'text-zinc-400'
                  }
                />
                Include uppercase, lowercase, and numbers
              </div>
            </div>
          </div>
        
          <div className='flex flex-col gap-2'> 
            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Sign Up
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

export default SignUpPage;