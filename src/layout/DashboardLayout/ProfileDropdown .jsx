import React, { useState, useRef, useEffect } from "react";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ক্লিক করলে ড্রপডাউন টগল হবে
  const toggleDropdown = () => setOpen(!open);

  // বাইরে ক্লিক করলে ড্রপডাউন বন্ধ করার জন্য
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center focus:outline-none"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {/* প্রোফাইল ছবি */}
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User Profile"
          className="w-10 h-10 rounded-full border-2 border-purple-600"
        />
        {/* ডাউন এrow */}
        <svg
          className={`ml-2 h-4 w-4 transform transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white">
          <div
            className="py-1 text-gray-700"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => alert("Logging out...")}
              className="w-full text-left px-4 py-2 hover:bg-red-100 hover:text-red-700 text-red-600 cursor-pointer"
              role="menuitem"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
