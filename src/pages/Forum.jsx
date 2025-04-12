// src/pages/Forum.jsx
import React, { useState } from "react";

const initialPosts = [
  {
    id: 1,
    username: "alice",
    content: "How to start wood carving?",
    replies: [],
  },
  {
    id: 2,
    username: "bob",
    content: "Where can I buy embroidery kits?",
    replies: [],
  },
];

const Forum = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [replyInputs, setReplyInputs] = useState({});

  const handleReplyChange = (postId, text) => {
    setReplyInputs((prev) => ({ ...prev, [postId]: text }));
  };

  const handleReplySubmit = (postId) => {
    if (!replyInputs[postId].trim()) return; // Prevent submitting empty replies

    const newPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            replies: [...post.replies, replyInputs[postId]],
          }
        : post
    );
    setPosts(newPosts);
    setReplyInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 font-sans text-gray-800">
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
          💬 Forum
        </h1>
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-200 hover:shadow-xl transition duration-300"
          >
            <div className="flex items-center space-x-2">
              <p className="font-semibold text-gray-800">@{post.username}</p>
              <p className="text-sm text-gray-500">Posted 2 hours ago</p>
            </div>
            <p className="text-gray-800 mt-4 text-lg">{post.content}</p>

            {/* Replies */}
            <div className="ml-6 mt-4">
              <h4 className="text-gray-600 font-medium mb-2">
                Replies ({post.replies.length})
              </h4>
              <ul className="ml-2 text-sm text-gray-700 space-y-2">
                {post.replies.map((reply, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span>💬</span>
                    <p>{reply}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reply input */}
            <div className="mt-6 flex flex-col md:flex-row items-start gap-4">
              <input
                type="text"
                value={replyInputs[post.id] || ""}
                onChange={(e) => handleReplyChange(post.id, e.target.value)}
                className="flex-1 border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Reply to this post..."
              />
              <button
                onClick={() => handleReplySubmit(post.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
