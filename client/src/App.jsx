import React, { useState } from "react";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import { MediaContext } from "./Context";

const App = () => {
  const [user, setUser] = useState({
    userId: "",
    name: "",
    email: "",
  });

  return (
    <>
      <MediaContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </MediaContext.Provider>
    </>
  );
};

export default App;
