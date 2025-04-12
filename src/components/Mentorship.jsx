import React from "react";
import { Link } from "react-router-dom";

const Mentorship = ({ mentors }) => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold mb-6 text-center drop-shadow-sm">
        <span>🤝</span>{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
          Mentorship Arena
        </span>
      </h2>

      <div className="flex justify-center mb-8">
        <Link
          to="/book-session"
          className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition duration-300"
        >
          📅 Book a Mentor
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {mentors.map((mentor, i) => (
          <div
            key={i}
            className="bg-white/20 backdrop-blur-md shadow-2xl border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
          >
            <div>
              <p className="text-xl font-bold text-gray-800 mb-1">
                👨‍🏫 {mentor.name}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                🧠 Skill: <span className="font-medium">{mentor.skill}</span>
              </p>
            </div>

            <span
              className={`inline-block mt-4 px-3 py-1 text-sm font-medium rounded-full ${
                mentor.available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {mentor.available
                ? "✅ Available for Sessions"
                : "⛔ Currently Unavailable"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Mentorship;
