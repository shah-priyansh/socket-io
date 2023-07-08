import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Chat, Error } from "./pages";

const App = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    const data = {
      _id: crypto.randomUUID(),
      username: "test-demo",
    };
    localStorage.setItem("user", JSON.stringify(data));
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;
