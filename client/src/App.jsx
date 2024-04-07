import { useState } from "react";
import SimpleRegistrationForm from "./Signup";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signup" element={<SimpleRegistrationForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
