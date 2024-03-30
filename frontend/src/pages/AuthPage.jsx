import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TopLevelContext } from "../store/Context";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { handleAuthenticate } from "../handlers/handleApiCalls";

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
  const navigate = useNavigate();
  const { state, setState } = useContext(TopLevelContext);
  useEffect(() => {
    if (state?.token) navigate("/");
  }, []);

  const [isRegister, setIsRegister] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  // const handleSubmit = async (event) => {
  //   try {
  //     event.preventDefault();
  //     const formData = new FormData(event.currentTarget);

  //     let axiosData = {
  //       email: formData.get("email"),
  //       password: formData.get("password"),
  //       isRemember,
  //     };

  //     if (isRegister) axiosData = { ...axiosData, name: formData.get("name") };

  //     const response = await axios({
  //       method: "post",
  //       url: `${import.meta.env.VITE_BASE_URL}/user/${
  //         isRegister ? "register" : "login"
  //       }`,
  //       data: axiosData,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!isRegister) {
  //       if (isRemember) {
  //         localStorage.setItem(
  //           "authToken",
  //           JSON.stringify(response.data.data.token)
  //         );
  //       }
  //       setState({
  //         ...state,
  //         user: response.data.data.user,
  //         token: response.data.data.token,
  //         isRemember,
  //       });
  //       navigate("/");
  //     } else {
  //       localStorage.removeItem("authToken");
  //       localStorage.removeItem("user");
  //       setIsRegister(false);
  //     }
  //   } catch (error) {
  //     console.log("login error", error);
  //     handleError(error.response.data.message);
  //   }
  // };

  const textFieldsArray = [
    { value: "name", label: "Name" },
    { value: "email", label: "Email address" },
    { value: "password", label: "Password" },
  ];

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
            onSubmit={(e) =>
              handleAuthenticate(
                e,
                state,
                setState,
                isRegister,
                setIsRegister,
                isRemember,
                navigate
              )
            }
            noValidate
            sx={{ mt: 1 }}
          >
            {textFieldsArray.map(
              ({ value, label }, i) =>
                (isRegister || value !== "name") && (
                  <TextField
                    key={i}
                    margin="normal"
                    required
                    fullWidth
                    id={value}
                    label={label}
                    name={value}
                    autoComplete={value}
                    autoFocus
                  />
                )
            )}

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
