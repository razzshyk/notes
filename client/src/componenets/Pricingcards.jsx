import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import Check from "@mui/icons-material/Check";

import EditIcon from "@mui/icons-material/Edit";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";

export default function PricingCards(props) {
  const { handleNotesPosted } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
      }}
      key={props.key1}
    >
      <Card size="lg" variant="contained" sx={{ bgcolor: "#94a3b8" }}>
        <Typography level="h2" color="#1e293b">
          {props.title}
        </Typography>
        <Divider inset="none" sx={{ bgcolor: "#cbd5e1" }} />
        <List size="sm">
          <Typography color="#1e293b">{props.notes}</Typography>
        </List>
        <Divider inset="none" sx={{ bgcolor: "#cbd5e1" }} />
        <CardActions>
          <UpdateModal
            handleNotesPosted={handleNotesPosted}
            prevtitle={props.title}
            noteID={props.noteID}
            key={props.key1}
            prevNote={props.notes}
          />

          <DeleteModal
            handleNotesPosted={handleNotesPosted}
            noteID={props.noteID}
          />
        </CardActions>
      </Card>
    </Box>
  );
}
