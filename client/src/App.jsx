import React, { useEffect, useState } from "react";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import { MediaContext } from "./Context";

const App = () => {
  const [user, setUser] = useState({
    userId: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    setUser({
      userId: sessionStorage.getItem("userId"),
      username: sessionStorage.getItem("username"),
      email: sessionStorage.getItem("email"),
    });
  }, []);

  return (
    <>
      <MediaContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </MediaContext.Provider>
    </>
  );
};

export default App;
