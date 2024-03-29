import React, { useContext, useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TopLevelContext } from "../store/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  const navigate = useNavigate();

  const { state, setState } = useContext(TopLevelContext);

  useEffect(() => {
    if (state.token) navigate("/");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    let axiosData = {
      email: formData.get("email"),
      password: formData.get("password"),
      isRemember,
    };

    if (isRegister) axiosData = { ...axiosData, name: formData.get("name") };

    const response = await axios({
      method: "post",
      url: `${import.meta.env.VITE_BASE_URL}/user/${
        isRegister ? "register" : "login"
      }`,
      data: axiosData,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!isRegister) {
      if (isRemember) {
        localStorage.setItem(
          "authToken",
          JSON.stringify(response.data.data.token)
        );
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
      }
      setState({
        ...state,
        user: response.data.data.user,
        token: response.data.data.token,
        isRemember,
      });
      navigate("/");
    } else {
      setIsRegister(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign {isRegister ? "up" : "in"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {isRegister && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {!isRegister && (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => setIsRemember(e.target.checked)}
                    value="remember"
                    color="primary"
                  />
                }
                label="Remember me"
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign {isRegister ? "Up" : "In"}
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  onClick={() => setIsRegister((prev) => !prev)}
                  variant="body2"
                  sx={{
                    ":hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  {isRegister
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
