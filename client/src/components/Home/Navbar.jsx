import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigateTo = useNavigate();

  const [isHamOpen, setIsHamOpen] = useState(false);
  const handleHamburger = () => {
    setIsHamOpen(!isHamOpen);
  };

  const handleProfile = () => {
    navigateTo("/profile");
  };

  return (
    <div className="border-b-2">
      <div className="py-2 mx-10 flex justify-between items-center">
        <span className="ml-4 cursor-pointer text-xl md:text-3xl sm:text-2xl">
          Instagram
        </span>
        <div className="mr-4 hidden md:block">
          <span className="mx-2 p-2 cursor-pointer hover:bg-gray-300 ease-in-out duration-200">
            Home
          </span>
          <span className="mx-2 p-2 cursor-pointer hover:bg-gray-300 ease-in-out duration-200">
            Messages
          </span>
          <span className="mx-2 p-2 cursor-pointer hover:bg-gray-300 ease-in-out duration-200">
            Notifications
          </span>
          <span
            className="mx-2 p-2 cursor-pointer hover:bg-gray-300 ease-in-out duration-200"
            onClick={handleProfile}
          >
            Profile
          </span>
          <span className="mx-2 p-2 cursor-pointer hover:bg-gray-300 ease-in-out duration-200">
            Logout
          </span>
        </div>
        <button
          className="mr-4 cursor-pointer flex flex-col ease-in-out duration-200 md:hidden"
          onClick={handleHamburger}
        >
          <span className="w-full">
            <div className="w-5 h-1 bg-gray-600 mb-1"></div>
            <div className="w-5 h-1 bg-gray-600 mb-1"></div>
            <div className="w-5 h-1 bg-gray-600 mb-1"></div>
          </span>
        </button>
        {isHamOpen && (
          <>
            <div className="bg-gray-200 absolute top-0 right-0 py-4 flex flex-col w-[200px] h-full md:hidden">
              <button
                className="py-2 hover:bg-gray-300 text-center"
                onClick={handleHamburger}
              >
                Close
              </button>
              <span className="text-center w-full py-2 hover:bg-gray-300 cursor-pointer">
                Home
              </span>
              <span className="text-center w-full py-2 hover:bg-gray-300 cursor-pointer">
                Messages
              </span>
              <span className="text-center w-full py-2 hover:bg-gray-300 cursor-pointer">
                Notifications
              </span>
              <span
                className="text-center w-full py-2 hover:bg-gray-300 cursor-pointer"
                onClick={handleProfile}
              >
                Profile
              </span>
              <span className="text-center w-full py-2 hover:bg-gray-300 cursor-pointer">
                Logout
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
