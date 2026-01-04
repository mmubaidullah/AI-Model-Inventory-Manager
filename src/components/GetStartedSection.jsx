// src/components/GetStartedSection.jsx
import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
// import { Link } from "react-router-dom";

const GetStartedSection = () => {
  const { user } = useContext(AuthContext) || {};

  return (
    <section className="pb-8 mt-10 mb:mb-8 md:mx-8 lg:mx-10 mx-4">
      <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-1 heading-text-dark-aware text-center leading-relaxed ">
        Get Started
      </h1>
      <p className="text-lg mb-5 text-gray-500 text-center leading-relaxed">
        Ready to manage AI models? Register or log in now to start organizing,
        tracking, and exploring AI models in one place.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {user ? (
          <>
            <Link
              to="/models"
              className="btn bg-[#6A00FF] hover:bg-[#5a00d6] text-white border-none px-8 rounded-xl shadow-lg"
            >
              Explore Models
            </Link>
            <Link
              to="/dashboard/add-model"
              className="btn btn-outline border-[#9D4EDD] text-[#9D4EDD] hover:bg-purple-50 px-8 rounded-xl"
            >
              Add Model
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="btn bg-[#6A00FF] hover:bg-[#5a00d6] text-white border-none px-8 rounded-xl"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="btn btn-outline border-[#9D4EDD] text-[#9D4EDD] hover:bg-purple-50 px-8 rounded-xl"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default GetStartedSection;
