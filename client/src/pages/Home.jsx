import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { ToastAlert } from "../utils/toast";
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
const Home = (props) => {
  return (
    <>
      <div
        style={{
          backgroundImage: "url(/background.gif)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="flex flex-col justify-center place-items-center h-screen"
      >
        <div className="flex flex-col gap-2 place-items-center">
          <p variant="p" className="lg:text-[4rem] font-bold md:text-[3rem] text-[1rem] tracking-wider text-[#0891b2]" textGradient>
            Welcome To Notes Keeper
          </p>
          <p className="text-center lg:text-[2rem] text-[1rem] tracking-wider  text-[#a5b4fc]">
            {props.name.toUpperCase()}
          </p>  
          <Button size="sm" className=" bg-[#c026d3]">
            <p className="lg:text-lg text-[10px] tracking-wide">Go To My Notes</p>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
