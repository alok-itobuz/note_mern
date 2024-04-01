import AccountCircle from "@mui/icons-material/AccountCircle";
import { Grid, IconButton, Stack, TextField, createTheme } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { TopLevelContext } from "../store/Context";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@emotion/react";
import Swal from "sweetalert2";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import {
  handleLogout,
  handleLogoutAll,
  handleUpdateUser,
} from "../handlers/handleApiCalls";

const UserProfile = ({ toggleDrawer }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { state, setState } = useContext(TopLevelContext);
  const navigate = useNavigate();

  const defaultTheme = createTheme();

  return (
    <>
      <Grid container style={{ padding: "1rem .5rem" }}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <AccountCircle sx={{ fontSize: 50 }} />
          <IconButton onClick={() => setIsEdit((prev) => !prev)}>
            <EditIcon sx={{ color: isEdit ? "#070F2B" : "#535C91" }} />
          </IconButton>
        </Grid>
      </Grid>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <Box
            component="form"
            onSubmit={(e) =>
              handleUpdateUser(e, state, setState, setIsEdit, toggleDrawer)
            }
            noValidate
          >
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label={isEdit ? "Name" : state?.user?.name}
              name="name"
              autoComplete="name"
              variant={isEdit ? "outlined" : "standard"}
              disabled={!isEdit}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label={isEdit ? "Email Address" : state?.user?.email}
              name="email"
              autoComplete="email"
              autoFocus
              variant={isEdit ? "outlined" : "standard"}
              disabled={!isEdit}
            />
            {isEdit && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#9290C3", color: "#fff" }}
              >
                Submit
              </Button>
            )}
          </Box>
        </Container>
      </ThemeProvider>
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        sx={{
          marginTop: "auto",
          marginBottom: "2rem",
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: "80%",
            margin: 0,
            bgcolor: "#891652",
            display: "flex",
            justifyContent: "start",
          }}
          startIcon={<LogoutIcon />}
          onClick={(e) => handleLogout(state, setState, navigate)}
        >
          Logout
        </Button>
        <Button
          variant="contained"
          sx={{
            width: "80%",
            margin: 0,
            bgcolor: "#750E21",
            display: "flex",
            justifyContent: "start",
          }}
          startIcon={<LogoutIcon />}
          onClick={(e) => handleLogoutAll(state, setState, navigate)}
        >
          Logout from all
        </Button>
      </Stack>
    </>
  );
};

export default UserProfile;
