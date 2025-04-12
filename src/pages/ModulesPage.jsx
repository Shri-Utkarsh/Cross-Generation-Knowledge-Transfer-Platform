import React, { useState } from "react";
import { Link } from "react-router-dom";

const modules = [
  { id: 1, title: "Pottery Basics", description: "Learn how to shape and bake clay." },
  { id: 2, title: "Wood Carving 101", description: "Start carving simple patterns in wood." },
  { id: 3, title: "Embroidery Essentials", description: "Thread, needles, and the magic in between." },
];

const ModulesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredModules = modules.filter((mod) =>
    mod.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 font-sans text-gray-800 flex items-center justify-center py-10">
      <div className="w-full max-w-4xl px-6">
        <h2 className="text-4xl font-extrabold text-indigo-800 mb-8 text-center">📚 Modules</h2>

        <input
          type="text"
          placeholder="Search modules..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-8 w-full p-4 border-2 border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />

        <div className="space-y-8">
          {filteredModules.length > 0 ? (
            filteredModules.map((mod) => (
              <Link
                key={mod.id}
                to={`/modules/${mod.id}`}
                className="block border-2 border-indigo-300 p-6 rounded-xl bg-white shadow-lg hover:bg-blue-50 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold text-indigo-700">{mod.title}</h3>
                <p className="text-sm text-gray-600">{mod.description}</p>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No modules found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModulesPage;
