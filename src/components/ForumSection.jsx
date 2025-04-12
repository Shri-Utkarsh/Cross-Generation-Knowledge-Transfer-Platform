import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForumSection = ({ forumPosts, onNewPost }) => {
  const [user, setUser] = useState("");
  const [question, setQuestion] = useState("");
  const [comments, setComments] = useState({});

  const handleComment = (index, comment) => {
    setComments({
      ...comments,
      [index]: [...(comments[index] || []), comment],
    });
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-semibold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
        🧠 Forums
      </h2>

      <div className="flex justify-center mb-4">
        <Link
          to="/forum"
          className="text-blue-600 hover:underline font-semibold text-lg"
        >
          🗣️ Go to Forum
        </Link>
      </div>

      <div className="space-y-6">
        {forumPosts.map((post, index) => (
          <div
            key={index}
            className="border p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-all"
          >
            <p className="font-semibold text-lg">{post.user}:</p>
            <p className="mt-2 text-lg">{post.question}</p>
            <div className="mt-4">
              <ul className="mt-2 text-sm text-gray-600">
                {(comments[index] || []).map((c, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="text-gray-800">💬</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Ask a Question</h3>
        <div className="space-y-4">
          <input
            className="border border-gray-300 px-4 py-2 w-full md:w-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            className="border border-gray-300 px-4 py-2 w-full md:w-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            onClick={() => {
              if (user && question) {
                onNewPost(user, question);
                setUser("");
                setQuestion("");
              }
            }}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full md:w-auto hover:bg-blue-600 transition-all"
          >
            Post
          </button>
        </div>
      </div>
    </section>
  );
};

export default ForumSection;
