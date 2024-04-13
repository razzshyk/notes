import React, { useEffect, useState } from "react";
import homegif from "/background.gif";
import { Link, useNavigate } from "react-router-dom";
import { ToastAlert } from "../utils/toast";
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import {
  Box,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import WavingHandIcon from "@mui/icons-material/WavingHand";

const Home = (props) => {
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = React.useState(false);

  // calling user authentication api (get request)
  const userAuth = () => {
    fetch("/api/auth", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        // console.log("Response status:", res.status);
        return res.json();
      })
      .then((data) => {
        // console.log("Response data:", data);
        if (data.error) {
          ToastAlert(data.error, "error");
          nav("/login");
        } else {
          localStorage.setItem("uid", data._id);
          setUser(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
        if (res.status !== 200) {
          ToastAlert(res.error, "error");
        }
        ToastAlert(
          `${(user.fname + " " + user.lname).toUpperCase()} is logged out`,
          "success"
        );
        localStorage.clear();
        nav("/login");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (user === null) {
    // Check if user state is null
    return (
      <div className="flex justify-center place-items-center h-screen">
        <img src="/loader.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <>
      <div className="absolute flex gap-4 justify-between lg:right-5 right-2 top-2 lg:top-5">
        <Button size="sm" className=" bg-[#4338ca]" onClick={signout}>
          <p className="lg:text-lg text-[10px] tracking-wide">Signout</p>
        </Button>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            variant="filled"
            size="sm"
            className=" bg-[#4338ca]"
            onClick={() => setOpen(true)}
          >
            <p className="lg:text-lg text-[10px] tracking-wide">Profile</p>
          </Button>
        </Stack>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog layout="center" size="lg" variant="soft">
            <ModalClose />
            <DialogTitle>
              <p className="text-center text-4xl flex justify-center">
                Welcome !
              </p><WavingHandIcon fontSize="large"/>
            </DialogTitle>
            <DialogContent>
              <Box
                component={"div"}
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <Box>Your ID : {user._id}</Box>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box
                    variant="p"
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    Your First Name
                    <span className="font-bold">{user.fname}</span>
                  </Box>
                  <Box
                    variant="p"
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    Your Last Name
                    <span className=" font-bold">{user.lname}</span>
                  </Box>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box
                    variant="p"
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    Your Age<span className="font-bold">{user.age + " years"}</span>
                  </Box>
                  <Box
                    variant="p"
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    Your Email<span className=" font-bold">{user.email}</span>
                  </Box>
                </Box>
                <Divider/>
                <Box>
                <Box
                    variant="p"
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    Your Password<span className=" font-bold">{user.password}</span>
                  </Box>
                </Box>
              </Box>
            </DialogContent>
          </ModalDialog>
        </Modal>
      </div>
      <div
        style={{
          backgroundImage: `url(${homegif})`,
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
          <Button
            size="sm"
            onClick={() => nav("/notes")}
            className=" bg-[#c026d3]"
          >
            <p className="lg:text-lg text-[10px] tracking-wide">
              Go To My Notes
            </p>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
