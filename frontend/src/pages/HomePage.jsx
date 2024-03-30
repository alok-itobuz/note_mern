import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopLevelContext } from "../store/Context";
import Navbar from "../components/Navbar";
import axios from "axios";
import { handleError } from "../handlers/handleErros";

const HomePage = () => {
  const navigate = useNavigate();
  const { state, setState } = useContext(TopLevelContext);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    if (!state?.token) navigate("/auth");

    const fetchNotes = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${import.meta.env.VITE_BASE_URL}/note`,
          headers: {
            Authorization: `Bearer ${state?.token}`,
          },
        });
        console.log({ notes: response.data.data.notes });
        setState({ ...state, notes: response.data.data.notes });
      } catch (error) {
        handleError(error.response.data.message, state, setState, navigate);
      }
    };

    fetchNotes();
  }, []);

  return (
    <>
      <Navbar />
    </>
  );
};

export default HomePage;
