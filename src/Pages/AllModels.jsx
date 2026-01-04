import React, { use, useEffect, useState } from "react";
import { ModelCard } from "../components/ModelCard";
import { AuthContext } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const AllModels = () => {
  const [models, setModels] = useState([]);
  const [search, setSearch] = useState(""); // সার্চ টেক্সটের জন্য স্টেট
  const [framework, setFramework] = useState("");
  const { setLoading, loading } = use(AuthContext);

  // লাইভ সার্চ এবং ফিল্টারিং লজিক
  useEffect(() => {
    const fetchFilteredModels = async () => {
      setLoading(true);
      try {
        // সার্চ এবং ফ্রেমওয়ার্ক অনুযায়ী API কল
        const res = await fetch(
          `${
            import.meta.env.VITE_SERVER_API_URL
          }/search?search=${search}&framework=${framework}`
        );
        const data = await res.json();
        setModels(data);
      } catch (err) {
        console.error("Error fetching models:", err);
      } finally {
        setLoading(false);
      }
    };

    // Debouncing: ইউজার টাইপ করা বন্ধ করার ৫০০ মিলি-সেকেন্ড পর API কল হবে
    const timeoutId = setTimeout(() => {
      fetchFilteredModels();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search, framework, setLoading]); // search অথবা framework পরিবর্তন হলেই এটি কাজ করবে

  // ফর্ম সাবমিট হ্যান্ডলার (যদি কেউ এন্টার চাপে)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mx-4 md:mx-6 lg:mx-10">
      <h1 className="text-center heading-text-dark-aware lg:text-4xl md:text-3xl text-2xl font-bold mt-12 mb-4 leading-relaxed">
        All Models
      </h1>

      <p className="text-center max-w-2xl mx-auto text-gray-500 mb-12 leading-relaxed">
        Explore our complete collection of AI models — from creative generators
        to smart assistants. Each model is designed to push the boundaries of
        innovation and help you achieve more with intelligent automation.
      </p>

      {/* Search & Filter Section */}
      <form
        onSubmit={handleSearchSubmit}
        className="mt-5 mb-10 flex flex-wrap gap-4 justify-center"
      >
        {/* ----- Live Search Input ---- */}
        <label className="input rounded-full border border-gray-300 flex items-center gap-2 px-4">
          <svg
            className="h-5 w-5 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            name="search"
            type="search"
            placeholder="Search by name..."
            className="grow outline-none bg-transparent py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // টাইপ করার সাথে সাথে স্টেট আপডেট
          />
        </label>

        {/* ---- Framework Dropdown ---- */}
        <select
          value={framework}
          onChange={(e) => setFramework(e.target.value)}
          className="select select-bordered rounded-full px-6"
        >
          <option value="">All Frameworks</option>
          <option value="TensorFlow">TensorFlow</option>
          <option value="PyTorch">PyTorch</option>
          <option value="JAX">JAX</option>
          <option value="Keras">Keras</option>
          <option value="Scikit-learn">Scikit-learn</option>
          <option value="Hugging Face">Hugging Face</option>
        </select>
      </form>

      {/* Loading & Model Display Section */}
      {loading ? (
        <div className="flex justify-center py-20">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {models.length > 0 ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 md:gap-5 py-2 mb-10">
              {models.map((model) => (
                <ModelCard key={model._id} model={model} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-400">
                Oops! No AI models found for your search.
              </h2>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllModels;
