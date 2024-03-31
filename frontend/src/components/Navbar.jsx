import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuDrawer from "./Drawer";
import Search from "./Search";
import { Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CustomModal from "./Modal";

export default function Navbar({ setIsCurrentPageHidden }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#222831" }}>
        <Toolbar>
          <MenuDrawer
            direction="left"
            isAccount={false}
            setIsCurrentPageHidden={setIsCurrentPageHidden}
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
              <Search />
            </>
          )}
          <div
            style={{ marginLeft: window.innerWidth >= 768 ? "1rem" : "auto" }}
          >
            <CustomModal isCreate={true}>
              <AddBoxIcon sx={{ color: "#fff" }} />
            </CustomModal>
          </div>
          <div style={{ marginLeft: "1rem" }}>
            <MenuDrawer direction="right" isAccount={true}>
              <AccountCircle sx={{ margin: 0 }} />
            </MenuDrawer>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
