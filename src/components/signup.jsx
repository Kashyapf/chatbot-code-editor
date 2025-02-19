import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, CircleCheck, AlertCircle } from 'lucide-react';
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
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false
  });

  const rulesRef = useRef(null);
  const [rulesHeight, setRulesHeight] = useState(0);

  const passwordRules = {
    length: password => password.length >= 8 && password.length <= 12,
    alphanumeric: password => /^[a-zA-Z0-9]+$/.test(password),
    cases: password => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
  };

  // Calculate if all password rules are met
  const passwordValid = (password) => {
    return Object.values(passwordRules).every(rule => rule(password));
  };

  // Update the height of the rules container when `showRules` changes
  useEffect(() => {
    if (showRules && rulesRef.current) {
      setRulesHeight(rulesRef.current.scrollHeight);
    } else {
      setRulesHeight(0);
    }
  }, [showRules]);

  const validateField = (name, value) => {
    let errorMessage = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          errorMessage = 'Name is required';
        } else if (value.length < 3) {
          errorMessage = 'Name must be at least 3 characters';
        } else if (value.length > 12) {
          errorMessage = 'Name must be at most 12 characters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          errorMessage = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMessage = 'Email address is invalid';
        }
        break;
      case 'password':
        if (!value) {
          errorMessage = 'Password is required';
        } else if (!passwordValid(value)) {
          if (!passwordRules.length(value)) {
            errorMessage = 'Password must be 8-12 characters';
          } else if (!passwordRules.alphanumeric(value)) {
            errorMessage = 'Password must only contain letters and numbers';
          } else if (!passwordRules.cases(value)) {
            errorMessage = 'Password must include uppercase, lowercase, and numbers';
          }
        }
        break;
      default:
        break;
    }
    
    return errorMessage;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For password, ensure it contains only alphanumeric characters
    if (name === 'password' && value !== '' && !/^[a-zA-Z0-9]*$/.test(value)) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const errorMessage = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
    
    if (name === 'password') {
      setShowRules(false);
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    if (name === 'password') {
      setShowRules(true);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(key => {
      const errorMessage = validateField(key, formData[key]);
      newErrors[key] = errorMessage;
      if (errorMessage) {
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      password: true
    });
    
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Redirecting to dashboard after successful signup
      navigate('/layout');
    } else {
      console.log('Form has errors, please check');
    }

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
              onBlur={handleBlur}
              onFocus={handleFocus}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-zinc-300 ${
                touched.name && errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {touched.name && errors.name && (
              <p className="text-red-500 text-sm mt-1 px-2 flex items-center">
                <AlertCircle size={16} className="mr-1" /> {errors.name}
              </p>
            )}
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
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-zinc-300 ${
                  touched.password && errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
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
            
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm mt-1 px-2 flex items-center">
                <AlertCircle size={16} className="mr-1" /> {errors.password}
              </p>
            )}
            
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