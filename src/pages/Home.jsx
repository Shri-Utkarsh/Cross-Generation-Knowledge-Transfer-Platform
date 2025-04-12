// src/pages/Home.jsx
import React, { useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import LearningModules from "../components/LearningModules";
import Mentorship from "../components/Mentorship";
import UploadSection from "../components/UploadSection";
import ForumSection from "../components/ForumSection";
import Marketplace from "../components/Marketplace";
import { CartContext } from "../context/CartContext";

function Home() {
  const { addToCart } = useContext(CartContext);

  const [uploads, setUploads] = useState([]);
  const [forumPosts, setForumPosts] = useState([
    { user: "Anita", question: "How do I dry clay quickly?" },
    { user: "Vikram", question: "Any tips for knife grip in wood carving?" },
  ]);
  const [mentors] = useState([
    { name: "Mr. Sharma", skill: "Woodworking", available: true },
    { name: "Mr. Utkarsh", skill: "Craft", available: true },
    { name: "Ms. Kaur", skill: "Pottery", available: false },
  ]);
  const [products] = useState([
    { id: 1, title: "Handcrafted Wooden Spoon", price: "₹300" },
    { id: 1, title: "Artisanal Clay Pot", price: "₹600" },
    { id: 1, title: "Craftsmanship Wooden Knife", price: "₹500" },
    { id: 2, title: "Clay Tea Cup Set", price: "₹550" },
  ]);
  const [buyMessage, setBuyMessage] = useState("");

  // Memoized functions to avoid unnecessary re-renders
  const handleUpload = useCallback((file, description) => {
    setUploads((prevUploads) => [...prevUploads, { file, description }]);
  }, []);

  const handleNewPost = useCallback((user, question) => {
    setForumPosts((prevPosts) => [...prevPosts, { user, question }]);
  }, []);

  const handleBuy = useCallback(
    (product) => {
      if (!product) return; // Avoid empty product

      addToCart(product);
      setBuyMessage(
        `✅ You bought "${product.title}" and it was added to your cart!`
      );
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        setBuyMessage(""); // Clear message after 3 seconds
      }, 3000);
    },
    [addToCart]
  );

  return (
    <div className="bg-gradient-to-r from-blue-100 to-indigo-200 min-h-screen font-sans text-gray-800">
      <header className="text-center p-6 sm:p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md rounded-b-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          🧓 Cross-Generation Knowledge Platform 👶
        </h1>
        <p className="text-base sm:text-lg mt-2 sm:mt-3">
          Preserving skills. Connecting generations.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/modules"
            className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition-all duration-200 w-full sm:w-auto"
          >
            Browse Modules
          </Link>
          <Link
            to="/cart"
            className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition-all duration-200 w-full sm:w-auto"
          >
            View Cart
          </Link>
        </div>
      </header>

      {buyMessage && (
        <div className="text-center bg-green-100 border border-green-400 text-green-700 py-3 rounded-md shadow-lg mt-6 mx-4 sm:mx-8">
          {buyMessage}
        </div>
      )}

      <main className="p-6 sm:p-8 space-y-12">
        <LearningModules />
        <Mentorship mentors={mentors} />
        <UploadSection uploads={uploads} onUpload={handleUpload} />
        <ForumSection forumPosts={forumPosts} onNewPost={handleNewPost} />
        <Marketplace products={products} onBuy={handleBuy} />
      </main>

      <footer className="bg-blue-700 text-white text-center py-4 mt-12">
        <p className="text-sm">
          © 2025 Cross-Generation Knowledge Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
