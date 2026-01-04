// DashboardLayout.jsx
import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router";
import { Outlet } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineDatabase,
  HiOutlinePlusCircle,
  HiOutlineCog,
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineCollection,
  HiMenuAlt2,
} from "react-icons/hi";
import Navbar from "../../components/Navbar";

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Theme toggle
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const menuItems = [
    { name: "Overview", path: "/dashboard", icon: <HiOutlineViewGrid size={22} /> },
    { name: "My Added Models", path: "/dashboard/my-models", icon: <HiOutlineCollection size={22} /> },
    { name: "Purchase History", path: "/dashboard/model-purchase-page", icon: <HiOutlineShoppingBag size={22} /> },
    { name: "Add New Model", path: "/dashboard/add-model", icon: <HiOutlinePlusCircle size={22} /> },
    { name: "All Inventory", path: "/models", icon: <HiOutlineDatabase size={22} /> },
    { name: "Settings", path: "/dashboard/settings", icon: <HiOutlineCog size={22} /> },
  ];

  return (
    <div className="flex h-screen font-sans max-w-7xl mx-auto pt-16 bg-slate-50 dark:bg-gray-900">
      
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-72" : "w-20"
        } bg-white dark:bg-gray-900 border-r border-slate-200 dark:border-gray-700 transition-all duration-300 flex flex-col hidden md:flex`}
      >
        {/* Sidebar Header */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-100 dark:border-gray-700 h-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg bg-purple-600 text-white shadow-md shadow-purple-200"
            >
              <HiMenuAlt2 size={24} />
            </button>
            {isSidebarOpen && (
              <div className="hidden sm:block">
                <p className="text-xs text-slate-400 dark:text-gray-400 font-medium uppercase tracking-wider">
                  Workspace
                </p>
                <h1 className="text-lg font-bold text-slate-800 dark:text-gray-100">
                  User Dashboard
                </h1>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 mt-4 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive
                  ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                  : "text-slate-500 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 hover:text-slate-700 dark:hover:text-white"
                }
              `}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {isSidebarOpen && <span className="font-medium">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-gray-700">
          <Link
            to="/"
            className="flex items-center gap-4 px-4 py-3 text-slate-500 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl transition-all"
          >
            <HiOutlineHome size={22} />
            {isSidebarOpen && <span className="font-medium">Back to Home</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-slate-200 dark:border-gray-700 sticky top-0 z-10 py-2 flex items-center justify-between px-8">
          <Navbar theme={theme} toggleTheme={toggleTheme} />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
