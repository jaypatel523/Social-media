import React, { useContext, useEffect } from "react";
import { MediaContext } from "../../Context";
import Navbar from "./Navbar";
import PostSection from "./PostSection";

const Home = () => {
  const { user, setUser } = useContext(MediaContext);

  useEffect(() => {
    setUser({
      userId: sessionStorage.getItem("userId"),
      username: sessionStorage.getItem("username"),
      email: sessionStorage.getItem("email"),
    });
  }, []);

  return (
    <>
      <Navbar />
      <PostSection />
    </>
  );
};

export default Home;
