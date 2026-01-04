import React, { useEffect, useState, useContext } from "react";
import logo from "../assets/idea.png";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

import { Link, NavLink, useLocation } from "react-router";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  const handleSignOut = () => {
    signOutUser()
      .then((result) => {
        console.log(result);
        // toast("Logout successfully")
      })
      .catch((error) => {
        console.log(error.message);
        toast(error.message);
      });
  };

  // ----Theme Toggle---
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // ________________

  return (
    <div className="navbar w-full py-2 lg:px-12 md:px-8 px-4 z-50 gap-2">
      {" "}
       <div className="flex-none lg:hidden">
        {!isDashboard && (
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              ☰
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/models">View Models</NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/dashboard/add-model">Add Model</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/about-us">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="navbar-start">
        <Link to={"/"} className="flex items-center gap-2 md:text-xl font-bold">
          <img className="w-10 h-10 rounded-full" src={logo} alt="Logo" />
          <h2 className="bg-gradient-to-r from-[#6A00FF] to-[#9D4EDD] bg-clip-text text-transparent ">
            MODELS INVENTORY
          </h2>
        </Link>
      </div>
     
      <div className="navbar-center hidden lg:flex">
        {" "}
        {!isDashboard && (
          <ul className="menu menu-horizontal px-1 gap-6">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/models"}>View Models</NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={"/dashboard/add-model"}>Add Model</NavLink>
              </li>
            )}
            <li>
              <NavLink to={"/about-us"}>About Us</NavLink>
            </li>
          </ul>
        )}
      </div>
      <div className="navbar-end gap-3">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full flex items-center justify-center"
        >
          <span className="text-xl">{theme === "light" ? "☀️" : "🌙"}</span>
        </button>

        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn-ghost btn-circle avatar"
            >
              <div className="w-10 h-10 p-[2px] rounded-full bg-gradient-to-r from-[#6A00FF] to-[#9D4EDD]">
                <img
                  className="rounded-full"
                  src={user?.photoURL || "https://i.ibb.co/m0p9Y78/user.png"}
                  alt="User"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <div className="px-4 py-2 border-b border-gray-100 italic font-bold">
                <p className="text-xs">{user.displayName}</p>
              </div>
              <li>
                <Link to="/dashboard">User Dashboard</Link>
              </li>
              {/* <li><Link to="/dashboard/my-models">My Models</Link></li>
                <li><Link to="/dashboard/model-purchase-page">Purchase History</Link></li> */}
              <li>
                <button
                  onClick={handleSignOut}
                  className="text-red-500 font-bold"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to={"/login"} className="btn btn-primary btn-sm text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
