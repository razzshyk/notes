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
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import EditIcon from "@mui/icons-material/Edit";

export default function PricingCards(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        
      }}
      key={props.key1} 
    >
      <Card size="lg" variant="contained" sx={{bgcolor:"#94a3b8"}}>
        <Typography level="h2" color="#1e293b">{props.title}</Typography>
        <Divider inset="none" sx={{bgcolor:"#cbd5e1"}}/>
        <List size="sm">
          <Typography color="#1e293b">{props.notes}</Typography>
        </List>
        <Divider inset="none" sx={{bgcolor:"#cbd5e1"}}/>
        <CardActions>
          <Button
            size="md"
            variant={"solid"}
            color="success"
            endDecorator={<EditIcon fontSize="small"/>}
          >
            update
          </Button>
          <Button
            size="md"
            variant={"solid"}
            color="danger"
            endDecorator={<KeyboardArrowRight />}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
