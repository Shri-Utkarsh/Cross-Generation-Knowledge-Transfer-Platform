import React from "react";

const LearningModules = () => {
  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">📚 Learning Modules</h2>
      
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <video controls className="w-full rounded-t-xl">
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>

        <div className="p-6 space-y-4">
          <p className="text-xl font-semibold">Wood Carving Basics</p>
          <p className="text-gray-700">
            This module explains hand carving techniques, ideal for beginners and enthusiasts alike.
          </p>

          <div className="mt-4 p-6 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
            🧱 <span className="font-medium">3D Model Placeholder</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningModules;
