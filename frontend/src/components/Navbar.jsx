import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuDrawer from "./Drawer";
import Search from "./Search";
import { Typography } from "@mui/material";
import axios from "axios";
import { TopLevelContext } from "../store/Context";

export default function Navbar() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const { state } = useContext(TopLevelContext);

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
      console.log(
        `${import.meta.env.VITE_BASE_URL}/note/?search[title]=${text}`
      );
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL}/note?search[title]=${text}`,
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });

      console.log(response);
    } catch (error) {
      console.log("search error", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <MenuDrawer />
          {window.innerWidth >= 768 && (
            <>
              {console.log(window.innerWidth)}
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              ></Typography>
              <Search handleSearch={handleSearch} />
            </>
          )}
          {auth && (
            <div
              style={{ marginLeft: window.innerWidth >= 768 ? "1rem" : "auto" }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
