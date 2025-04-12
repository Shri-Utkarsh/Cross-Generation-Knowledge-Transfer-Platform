import React, { useState } from "react";
import { useParams } from "react-router-dom";

const moduleData = {
  1: {
    title: "Pottery Basics",
    content: "Welcome to Pottery Basics...",
    rating: 4.5,
    reviews: ["Great starter module!", "Very informative!"],
    resources: [
      { name: "Pottery Guide PDF", link: "/resources/pottery-guide.pdf" },
      { name: "Clay Prep Video", link: "/resources/clay-prep.mp4" },
    ],
  },
  2: {
    title: "Wood Carving 101",
    content: "Learn the fundamentals of wood carving.",
    rating: 4.2,
    reviews: ["Nice tools intro.", "Could use more examples."],
    resources: [
      { name: "Carving Patterns", link: "/resources/wood-patterns.pdf" },
    ],
  },
  3: {
    title: "Embroidery for Beginners",
    content: "Start your embroidery journey with this basic module.",
    rating: 4.8,
    reviews: ["Loved the visual steps!", "Super helpful."],
    resources: [
      { name: "Stitch Types PDF", link: "/resources/stitches.pdf" },
      { name: "Thread Guide", link: "/resources/thread-guide.jpg" },
    ],
  },
};

const ModuleDetail = () => {
  const { id } = useParams();
  const mod = moduleData[id];

  const [reviews, setReviews] = useState(mod?.reviews || []);
  const [comment, setComment] = useState("");

  if (!mod) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 font-sans flex items-center justify-center text-red-600 font-semibold p-6">
        ❌ Module not found.
      </div>
    );
  }

  const handleBuy = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, { id, name: mod.title }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${mod.title} added to cart.`);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      const newReviews = [...reviews, comment];
      setReviews(newReviews);
      setComment("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 font-sans text-gray-800 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl border border-gray-200 p-8">
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-6">📘 {mod.title}</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">{mod.content}</p>

        <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-yellow-600">⭐ Rating: {mod.rating}/5</p>
          <div className="mt-2">
            <h4 className="font-semibold">📝 Reviews:</h4>
            <ul className="list-disc ml-6 text-gray-700">
              {reviews.map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a comment..."
            ></textarea>
            <button
              onClick={handleCommentSubmit}
              className="mt-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </div>

        {mod.resources && (
          <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-blue-600">📁 Download Materials</h3>
            <ul className="list-disc ml-6 text-gray-800">
              {mod.resources.map((res, idx) => (
                <li key={idx} className="mb-1">
                  <a
                    href={res.link}
                    download
                    className="text-blue-500 hover:text-blue-700 underline"
                  >
                    {res.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleBuy}
          className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300"
        >
          🛒 Buy This Module
        </button>
      </div>
    </div>
  );
};

export default ModuleDetail;
