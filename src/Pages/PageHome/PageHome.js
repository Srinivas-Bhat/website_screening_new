import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../../Components/Home/Home";
import Navbar from "../../Components/Common/Navbar";
import axios from "axios";

const PageHome = () => {
  function useIsWidthDown(breakpoint) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.down(breakpoint));
  }
  const isMdDown = useIsWidthDown("md");
  const isSmDown = useIsWidthDown("sm");
  return (
    <>
      <Navbar />
      <Box>
        <Home isMdDown={isMdDown} isSmDown={isSmDown} />
      </Box>
    </>
  );
};

export default PageHome;
