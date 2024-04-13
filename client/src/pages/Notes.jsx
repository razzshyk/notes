import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import notesgif from "/notes.gif";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import BasicModalDialog from "../componenets/BasicModalDialog";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import PricingCards from "../componenets/Pricingcards";
import CircularProgress from "@mui/joy/CircularProgress";
import DeleteModal from "../componenets/DeleteModal";

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
  // notes.map((obj,index)=>console.log(obj));

  const handleNotesPosted = () => {
    //child to parent prop passing technique call again when user posts a note
    getNotes();
  };
  React.useEffect(() => {
    getNotes();
  }, []);

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
              fontSize="large"
              onClick={() => nav("/")}
              className="cursor-pointer"
              style={{
                color: "black",
                backgroundColor: "#e2e8f0",
                borderRadius: "18px",
                padding: "7px",
              }}
            />
          </div>
          <div className="text-start mx-auto max-w-screen lg:w-[70rem] lg:mx-auto mt-[4rem] lg:mt-8">
            <h1 className="text-[#d6d3d1] lg:text-4xl mb-4">Your Notes</h1>
            <div className="flex justify-between">
              <BasicModalDialog onNotesPosted={handleNotesPosted} />
              <DeleteModal deletAll={"Delete All"} handleNotesPosted={handleNotesPosted} />
            </div>
            <div className="flex justify-center flex-wrap md:gap-x-[2rem] gap-[1rem] lg:gap-2 mt-[3rem]">
              {notes.length > 0 ? (
                notes.map((obj, index) => {
                  return (
                    <PricingCards
                      handleNotesPosted={handleNotesPosted}
                      noteID={obj._id}
                      key={index}
                      title={obj.title}
                      notes={obj.notes}
                    />
                  );
                })
              ) : (
                <div className="flex justif-center gap-x-3 text-white">
                  {ref && (
                    <p className="white text-3xl">
                      No Notes Available <SentimentVeryDissatisfiedIcon />
                    </p>
                  )}
                  <CircularProgress
                    color="primary"
                    size="lg"
                    value={ref ? 0 : 36}
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
