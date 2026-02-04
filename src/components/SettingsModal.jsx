import React, { useState } from "react";
import { uploadProfileImage } from "../firebase/firebaseUtility";
import { toast } from "react-toastify";

const SettingsModal = ({ user, onClose }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file first");

    setLoading(true);
    try {
      await uploadProfileImage(file);
      toast.success("Profile updated successfully!");
      onClose(); // Close modal on success
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-xl w-[300px] shadow-2xl">
        <h2 className="text-xl font-bold mb-4 text-center">Settings</h2>
        
        <div className="flex flex-col items-center gap-4">
          <label className="cursor-pointer group relative">
            <img 
              src={file ? URL.createObjectURL(file) : (user?.image || "defaultAvatarURL")} 
              className="w-24 h-24 rounded-full object-cover border-4 border-[#01aa85]"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs">Change</span>
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>

          <p className="text-xs text-gray-500 text-center">Max size: 2KB</p>

          <button 
            onClick={handleUpload}
            disabled={loading}
            className="w-full bg-[#01aa85] text-white py-2 rounded-lg font-bold disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Save Changes"}
          </button>
          
          <button onClick={onClose} className="text-gray-400 text-sm">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;