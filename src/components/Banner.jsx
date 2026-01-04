import React, { useContext } from "react";
// import bannerLogo from "../assets/AI_model.webp"
import MotionSlider from "./MotionSlider/MotionSlider";
import { Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";


const Banner = () => {
  const { user } = useContext(AuthContext) || {};
  return (
    <div className="lg:mx-8 md:mx-6 mx-4 py-12 lg:py-20">
      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-10 min-h-[400px]">
        {/* Left Side: Text Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
          <div className="mb-4">
            <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-widest inline-block">
              ✨ The Future is Here
            </span>
          </div>
          <h1 className="font-black lg:text-5xl md:text-4xl text-3xl leading-tight heading-text-dark-aware mb-6">
            Talk to {" "}
            <span className="bg-gradient-to-r from-[#6A00FF] to-[#9D4EDD] bg-clip-text text-transparent">
              Tomorrow’s
            </span>{" "}
            <br />
            Technology Today
          </h1>
          <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Manage your AI models with ease. Explore a world of innovation where
            technology meets seamless communication.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            {user ? (
              <>
                <Link
                  to="/models"
                  className="btn bg-[#6A00FF] hover:bg-[#5a00d6] text-white border-none px-8 rounded-xl shadow-lg"
                >
                  Explore Models
                </Link>
                <Link
                  to="/add-model"
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
              </>
            )}
          </div>
        </div>

        {/* Right Side: Slider Box */}
        <div className="w-full lg:w-1/2 h-full rounded-3xl mt-10 lg:mt-0">
          <div className="w-full h-full">
            <MotionSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
