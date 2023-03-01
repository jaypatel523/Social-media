import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MediaContext } from "../../Context";
import { AiFillLike, AiOutlineLike, AiOutlineDelete } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";

const Post = ({ post }) => {
  const { text, imageUrl } = post;
  const { user, setUser } = useContext(MediaContext);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   // console.log("post", post._id);
  //   // console.log("user", user.userId);

  //   axios.get(`/api/post/isLike/${post._id}/${user.userId}`).then((res) => {
  //     if (res.data.liked) {
  //       setIsLiked(true);
  //     }
  //   });
  // }, []);

  const handleLike = () => {
    console.log("like");
    axios
      .put("/api/posts/like", { userId: user.userId, postId: post._id })
      .then((res) => {
        setIsLiked(true);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleUnLike = () => {
    console.log("dislike");
    axios
      .put("/api/posts/unlike", { userId: user.userId, postId: post._id })
      .then((res) => {
        setIsLiked(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    axios
      .get(`/api/posts/getcomments/${post._id}`)
      .then((res) => {
        setComments(res.data[0].comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(comments);

  const handleComment = () => {
    const data = {
      userId: user.userId,
      comment: commentText,
      postId: post._id,
    };
    axios
      .put("/api/posts/comment", data)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
    setCommentText("");
  };

  const handleUnComment = (commentId) => {
    const data = {
      commentId: commentId,
      postId: post._id,
    };
    axios
      .put("/api/posts/uncomment", data)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="mb-20 mobile:text-center max-w-[450px] text-base bg-gray-200">
        <div className="flex items-center p-2">
          <img
            src="../../assets/logo.jpeg"
            alt="profile image"
            className="h-8 w-8 rounded-2xl mr-4"
          />
          <div>{user.name}</div>
        </div>
        <img
          src={`http://localhost:8000/${imageUrl}`}
          alt="post"
          className=""
        />
        <div className="text-start p-2">
          <span className="font-bold">{user.name}</span>
          <span> {text} </span>
        </div>
        <div className="flex justify-between mb-2">
          <div className="flex justify-between">
            {isLiked ? (
              <>
                <div
                  className="p-2 cursor-pointer rounded-full hover:bg-gray-300 ease-in-out duration-200"
                  onClick={handleUnLike}
                >
                  <AiFillLike className="w-6 h-6" />
                </div>
              </>
            ) : (
              <>
                <div
                  className="p-2 cursor-pointer rounded-full hover:bg-gray-300 ease-in-out duration-200"
                  onClick={handleLike}
                >
                  <AiOutlineLike className="w-6 h-6" />
                </div>
              </>
            )}

            <div
              className="p-2 cursor-pointer rounded-full hover:bg-gray-300 ease-in-out duration-200"
              onClick={() => {
                setIsCommentOpen(!isCommentOpen);
              }}
            >
              <FaRegComment className="w-6 h-6" />
            </div>
          </div>
          <div className="p-2 cursor-pointer rounded-full hover:bg-gray-300 ease-in-out duration-200">
            {/* <BsBookmark className="w-6 h-6" /> */}
            <BsFillBookmarkFill className="w-6 h-6" />
          </div>
        </div>
        {isCommentOpen && (
          <>
            <div className="overflow-y-auto max-h-56 bg-gray-200">
              <div className="sticky top-0 flex bg-gray-100">
                <input
                  type="text"
                  placeholder="add comment"
                  className="w-[100%] bg-gray-100 p-2 border-b-2 border-b-gray-400 hover:border-b-black focus:outline-none"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  className="hover:bg-gray-200 p-2 rounded"
                  onClick={handleComment}
                  // onClick={handleUnComment}
                >
                  comment
                </button>
              </div>
              {comments &&
                comments.map((comment, index) => {
                  console.log(comment);
                  return (
                    <div key={index} className="text-start flex p-2">
                      <div className="font-bold mr-4">
                        {comment.commentedBy.name}
                      </div>
                      <div>{comment.text}</div>
                      <div
                        className="items-start"
                        onClick={() => handleUnComment(comment._id)}
                      >
                        <AiOutlineDelete className="p-2 w-10 h-10 cursor-pointer rounded-full hover:bg-gray-300 ease-in-out duration-200" />
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Post;
