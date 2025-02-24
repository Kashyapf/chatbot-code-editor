import React, { useState } from 'react';
import NavBar from './NavBar'; // Import the NavBar component

const DiscoverCourse = () => {
  // State for NavBar
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Login/logout functions
  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentUser({
      name: "Jane Doe",
      email: "jane.doe@example.com",
      profileImage: null
    });
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const frontendCourses = [
    { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  ];

  const backendCourses = [
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  ];

  const codingLanguages = [
    { name: 'C', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
    { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredFrontendCourses = frontendCourses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredBackendCourses = backendCourses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredCodingLanguages = codingLanguages.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const CourseCard = ({ course }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
      <img src={course.logo} alt={`${course.name} logo`} className="h-20 w-20 mb-4" />
      <h3 className="text-lg font-medium text-gray-800">{course.name}</h3>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* NavBar at the top with sticky position */}
      <div className="sticky top-0 z-50 w-full">
        <NavBar 
          isLoggedIn={isAuthenticated} 
          user={currentUser || {}}
          onLogout={handleLogout}
        />
      </div>
      
      {/* Main content */}
      <div className="flex-grow max-w-6xl mx-auto px-4 py-12 w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">Learn by Building</h1>
        <p className="text-xl text-center text-zinc-500 mb-8">Hands-on projects, no more huddles</p>
         
        <div className="mb-10 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search for a language..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-12">
          {/* Frontend Section */}
          {filteredFrontendCourses.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frontend</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {filteredFrontendCourses.map((course, index) => (
                  <CourseCard key={`frontend-${index}`} course={course} />
                ))}
              </div>
            </div>
          )}

          {/* Backend Section */}
          {filteredBackendCourses.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Backend</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {filteredBackendCourses.map((course, index) => (
                  <CourseCard key={`backend-${index}`} course={course} />
                ))}
              </div>
            </div>
          )}

          {/* Coding Languages Section */}
          {filteredCodingLanguages.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Coding Languages</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {filteredCodingLanguages.map((course, index) => (
                  <CourseCard key={`coding-${index}`} course={course} />
                ))}
              </div>
            </div>
          )}

          {/* Show message if no courses match search */}
          {filteredFrontendCourses.length === 0 && 
           filteredBackendCourses.length === 0 && 
           filteredCodingLanguages.length === 0 && (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">No courses match your search. Try another term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscoverCourse;