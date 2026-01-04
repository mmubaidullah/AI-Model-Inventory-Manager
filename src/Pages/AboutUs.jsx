import React from "react";
import { ShieldCheck, Cpu, Layout } from "lucide-react"; // lucide-react icons

const AboutUs = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen py-12 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#6A00FF] to-[#9D4EDD] bg-clip-text text-transparent">
            About AI Model Inventory Manager
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Empowering AI developers to organize, track, and share cutting-edge
            machine learning models in one unified platform.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
              The AI Model Inventory Manager was born out of a need for a
              streamlined approach to managing the rapidly growing ecosystem of
              Artificial Intelligence. Our mission is to bridge the gap between
              model development and accessibility.
            </p>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              We provide a robust cataloging system where practitioners can
              manage metadata, track usage metrics, and document frameworks like
              TensorFlow and PyTorch with precision and ease.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-gray-800 p-8 rounded-2xl border border-blue-100 dark:border-gray-700">
            <img
              src="https://img.freepik.com/free-vector/artificial-intelligence-ai-processor-chip-concept-motherboard-digital-integrated-circuit-board_39422-771.jpg"
              alt="AI Concept"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Core Values / Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow">
            <Cpu className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Technical Clarity</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Detailed metadata management including datasets, frameworks, and
              specific use cases for every AI model.
            </p>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow">
            <Layout className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Intuitive Interface</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A responsive, production-ready UI designed to provide a seamless
              experience across all devices.
            </p>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow">
            <ShieldCheck className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Secure Management</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Role-based access control ensuring creators have full authority
              over their innovative contributions.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-indigo-500 dark:from-purple-700 dark:to-blue-700 rounded-3xl p-10 text-white">
          <h2 className="text-3xl font-bold mb-4">
            The Future of AI Management
          </h2>
          <p className="max-w-3xl mx-auto opacity-90">
            As AI continues to transform industries, our platform evolves to
            meet the needs of data scientists worldwide. We are committed to
            maintaining a high standard of data integrity and collaborative
            tools for the global tech community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
