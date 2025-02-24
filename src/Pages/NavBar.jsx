import React, { useState } from 'react';

// NavBar Component
const NavBar = ({ isLoggedIn, user, onLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };
  
  return (
    <nav className="flex items-center justify-between bg-white shadow-md px-6 py-3">
      {/* Logo on left */}
      <div className="flex-shrink-0">
        <img src="/api/placeholder/120/40" alt="Logo" className="h-8" />
      </div>
      
      {/* Right side authentication */}
      <div className="relative">
        {isLoggedIn ? (
          <>
            <button 
              onClick={toggleProfileMenu}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none"
              aria-label="Open profile menu"
            >
              {user.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt={`${user.name}'s profile`}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-lg font-semibold">
                  {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                </span>
              )}
            </button>
            
            {/* Profile dropdown menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b">
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
                <ul>
                  <li>
                    <a 
                      href="/profile" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <button 
                      onClick={onLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <a
            href="/signin"
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Sign In
          </a>
        )}
      </div>
    </nav>
  );
};

export default NavBar;