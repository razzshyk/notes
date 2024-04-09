import { useEffect, useState } from "react";
import SimpleRegistrationForm from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ToastAlert } from "./utils/toast";

function App() {
  
  

  

  return (
    <>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/signup" element={<SimpleRegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        limit={1}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </>
  );
}

export default App;
