import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuDrawer from "./Drawer";
import Search from "./Search";
import { Typography } from "@mui/material";
import axios from "axios";
import { TopLevelContext } from "../store/Context";
import MenuIcon from "@mui/icons-material/Menu";
import { handleError } from "../handlers/handleErros";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const { state, setState } = useContext(TopLevelContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = async (text) => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL}/note?search[title]=${text}`,
        headers: {
          Authorization: `Bearer ${state?.token}`,
        },
      });

      // TODO
    } catch (error) {
      handleError(error.response.data.message, state, setState, navigate);
      console.log("search error", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#222831" }}>
        <Toolbar>
          <MenuDrawer
            direction="left"
            isAccount={false}
            handleSearch={handleSearch}
          >
            <MenuIcon />
          </MenuDrawer>
          {window.innerWidth >= 768 && (
            <>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              ></Typography>
              <Search handleSearch={handleSearch} />
            </>
          )}
          <div
            style={{ marginLeft: window.innerWidth >= 768 ? "1rem" : "auto" }}
          >
            <MenuDrawer direction="right" isAccount={true}>
              <AccountCircle sx={{ margin: 0 }} />
            </MenuDrawer>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
