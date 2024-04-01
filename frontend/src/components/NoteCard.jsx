import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Checkbox, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CustomModal from "./Modal";
import { deleteNote, fetchNotes } from "../handlers/handleApiCalls";
import { TopLevelContext } from "../store/Context";
import { useNavigate } from "react-router-dom";

export default function NoteCard({
  createdAt,
  title,
  description,
  id,
  hideCheckbox,
  setSelectedNotes,
}) {
  const { state, setState } = useContext(TopLevelContext);
  const navigate = useNavigate();

  const handleChecked = (e) => {
    const isChecked = e.target.checked;

    if (!isChecked) {
      setSelectedNotes((prev) => prev.filter((noteId) => noteId !== id));
    } else {
      setSelectedNotes((prev) => [...prev, id]);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNote(state, id);
      fetchNotes(state, setState, "?search[isHidden]=false", navigate);
    } catch (error) {
      console.log("delete note", error);
    }
  };
  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {title?.[0]?.toUpperCase()}
          </Avatar>
        }
        title={title}
        subheader={createdAt}
      />
      <CardMedia
        sx={{ height: 140 }}
        image="https://source.unsplash.com/random/900%C3%97700/?note"
        title="green iguana"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description?.slice(0, 130)}
          {description?.length > 131 ? "....." : ""}
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "auto",
        }}
      >
        <CardActions>
          <CustomModal
            isCreate={false}
            title={title}
            description={description}
            id={id}
          >
            <EditNoteIcon />
          </CustomModal>
          <IconButton size="small" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
        {!hideCheckbox && <Checkbox onChange={handleChecked} />}
      </Box>
    </Card>
  );
}
