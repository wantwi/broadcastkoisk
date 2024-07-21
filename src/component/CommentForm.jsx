import React, { useState } from "react";
import axios from "axios";

const CommentForm = ({ getPost, postId, parentId = null }) => {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5600/posts/${postId}/comments`, {
        content,
        parentId,
        name,
      })
      .then((response) => {
        getPost();
        setContent("");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter name"
        name="name"
        onChange={(e) => setName(e.target.value)}
        style={{ border: "1px solid #ddd" }}
        className="w-full p-2 bg-gray-200 border-gray-700 mb-2"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment"
        style={{ width: "100%", border: "1px solid #ddd", padding: 8 }}
        rows={3}
      ></textarea>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button
          type="button"
          onClick={() => setContent("")}
          className="font-medium rounded-md text-black bg-gray-600 flex justify-center text-center w-24 py-2 px-5 hover:opacity-90 transition-all duration-200 mt-1"
        >
          Cancel
        </button>
        <button
          className="font-medium rounded-md text-white bg-dark flex justify-center text-center w-24 py-2 px-5 hover:opacity-90 transition-all duration-200 mt-1"
          type="submit"
          disabled={content.length === 0 ? true : false}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
