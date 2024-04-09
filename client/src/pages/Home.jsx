import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { ToastAlert } from "../utils/toast";
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

const Home = (props) => {
  const nav = useNavigate();
  const [user, setUser] = useState({});

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

  const signout = () => {
    fetch("/api/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.status === 200) {
          ToastAlert(res.error, "error");
        }
        ToastAlert(`${props.name.toUpperCase()} is logged out`);
        nav("/login");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div className="absolute lg:right-5 right-2 top-2 lg:top-5">
        <Button size="sm" className=" bg-[#4338ca]">
          <p className="lg:text-lg text-[10px] tracking-wide" onClick={signout}>
            Signout
          </p>
        </Button>
      </div>
      <div
        style={{
          backgroundImage: "url(/background.gif)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="flex flex-col justify-center place-items-center h-screen"
      >
        <div className="flex flex-col gap-2 place-items-center">
          <p
            variant="p"
            className="lg:text-[4rem] font-bold md:text-[3rem] text-[1rem] tracking-wider text-[#0891b2]"
            textgradient="true"
          >
            Welcome To Notes Keeper
          </p>
          <p className="text-center lg:text-[2rem] text-[1rem] tracking-wider  text-[#a5b4fc]">
            {(user.fname + " " + user.lname).toUpperCase()}
          </p>
          <Button size="sm" className=" bg-[#c026d3]">
            <p
              className="lg:text-lg text-[10px] tracking-wide"
              onClick={() => nav("/notes")}
            >
              Go To My Notes
            </p>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
