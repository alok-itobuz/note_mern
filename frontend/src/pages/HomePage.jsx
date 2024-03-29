import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopLevelContext } from "../store/Context";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const navigate = useNavigate();
  const { state } = useContext(TopLevelContext);

  useEffect(() => {
    if (!state.token) navigate("/auth");
  }, []);

  console.log("home page");
  return (
    <>
      <Navbar />
    </>
  );
};

export default HomePage;
