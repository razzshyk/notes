import React from "react";
import { useState,useEffect } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Login() {
  const [load, setLoad] = useState(false);
  const [LregData, setLregData] = useState({
    email: "",
    password: "",
  });
  const submit = async (e) => {
    e.preventDefault();
    setLoad(true);
    const res = await fetch("/api/login", {     
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(LregData),
    })
      .then((res) => {
        if (res) {
          console.log("data sucessfully handed to backend", LregData);
          setLoad(false);
          setLregData({email:"",password:""});
        }
      })
      .catch((e) => {
        setLoad(false);
        console.log(e);
      });
  };
  return (
    <Card
      color="transparent"
      className="flex justify-center place-items-center h-screen"
      shadow={false}
    >
      <Typography variant="h4" color="blue-gray">
        Login
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form method="POST" className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            onChange={(e) => {
              setLregData({ ...LregData, email: e.target.value });
            }}
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            onChange={(e) => {
              setLregData({ ...LregData, password: e.target.value });
            }}
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
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
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-gray-900">
            Signup
          </Link>
        </Typography>
      </form>
    </Card>
  );
}
