import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import notesgif from "/notes.gif";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import BasicModalDialog from "../componenets/BasicModalDialog";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import PricingCards from "../componenets/Pricingcards";
import CircularProgress from "@mui/joy/CircularProgress";

const Notes = () => {
  const nav = useNavigate();
  // calling user authentication api (get request)
  const [notes, setNotes] = React.useState([]);
  const [ref, setRef] = React.useState(false);
  const getNotes = () => {
    fetch("/api/getnotes", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          ToastAlert(data.error, "error");
        } else {
          setRef(true);
          setNotes(data);
          return;
        }
      })
      .catch((e) => console.log("hajdhj", e));
    setRef(false);
  };
  // notes.map((obj,index)=>console.log(obj.title,obj.notes));

  const handleNotesPosted = () => {
    getNotes(); // Re-fetch notes after posting
  };
  React.useEffect(() => {
    getNotes();
  }, []); // fix this issue its not re-render after posting notes

  return (
    <>
      {notesgif ? (
        <div
          style={{
            backgroundImage: `url(${notesgif})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="flex flex-col p-[2rem] lg:p-[4rem] min-h-screen"
        >
          <div className="absolute left-4 top-4">
            <ArrowBackIcon
              onClick={() => nav("/")}
              className="cursor-pointer"
              style={{ color: "white" }}
            />
          </div>
          <div className="text-start mx-auto max-w-screen lg:w-[70rem] lg:mx-auto mt-8">
            <h1 className="text-[#d6d3d1] lg:text-4xl mb-4">Your Notes</h1>
            <BasicModalDialog onNotesPosted={handleNotesPosted} />
            <div className="flex justify-center flex-wrap gap-y-[1rem] lg:gap-2 mt-[2rem]">
              {notes.length > 0 ? (
                notes.map((obj, index) => {
                  return (
                    <PricingCards
                      key1={index}
                      title={obj.title}
                      notes={obj.notes}
                    />
                  );
                })
              ) : (
                <div className="flex justif-center ">
                  <CircularProgress
                    color="primary"
                    size="lg"
                    value={36}
                    variant="plain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center place-items-center h-screen">
          <img src="/loader.gif" />
        </div>
      )}
    </>
  );
};

export default Notes;
