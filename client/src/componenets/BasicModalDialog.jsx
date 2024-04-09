import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';

export default function BasicModalDialog() {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button
        variant="contained"
        // color="neutral"
        sx={{bgcolor:"white"}}
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        Add Notes
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Create new Note</DialogTitle>
          <DialogContent>Fill in the information of your note</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Note Task</FormLabel>
                <Input required />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}