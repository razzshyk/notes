import * as React from "react";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import EditIcon from "@mui/icons-material/Edit";
import { FormControl, FormLabel, Input } from "@mui/joy";
import { ToastAlert } from "../utils/toast";

export default function UpdateModal(props) {
  const { handleNotesPosted } = props;
  const [open, setOpen] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const id = localStorage.getItem("uid");
  const [updateValue, setupdateValue] = React.useState({
    uid: id,
    noteID: props.noteID,
    title: "",
    notes: "",
  });

  const submit = (e) => {
    e.preventDefault();
    setLoad(true);
    // console.log(updateValue);
    fetch("/api/updatenotes", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updateValue),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          ToastAlert(data.error, "error");
        }
        ToastAlert(data.message, "success");
        setupdateValue({ title: "", notes: "" });
        handleNotesPosted();
        setOpen(false);
        setLoad(false);
      })
      .catch((e) => {
        console.log(e);
        setOpen(false);
        setLoad(false);
      });
  };
  return (
    <React.Fragment key={props.key}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Button
          onClick={() => setOpen(true)}
          size="md"
          variant={"solid"}
          color="success"
          endDecorator={<EditIcon fontSize="small" />}
        >
          Update
        </Button>
      </Stack>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="plain">
          <ModalClose />
          <DialogTitle>Update Your Note</DialogTitle>
          <DialogContent>
            <form method="PUT" onSubmit={submit}>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>New Title</FormLabel>
                  <Input
                    defaultValue={props.prevtitle}
                    onChange={(e) =>
                      setupdateValue({ ...updateValue, title: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>New Note</FormLabel>
                  <Input
                    defaultValue={props.prevNote}
                    onChange={(e) =>
                      setupdateValue({ ...updateValue, notes: e.target.value })
                    }
                  />
                </FormControl>
                <Button type="submit">
                  {!load ? "Update" : "Updating..."}
                </Button>
              </Stack>
            </form>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
