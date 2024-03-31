import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopLevelContext } from "../store/Context";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Button } from "@mui/material";
import EditNote from "@mui/icons-material/EditNote";
import { fetchNotes, hideNotes } from "../handlers/handleApiCalls";

const HomePage = () => {
  const navigate = useNavigate();
  const { state, setState } = useContext(TopLevelContext);

  const [hideCheckbox, setHideCheckbox] = useState(true);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [isCurrentPageHidden, setIsCurrentPageHidden] = useState(false);

  useEffect(() => {
    if (!state?.token) navigate("/auth");

    fetchNotes(
      state,
      setState,
      isCurrentPageHidden
        ? "?search[isHidden]=true"
        : "?search[isHidden]=false",
      navigate
    );
  }, [isCurrentPageHidden]);

  return (
    <>
      <Navbar setIsCurrentPageHidden={setIsCurrentPageHidden} />
      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          justifyContent: "end",
          gap: "1rem",
        }}
      >
        <Button
          variant="contained"
          sx={{
            fontWeight: 600,
            bgcolor: "#092635",
            ":active": { bgcolor: "#1B4242" },
            ":hover": { bgcolor: "#1B4242" },
          }}
          onClick={() => setHideCheckbox((prev) => !prev)}
        >
          Select
        </Button>
        <Button
          variant="contained"
          endIcon={<EditNote />}
          sx={{
            fontWeight: 600,
            bgcolor: "#092635",
            ":active": { bgcolor: "#1B4242" },
            ":hover": { bgcolor: "#1B4242" },
          }}
          onClick={() =>
            hideNotes(
              state,
              setState,
              selectedNotes,
              setSelectedNotes,
              setHideCheckbox,
              isCurrentPageHidden
            )
          }
        >
          {isCurrentPageHidden ? "Unhide" : "Hide"}
        </Button>
      </Box>
      <Grid2 container justifyContent="center">
        {state.notes.map(({ title, description, createdAt, _id }, i) => {
          const date = new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          return (
            <Grid2
              key={i}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{
                padding: "1rem",
                display: "flex",
                justifyContent: "center",
                maxWidth: 325,
                aspectRatio: "3/4",
              }}
            >
              <NoteCard
                title={title}
                description={description}
                createdAt={date}
                hideCheckbox={hideCheckbox}
                id={_id}
                setSelectedNotes={setSelectedNotes}
              />
            </Grid2>
          );
        })}
      </Grid2>
    </>
  );
};

export default HomePage;
