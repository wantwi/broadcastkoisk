import React, { useState } from "react";
import {
  FaThumbsUp,
  FaHeart,
  FaReply,
  FaThumbsDown,
  FaEye,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";
import axios from "axios";
import IMG from "../assets/images/pro.jpg";
import moment from "moment";
const Comment = ({ getPost, postId, comment, parentId }) => {
  const [show, setShow] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");

  console.log({ postId, comment, parentId });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5600/posts/${postId}/comments`, {
        content,
        parentId,
        name,
      })
      .then((response) => {
        // Handle success (e.g., update the comment list)
        getPost();
        setContent("");
        setName("");
        setShow(false);
        setShowReply(true);
      });
  };

  return (
    <div
      style={{
        marginBottom: 10,
        padding: "10px 10px 0 15px",
        width: "100%",
        borderLeft: showReply ? "2px dotted blueviolet" : "none",
        background: "#f3f4f6",
      }}
      className="rounded-md bg-gray-100"
    >
      <div className="flex gap-1">
        <div>
          <img src={IMG} width={45} style={{ borderRadius: 50 }} />
        </div>
        <div style={{ padding: 0, margin: 0 }}>
          <span
            className="text-sm text-purple-500"
            style={{ fontSize: 11, marginLeft: 11, color: "cornflowerblue" }}
          >
            {comment?.name || "NA"}
          </span>
          <span style={{ fontSize: 10, marginLeft: 5, color: "teal" }}>
            {moment(comment?.createdAt).fromNow()}
          </span>
          <p
            style={{
              padding: 10,
              paddingTop: 0,
              // background: comment?.parentId === null ? "#f2f2f2" : "#fff",
              borderRadius: 5,
              textWrap: "wrap",
              width: "100%",
            }}
          >
            {comment?.content}
          </p>
        </div>
      </div>
      {show && (
        <form onSubmit={handleSubmit} className="mt-1">
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            style={{ border: "1px solid #ddd" }}
            className="w-full p-2 bg-gray-200 border-gray-700 mb-2"
          />
          <div>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              style={{
                width: "100%",
                border: "1px solid #e1e1e1",
                padding: 8,
                marginTop: 10,
              }}
              rows={2}
            ></textarea>
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              className="font-medium rounded-md text-black bg-gray-600 flex justify-center text-center text-sm  w-24 py-2 px-5 hover:opacity-90 transition-all duration-200 mt-1"
              onClick={() => setShow(!show)}
            >
              Cancel
            </button>
            <button className="font-medium rounded-md text-white bg-dark flex justify-center text-center text-sm w-24 py-2 px-5 hover:opacity-90 transition-all duration-200 mt-1">
              Submit
            </button>
          </div>
        </form>
      )}
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        {!show && (
          <div>
            <buttom
              className="bg-slate-800 text-sm cursor-pointer mr-2"
              onClick={() => setShow(!show)}
            >
              Reply
            </buttom>
          </div>
        )}
        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          {/* <FaThumbsUp />
          <FaThumbsDown />
          <FaHeart /> */}
          {comment.replies.length > 0 && (
            <h6
              style={{
                fontSize: 14,
                cursor: "pointer",
                margin: 0,
                padding: 0,
                color: "blueviolet",
              }}
              onClick={() => setShowReply(!showReply)}
            >
              Replies
            </h6>
          )}
        </div>
      </div>
      <div style={{ border: "0px solid" }}>
        {comment?.replies && comment.replies.length > 0 && (
          <>
            {showReply && (
              <div style={{ marginLeft: 5, padding: 1 }}>
                {comment.replies.toReversed().map((reply, index) => (
                  <div
                    key={reply.id}
                    // className={index === 0 ? 'first-reply-border' : ''}
                    //style={{borderLeft: index === 0 ?"1px solid red":"none"}}
                  >
                    <Comment
                      parentId={reply.id}
                      postId={comment?.postId}
                      comment={reply}
                      getPost={getPost}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
