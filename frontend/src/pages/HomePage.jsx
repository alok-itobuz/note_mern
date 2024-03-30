import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopLevelContext } from "../store/Context";
import Navbar from "../components/Navbar";
import axios from "axios";
import { handleError } from "../handlers/handleErros";
import NoteCard from "../components/NoteCard";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const HomePage = () => {
  const navigate = useNavigate();
  const { state, setState } = useContext(TopLevelContext);

  useEffect(() => {
    if (!state?.token) navigate("/auth");

    const fetchNotes = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${import.meta.env.VITE_BASE_URL}/note`,
          headers: {
            Authorization: `Bearer ${state?.token}`,
          },
        });
        console.log({ notes: response.data.data.notes });
        setState({ ...state, notes: response.data.data.notes });
      } catch (error) {
        handleError(error.response.data.message, state, setState, navigate);
      }
    };

    fetchNotes();
  }, []);

  return (
    <>
      <Navbar />
      <Grid2 container justifyContent="center">
        {state.notes.map(({ title, description, createdAt }, i) => {
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
              />
            </Grid2>
          );
        })}
      </Grid2>
    </>
  );
};

export default HomePage;
