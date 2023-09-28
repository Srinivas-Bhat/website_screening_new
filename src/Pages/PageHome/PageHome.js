import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Home from "../../Components/Home/Home";
import Navbar from "../../Components/Common/Navbar";
import Footer from "../../Components/Common/Footer/Footer";

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
      <Footer />
    </>
  );
};

export default PageHome;
