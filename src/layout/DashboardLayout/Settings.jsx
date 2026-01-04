import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import LoadingLine from "../../components/LoadingLine";

const Settings = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await updateUserProfile({ displayName, photoURL });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 heading-text-dark-aware">Settings</h1>
      <form onSubmit={handleUpdate} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        {/* Name Field */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium heading-text-dark-aware">Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="input rounded-lg block w-full focus:border-0 focus:outline-gray-300 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Your name"
            required
          />
        </div>

        {/* PhotoURL Field */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium heading-text-dark-aware">Profile Photo URL</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="input rounded-lg block w-full focus:border-0 focus:outline-gray-300 dark:bg-gray-700 dark:text-gray-100"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        {/* Preview */}
        {photoURL && (
          <div className="flex items-center gap-4">
            <p className="font-medium heading-text-dark-aware">Preview:</p>
            <img
              src={photoURL}
              alt="Profile Preview"
              className="w-16 h-16 rounded-full object-cover border border-gray-300 dark:border-gray-600"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn bg-purple-600 text-white w-full hover:opacity-90"
        >
          {submitting ? "Updating..." : "Update Profile"}
        </button>

        {submitting && <LoadingLine />}
      </form>
    </div>
  );
};

export default Settings;
