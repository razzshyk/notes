import  React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { ToastAlert } from "../utils/toast";
import { CircularProgress } from "@mui/joy";

export default function DeleteModal({ noteID, handleNotesPosted, deletAll }) {
  const [load, setLoad] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  let uid = localStorage.getItem("uid");

  const DeleteNote = (e) => {
    e.preventDefault();
    setLoad(true);
    fetch("/api/deletenote", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ noteID, uid }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          ToastAlert(data.error, "error");
          console.log(data.error);
        } else {
          ToastAlert("Note Deleted successfully", "success");
          console.log(data);
          handleNotesPosted(); // Ensure this function is being called
        }
        setLoad(false);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
        setOpen(false);
      });
  };

  const DeleteAllNotes = (e) => {
    e.preventDefault();
    setLoad(true);
    fetch("/api/deleteAllnotes", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ uid }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          ToastAlert(data.error, "error");
          console.log(data.error);
        } else {
          ToastAlert("All Notes Deleted successfully", "success");
          console.log(data);
          handleNotesPosted(); // Ensure this function is being called
        }
        setLoad(false);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
        setOpen(false);
      });
  };

  return (
    <React.Fragment>
      <Button
        onClick={() => setOpen(true)}
        size="md"
        variant={"solid"}
        color="danger"
        endDecorator={deletAll ? <DeleteForever fontSize="small" /> : <KeyboardArrowRight fontSize="small" />}
      >
        {deletAll ? "Clear All" : "Discard"}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to discard {deletAll ? "all your notes" : "this note"}?
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={deletAll ? DeleteAllNotes : DeleteNote}>
              {load ? <CircularProgress variant="solid" color="danger" /> : (deletAll ? "Clear all Notes" : "Discard notes")}
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

