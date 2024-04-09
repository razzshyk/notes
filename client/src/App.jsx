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
  const [user, setUser] = useState({});
  const nav = useNavigate();

  // calling user authentication api (get request)
  const userAuth = async () => {
    try {
      const res = await fetch("/api/auth", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 404) {
        // console.log(data.error)
        ToastAlert(data.error, "error");
        nav("/login");
      } else {
        // console.log("user agiya bhaii",data)
        setUser(data);
      }
    } catch (error) {
      // console.log(error);
      console.log("user is not logged in", error.code);
    }
  };

  useEffect(() => {
    userAuth();
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<Home name={user.fname + " " + user.lname} />} />
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
