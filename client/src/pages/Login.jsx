import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { ToastAlert } from "../utils/toast";

export default function Login() {
  const nav = useNavigate();
  const [load, setLoad] = useState(false);
  const [LregData, setLregData] = useState({
    email: "",
    password: "",
  });
  const submit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LregData),
      });
      const data = await res.json(); // Await the promise
      const errorStatuses = [400, 401];
      if (errorStatuses.includes(res.status) || !data) {
        setLoad(false);
        console.log(data);
        ToastAlert(data.error, "error");
      } else {
        setLoad(false);
        console.log("Data successfully handed to backend", data);
        setLregData({ email: "", password: "" });
        nav("/");
        ToastAlert(`${res.status} user logged in`, "success");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoad(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url(/Сomet.gif)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="flex flex-col justify-center place-items-center h-screen"
    >
      <div className="flex flex-col p-[2rem] mx-[3rem] shadow-2xl rounded-3xl">
        <Typography variant="h4" color="white">
          Login
        </Typography>
        <Typography color="white" className="mt-1 font-normal">
          Nice to meet you! Enter your details to login
        </Typography>
        <form method="POST" className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="white" className="-mb-3">
              Your Email
            </Typography>
            <Input
              onChange={(e) => {
                setLregData({ ...LregData, email: e.target.value });
              }}
              size="lg"
              style={{
                color: "white",
                letterSpacing: "1px",
                fontWeight: "700",
                fontSize: "1rem",
              }}
              placeholder="name@mail.com"
              className="text-slate-300 !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="white" className="-mb-3">
              Password
            </Typography>
            <Input
              onChange={(e) => {
                setLregData({ ...LregData, password: e.target.value });
              }}
              type="password"
              style={{
                color: "white",
                letterSpacing: "1px",
                fontWeight: "700",
                fontSize: "1rem",
              }}
              size="lg"
              placeholder="********"
              className="text-slate-300 !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="white"
                className="flex items-center font-normal"
              >
                I agree the
                <a className="font-medium transition-colors hover:text-gray-900">
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button onClick={submit} className="mt-6" fullWidth>
            {!load ? "Login" : "Loading..."}
          </Button>
          <Typography color="white" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-gray-900">
              Signup
            </Link>
          </Typography>
        </form>
      </div>
    </div>
  );
}
