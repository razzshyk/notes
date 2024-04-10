import { Button } from "@material-tailwind/react";
import React from "react";
import notesgif from "../../public/notes.gif";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import BasicModalDialog from "../componenets/BasicModalDialog";

const Notes = () => {
  return (
    <>
      {notesgif ? (
        <div
          style={{
            backgroundImage: `url(${notesgif})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="flex flex-col p-[2rem] lg:p-[4rem] h-screen"
        >
          <div className="text-start max-w-screen lg:w-[50rem] lg:mx-auto mt-8">
            <h1 className="text-[#d6d3d1] lg:text-4xl mb-4">Your Notes</h1>
            <BasicModalDialog />
            <p className="text-center  flex lg:gap-2 justify-center text-[#fff] font-bold mt-[4rem] text-lg">
              No Notes found..
              <SentimentVeryDissatisfiedIcon />
            </p>
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
