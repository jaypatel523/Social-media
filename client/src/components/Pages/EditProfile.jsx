import React, { useContext, useState } from "react";
import { MediaContext } from "../../Context";

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const { user, setUser } = useContext(MediaContext);
  const [username, setUserName] = useState(user.username);

  const editProfile = () => {
    
  };

  return (
    <>
      <div className="mt-10 flex flex-col items-center border border-black mx-60 p-10">
        <div className="flex flex-col items-center w-full">
          <input type="file" name="" id="profile" className="hidden" />
          <label htmlFor="profile" className="cursor-pointer inline-flex mb-4">
            <img
              src="../../../assets/default_profile.jpeg"
              alt="profile image"
              className="rounded-full w-40 h-40"
              id="profile"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
          </label>
          <div className="" id="profile">
            Edit your picture
          </div>
        </div>
        <div className="flex flex-col items-start mt-10 w-full">
          <label htmlFor="name" className="">
            Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-200 hover:border-gray-400 focus:outline-none p-2"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start mt-4 w-full">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="w-full border border-gray-200 hover:border-gray-400 focus:outline-none p-2"
            id="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start mt-4 w-full">
          <label htmlFor="bio">Bio</label>
          <textarea
            type="text"
            rows={3}
            className="w-full border border-gray-200 hover:border-gray-400 focus:outline-none p-2"
            id="bio"
            placeholder="content after . appear in new line"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="w-full text-center mt-4">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
