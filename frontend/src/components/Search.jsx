import React, { useContext, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { TopLevelContext } from "../store/Context";
import { useNavigate } from "react-router-dom";
import { fetchNotes } from "../handlers/handleApiCalls";

const Search = ({}) => {
  const searchRef = useRef();
  const { state, setState } = useContext(TopLevelContext);
  const navigate = useNavigate();

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginTop: "1rem",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      margin: "0",
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const handleSearch = (e) => {
    if (e.key.toLowerCase() !== "enter") return;

    const searchText = searchRef.current.value;
    searchRef.current.value = "";

    fetchNotes(state, setState, `?search[title]=${searchText}`, navigate);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        inputRef={searchRef}
        onKeyDown={handleSearch}
      />
    </Search>
  );
};

export default Search;
