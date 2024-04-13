import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import { ToastAlert } from "../utils/toast";

export default function BasicModalDialog({ onNotesPosted }) {
  const [open, setOpen] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const id = localStorage.getItem("uid");  // current logged in user id of db
  const [notesData, setnotesData] = React.useState({
    uid: id,
    title: "",
    notes: "",
  });

  
  React.useEffect(() => {
    setnotesData((prevData) => ({
      ...prevData,
      uid: id,
    }));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const res = await fetch("/api/postnotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notesData),
      });
      const note = await res.json();

      if (res.status !== 201 || !note) {
        setLoad(false);
        console.log(note);
        ToastAlert(note.error, "error");
      } else {
        setLoad(false);
        setnotesData({ title: "", notes: "", uid: id })
        setOpen(false);
        onNotesPosted();
        ToastAlert(`task uploaded`, "success");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoad(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ bgcolor: "white" }}
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        Add Notes
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Create new Note</DialogTitle>
          <DialogContent>Fill in the information of your note</DialogContent>
          <form onSubmit={submit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  autoFocus
                  required
                  onChange={(e) =>
                    setnotesData({ ...notesData, title: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Note Task</FormLabel>
                <textarea
                  required
                  onChange={(e) =>
                    setnotesData({ ...notesData, notes: e.target.value })
                  }
                  rows={5}
                  className="focus:outline-[#0284c7] p-2 border-2 rounded-lg border-[#cbd5e1]"
                />
              </FormControl>
              <Button type="submit">
                {!load ? "Submit" : "Submitting.."}
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}
