import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@emotion/react";
import {
  Container,
  IconButton,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import { TopLevelContext } from "../store/Context";
import { createOrUpdateNote, fetchNotes } from "../handlers/handleApiCalls";
import { useNavigate } from "react-router-dom";
import showAlert from "../handlers/showAlert";

export default function CustomModal({
  children,
  title,
  description,
  isCreate,
  id,
}) {
  const { state, setState } = useContext(TopLevelContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const defaultTheme = createTheme();

  const textFieldsArray = [
    { value: "title", label: "Title", defaultValue: title || null },
    {
      value: "description",
      label: "Description",
      defaultValue: description || null,
    },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleNote = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get("title");
    const description = formData.get("description");

    if (isCreate && (!title || !description)) {
      return showAlert("Error", "Both fields are required.", "error");
    } else if (!isCreate && !title && !description) {
      return showAlert("Error", "Atleast one field is required.", "error");
    }

    await createOrUpdateNote(state, title, description, isCreate, id);
    setOpen(false);
    await fetchNotes(state, setState, "?search[isHidden]=false", navigate);

    showAlert(
      "Success",
      `Note is ${isCreate ? "created" : "updated"} successfully.`,
      "success"
    );
  };
  return (
    <>
      <IconButton onClick={handleOpen} size="small">
        {children}
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Create Note
                </Typography>
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 1 }}
                  onSubmit={handleNote}
                >
                  {textFieldsArray.map(({ value, label, defaultValue }, i) => (
                    <TextField
                      key={i}
                      margin="normal"
                      defaultValue={defaultValue}
                      fullWidth
                      id={value}
                      label={label}
                      name={value}
                      autoComplete={value}
                      autoFocus
                    />
                  ))}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      </Modal>
    </>
  );
}
