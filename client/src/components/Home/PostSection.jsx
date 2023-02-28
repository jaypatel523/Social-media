import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import Suggestion from "./Suggestion";
import PostNow from "./PostNow";
import axios from "axios";
import { MediaContext } from "../../Context";
import { AiFillCamera } from "react-icons/ai";

const PostSection = () => {
  const { user, setUser } = useContext(MediaContext);
  const [isPost, setIsPost] = useState(false);
  const [allPost, setAllPost] = useState();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    // console.log("hi");
    axios
      .get(`/api/getallposts`)
      .then((res) => {
        // console.log(res);
        setAllPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isPost]);

  const handlePost = (e) => {
    e.preventDefault();
    const userId = user.userId;

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", image);

    axios
      .post(`/api/new/post/${userId}`, formData)
      .then((res) => {
        setIsPost(true);
        console.log("post created", res);
      })
      .catch((err) => {
        console.log("error while creating post", err);
      });

    setIsPost(false);
    setCaption("");
    setImage(null);
  };

  // console.log(posts);

  return (
    <>
      <div className="mx-10 text-center  mobile:text-center align-middle mt-6 md:grid grid-cols-2">
        <div className="text-2xl flex flex-col justify-center items-center">
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
              id="imageFile"
              className="hidden invisible w-[450px] my-4"
              name="post"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <label htmlFor="imageFile">
              <AiFillCamera className="cursor-pointer my-2 w-12 h-12 p-2 rounded-[50%] hover:bg-gray-200 ease-in-out duration-300" />
            </label>
            <input
              type="text"
              id="file"
              placeholder="Caption..."
              className="w-[450px] p-2 pb-4 border-b-2 border-b-gray-400 hover:border-b-black focus:outline-none mb-4"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <div className="text-left">
              <button
                className="bg-gray-200 px-4 py-2 hover:bg-gray-300 ease-in-out duration-100 rounded-2xl"
                type="submit"
              >
                Post Now
              </button>
            </div>
          </form>
          {allPost &&
            allPost.map((post, index) => {
              return <Post key={index} post={post} />;
            })}
        </div>
        {/* <div className="w-1 h-[100vh] border-l-2 border-black mb-1"></div> */}
        <div className="text-2xl text-center hidden md:block">
          <Suggestion />
        </div>
      </div>
    </>
  );
};

export default PostSection;
