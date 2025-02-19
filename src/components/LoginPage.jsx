import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Basic validation
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    console.log("Form submitted:", formData);

    // Navigate only after successful validation
    navigate("/layout");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
        <div>
        <h2 className="text-3xl font-bold text-center mb-8 text-black">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700 mb-1 px-2 "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-700"
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="px-2 block text-base font-medium text-gray-700 mb-1"
            >
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
                className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <Link
                to="/forget-password"
                className="text-sm text-gray-700 underline font-medium pr-2"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Login
            </button>

            <p className="text-center text-base text-gray-600">
              Don't have an account?{" "}
              <Link to="/verify-account" className="text-black underline font-medium">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
