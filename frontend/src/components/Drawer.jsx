import React, { useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import NotesIcon from "@mui/icons-material/Notes";
import { IconButton } from "@mui/material";
import Search from "./Search";
import UserProfile from "./UserProfile";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function MenuDrawer({
  direction,
  children,
  isAccount,
  setIsCurrentPageHidden,
}) {
  const [open, setOpen] = useState(false);
  const anchor = direction || "left";

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(isOpen);
  };

  const list = () => (
    <List>
      {["Visible", "Hidden"].map((text, index) => (
        <ListItem
          key={text}
          disablePadding
          onClick={() => {
            index === 0
              ? setIsCurrentPageHidden(false)
              : setIsCurrentPageHidden(true);
            setOpen(false);
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              {index === 0 ? <NotesIcon /> : <VisibilityOffIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        {children}
      </IconButton>

      <SwipeableDrawer
        anchor={anchor}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        PaperProps={{
          sx: {
            bgcolor: "#EEEEEE",
          },
        }}
      >
        {window.innerWidth < 768 && !isAccount && <Search />}
        <Box
          sx={{
            width: 250,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          role="presentation"
        >
          {isAccount ? <UserProfile toggleDrawer={toggleDrawer} /> : list()}
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
