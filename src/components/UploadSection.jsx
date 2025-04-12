import React, { useState, useEffect } from "react";

const UploadSection = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [uploads, setUploads] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("uploads")) || [];
    setUploads(stored);
  }, []);

  const handleSubmit = () => {
    if (file && desc.trim()) {
      const newUpload = {
        file: file.name,
        description: desc,
        time: new Date().toLocaleString(),
      };

      const updatedUploads = [...uploads, newUpload];
      setUploads(updatedUploads);
      localStorage.setItem("uploads", JSON.stringify(updatedUploads));

      setFile(null);
      setDesc("");
      document.getElementById("fileInput").value = null;
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-indigo-200 font-sans text-gray-800">
      <section className="max-w-3xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-8">
          📤 Upload Progress
        </h2>

        <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4 border border-gray-200">
          <label className="block">
            <span className="text-gray-700 font-medium">Upload file</span>
            <input
              id="fileInput"
              type="file"
              className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          {file && (
            <p className="text-sm text-gray-500">
              Selected: <span className="font-medium">{file.name}</span>
            </p>
          )}

          <label className="block">
            <span className="text-gray-700 font-medium">Description</span>
            <textarea
              className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-sm shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
              placeholder="Describe your work..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </label>

          <button
            onClick={handleSubmit}
            disabled={!file || !desc.trim()}
            className={`w-full font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md ${
              file && desc.trim()
                ? "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white"
                : "bg-gray-300 cursor-not-allowed text-gray-500"
            }`}
          >
            🚀 Submit
          </button>

          {uploads.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Previous Uploads
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {uploads.map((u, i) => (
                  <li
                    key={i}
                    className="bg-gray-50 p-3 rounded border-l-4 border-green-400 shadow-sm"
                  >
                    ✅ <strong>{u.file}</strong>: {u.description}
                    <br />
                    <span className="text-xs text-gray-400">🕒 {u.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default UploadSection;
