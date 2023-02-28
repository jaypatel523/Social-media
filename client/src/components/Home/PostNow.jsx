import axios from "axios";
import { useContext, useState } from "react";
import React from "react";
// import { AiFillCamera } from "react-icons/ai";
import { MediaContext } from "../../Context";
import Post from "./Post";

const PostNow = () => {
  const { user, setUser } = useContext(MediaContext);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handlePost = (e) => {
    e.preventDefault();
    const userId = user.userId;

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", image);

    axios
      .post(`/api/new/post/${userId}`, formData)
      .then((res) => {
        console.log("post created", res);
      })
      .catch((err) => {
        console.log("error while creating post", err);
      });

    setCaption("");
    setImage(null);
  };

  return (
    <>
      <form
        className="mb-20 mobile:text-center max-w-[450px] text-base"
        onSubmit={handlePost}
        encType="multipart/form-data"
      >
        <div className="flex items-center p-2 bg-gray-200">
          <img
            src="../../assets/logo.jpeg"
            alt="profile image"
            className="h-8 w-8 rounded-2xl mr-4"
          />
          <div>Username</div>
        </div>
        <input
          type="file"
          className="w-[450px] my-4"
          name="post"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Caption..."
          className="w-[450px] p-2 pb-4 border-b-2 border-b-gray-400 hover:border-b-black focus:outline-none mb-4"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <div className="text-left">
          <button
            className="bg-gray-200 px-2 py-1 hover:bg-gray-300 ease-in-out duration-100"
            type="submit"
          >
            Post Now
          </button>
        </div>
      </form>
    </>
  );
};

export default PostNow;
