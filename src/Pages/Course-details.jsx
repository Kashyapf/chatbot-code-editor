import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Github, Twitter, Linkedin } from 'lucide-react';
import NavBar from './NavBar'; // Import the NavBar component

// Import the course card component from previous implementation
const CourseCard = ({ course }) => (
  <a href={course.link || "#"} className="block">
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
      <img src={course.logo} alt={`${course.name} logo`} className="h-16 w-16 mb-4" />
      <h3 className="text-lg font-medium text-gray-800">{course.name}</h3>
    </div>
  </a>
);

// Reusable SubProject Component (with light grey background)
const SubProject = ({ title, duration, completed = false, link = "#" }) => (
  <a href={link} className="block">
    <div className="flex items-center justify-between p-4 mb-2 rounded hover:bg-gray-100 hover:text-blue-600 transition-colors">
      <h4 className="text-sm font-medium">{title}</h4>
      <span className="text-xs text-gray-600">{duration}</span>
    </div>
  </a>
);

// Reusable Project Component with Dropdown functionality (removed shadow)
const Project = ({ title, duration, progress = 0, subProjects = [], link = "#" }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-4 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-all">
      <a href={link} className="block">
        <div className="p-4 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium hover:text-blue-600 transition-colors">{title}</h3>
          </div>
          
          {/* Progress Ring */}
          <div className="relative w-10 h-10 mr-4">
            <svg className="w-10 h-10" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#e6e6e6" strokeWidth="2"></circle>
              <circle 
                cx="18" cy="18" r="16" 
                fill="none" 
                stroke="#4299e1" 
                strokeWidth="2"
                strokeDasharray={`${2 * Math.PI * 16 * progress / 100} ${2 * Math.PI * 16}`}
                strokeDashoffset="0"
                transform="rotate(-90 18 18)"
              />
              <text 
                x="18" 
                y="18" 
                dominantBaseline="middle" 
                textAnchor="middle" 
                fontSize="10"
                fontWeight="bold"
              >
                {progress}%
              </text>
            </svg>
          </div>
          
          <span className="text-sm text-gray-600">{duration}</span>
          <button 
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(!isOpen);
            }}
            className="ml-2 p-1 rounded-full hover:bg-gray-100"
          >
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </a>
      
      {isOpen && (
        <div className="px-4 pb-4 border-t border-gray-100">
          {subProjects.map((subProject, index) => (
            <SubProject 
              key={index} 
              title={subProject.title} 
              duration={subProject.duration}
              completed={subProject.completed}
              link={subProject.link}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Small Progress Bar Component for hero section
const SmallProgressBar = ({ progress = 0 }) => (
  <div className="w-full max-w-xs bg-gray-200 rounded-full h-2">
    <div 
      className="bg-blue-800 h-2 rounded-full" 
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

// Sticky Navigation Component
const StickyNav = ({ title, visible }) => (
  <div 
    className={`fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-transform duration-300 ${
      visible ? 'transform translate-y-0' : 'transform -translate-y-full'
    }`}
  >
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  </div>
);

// Main Course Details Component
const CourseDetails = ({ 
  courseTitle = "JavaScript Fundamentals",
  courseDescription = "Master JavaScript with hands-on projects and real-world examples",
  courseFullDescription = "This comprehensive JavaScript course will take you from basics to advanced concepts through hands-on projects. You'll learn modern ES6+ syntax, DOM manipulation, asynchronous programming with Promises and async/await, and how to build interactive web applications. Perfect for beginners and those looking to refresh their JavaScript skills.",
  courseImage = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  totalProgress = 35,
  totalDuration = "8 weeks",
  rating = 4.8,
  enrolled = false,
  socialLinks = {
    github: "https://github.com/your-repo",
    twitter: "https://twitter.com/your-handle",
    linkedin: "https://linkedin.com/in/your-profile"
  },
  projects = [
    {
      title: "Interactive Web Form",
      duration: "2 weeks (12h)",
      progress: 80,
      link: "#project1",
      subProjects: [
        { title: "Setting up the project", duration: "1h", completed: true, link: "#sub1" },
        { title: "Form validation basics", duration: "2h", completed: true, link: "#sub2" },
        { title: "Dynamic form elements", duration: "3h", completed: false, link: "#sub3" },
        { title: "Accessibility considerations", duration: "2h", completed: false, link: "#sub4" },
        { title: "Final form submission", duration: "4h", completed: false, link: "#sub5" }
      ]
    },
    {
      title: "Budget Tracker Application",
      duration: "3 weeks (18h)",
      progress: 40,
      link: "#project2",
      subProjects: [
        { title: "Project structure & planning", duration: "2h", completed: true, link: "#sub6" },
        { title: "Data storage implementation", duration: "4h", completed: true, link: "#sub7" },
        { title: "UI for transaction entry", duration: "4h", completed: false, link: "#sub8" },
        { title: "Visualization components", duration: "5h", completed: false, link: "#sub9" },
        { title: "Exporting & sharing data", duration: "3h", completed: false, link: "#sub10" }
      ]
    },
    {
      title: "Weather Dashboard",
      duration: "2 weeks (15h)",
      progress: 0,
      link: "#project3",
      subProjects: [
        { title: "API integration basics", duration: "3h", completed: false, link: "#sub11" },
        { title: "Location services", duration: "2h", completed: false, link: "#sub12" },
        { title: "Displaying weather data", duration: "4h", completed: false, link: "#sub13" },
        { title: "Forecast visualization", duration: "3h", completed: false, link: "#sub14" },
        { title: "Offline functionality", duration: "3h", completed: false, link: "#sub15" }
      ]
    },
    {
      title: "Social Media Dashboard",
      duration: "3 weeks (20h)",
      progress: 0,
      link: "#project4",
      subProjects: [
        { title: "Authentication flow", duration: "4h", completed: false, link: "#sub16" },
        { title: "Feed component", duration: "5h", completed: false, link: "#sub17" },
        { title: "Interactive elements", duration: "4h", completed: false, link: "#sub18" },
        { title: "Notification system", duration: "3h", completed: false, link: "#sub19" },
        { title: "User profile page", duration: "4h", completed: false, link: "#sub20" }
      ]
    },
    {
      title: "E-commerce Product Page",
      duration: "2 weeks (16h)",
      progress: 0,
      link: "#project5",
      subProjects: [
        { title: "Product gallery", duration: "3h", completed: false, link: "#sub21" },
        { title: "Product variations", duration: "4h", completed: false, link: "#sub22" },
        { title: "Shopping cart functionality", duration: "4h", completed: false, link: "#sub23" },
        { title: "User reviews component", duration: "3h", completed: false, link: "#sub24" },
        { title: "Related products carousel", duration: "2h", completed: false, link: "#sub25" }
      ]
    }
  ],
  suggestedCourses = [
    { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", link: "#html" },
    { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", link: "#css" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", link: "#react" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", link: "#nodejs" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", link: "#typescript" }
  ]
}) => {
  const [isEnrolled, setIsEnrolled] = useState(enrolled);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const navbarHeight = 64; // Approximate height of the navbar in pixels

  // Handle login/logout
  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentUser({
      name: "Jane Doe",
      email: "jane.doe@example.com",
      profileImage: null,
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setShowStickyNav(heroBottom <= navbarHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top NavBar that moves with the page (not sticky) */}
      <div className="w-full bg-white shadow-md z-10">
        <NavBar 
          isLoggedIn={isAuthenticated} 
          user={currentUser || {}}
          onLogout={handleLogout}
        />
      </div>
      
      {/* Sticky Navigation that appears on scroll */}
      <StickyNav title={courseTitle} visible={showStickyNav} />
      
      {/* Hero Banner */}
      <div ref={heroRef} className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
            {/* Logo on top for mobile */}
            <div className="flex justify-center w-full md:hidden mb-6">
              <img 
                src={courseImage} 
                alt={`${courseTitle} logo`} 
                className="w-32 h-32"
              />
            </div>
            
            <div className="md:w-7/12 mb-8 md:mb-0">
              <h1 className="text-4xl font-bold mb-4">{courseTitle}</h1>
              <p className="text-xl mb-4">{courseDescription}</p>
              
              {/* Small progress bar for hero section */}
              <SmallProgressBar progress={totalProgress} />
              
              {/* Mobile/Tablet Info - Visible only on small screens */}
              <div className="flex flex-wrap items-center text-sm md:hidden mt-4">
                <span className="mr-6 mb-2">
                  <span className="font-medium">{totalDuration}</span> to complete
                </span>
                <span className="mr-6 mb-2">
                  <span className="font-medium">{rating}</span> rating
                </span>
                <div className="flex space-x-2 mb-2">
                  <a href={socialLinks.github} className="hover:text-blue-200" aria-label="GitHub">
                    <Github size={18} />
                  </a>
                  <a href={socialLinks.twitter} className="hover:text-blue-200" aria-label="Twitter">
                    <Twitter size={18} />
                  </a>
                  <a href={socialLinks.linkedin} className="hover:text-blue-200" aria-label="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Hidden on mobile, visible on larger screens */}
            <div className="hidden md:block md:w-4/12 justify-center">
              <img 
                src={courseImage} 
                alt={`${courseTitle} logo`} 
                className="w-48 h-48"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Enrollment Section */}
      <div className="md:hidden bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <h2 className="text-lg font-bold mb-3">Enrollment</h2>
          <button 
            onClick={() => setIsEnrolled(!isEnrolled)}
            className={`w-full py-2 px-4 rounded-md font-medium ${
              isEnrolled 
                ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isEnrolled ? 'Unenroll from Course' : 'Enroll in Course'}
          </button>
        </div>
      </div>
      
      {/* Course Content with sticky right panel */}
      <div ref={contentRef} className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Left Side (Scrollable) */}
          <div className="w-full md:w-3/5 md:pr-6">
            {showStickyNav && <div className="h-12"></div>} {/* Spacer when sticky nav is visible */}
            
            {/* Course Description Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
              <h2 className="text-xl font-bold mb-3">Course Description</h2>
              <p className="text-gray-700">
                {showFullDescription 
                  ? courseFullDescription 
                  : `${courseFullDescription.substring(0, 150)}...`}
              </p>
              <button 
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm mt-2"
              >
                {showFullDescription ? 'Show Less' : 'Show More'}
              </button>
            </div>
            
            {/* Projects List */}
            <h2 className="text-2xl font-bold mb-6">Course Content</h2>
            <div className="space-y-4">  {/* Added spacing between projects */}
              {projects.map((project, index) => (
                <Project 
                  key={index}
                  title={project.title}
                  duration={project.duration}
                  progress={project.progress}
                  subProjects={project.subProjects}
                  link={project.link}
                />
              ))}
            </div>
            
            {/* Suggested Courses */}
            <div className="mt-12 mb-12">
              <h2 className="text-2xl font-bold mb-6">Suggested Courses</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">  {/* Increased gap between course cards */}
                {suggestedCourses.map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Side (Fixed on desktop) */}
          <div className="hidden md:block md:w-2/5 md:pl-6">
            <div className="sticky top-20" style={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
              {/* Enrollment Box */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                <h2 className="text-xl font-bold mb-4">Enrollment</h2>
                <button 
                  onClick={() => setIsEnrolled(!isEnrolled)}
                  className={`w-full py-2 px-4 rounded-md font-medium ${
                    isEnrolled 
                      ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isEnrolled ? 'Unenroll from Course' : 'Enroll in Course'}
                </button>
              </div>
              
              {/* Course Info */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-bold mb-4">About This Course</h2>
                <p className="text-gray-700 mb-4">
                  {courseDescription}
                </p>
                
                <div className="mb-4">
                  <span className="block text-sm text-gray-500 mb-1">Course Rating</span>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold mr-2">{rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="block text-sm text-gray-500 mb-1">Duration</span>
                  <span className="text-xl font-medium">{totalDuration}</span>
                </div>
                
                <div>
                  <span className="block text-sm text-gray-500 mb-1">Connect With Us</span>
                  <div className="flex space-x-4">
                    <a href={socialLinks.github} className="text-gray-600 hover:text-gray-800" aria-label="GitHub">
                      <Github size={24} />
                    </a>
                    <a href={socialLinks.twitter} className="text-gray-600 hover:text-gray-800" aria-label="Twitter">
                      <Twitter size={24} />
                    </a>
                    <a href={socialLinks.linkedin} className="text-gray-600 hover:text-gray-800" aria-label="LinkedIn">
                      <Linkedin size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;