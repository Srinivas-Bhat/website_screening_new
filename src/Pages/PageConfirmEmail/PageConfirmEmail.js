import React, { useEffect } from "react";
import { Container, useMediaQuery, useTheme } from "@mui/material";
// import MobileNavbar from "../../Components/Common/MobileNavbar";
import ConfirmEmail from "../../Components/ConfirmEmail/ConfirmEmail";
import Navbar from "../../Components/Common/Navbar";

function PageConfirmEmail() {
  function useIsWidthDown(breakpoint) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.down(breakpoint));
  }
  const isMdDown = useIsWidthDown("md");

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      {/* {isMdDown ? <MobileNavbar /> : <Navbar />} */}
      {/* <Navbar /> */}
      <Container maxWidth="xs">
        <ConfirmEmail />
      </Container>
    </>
  );
}

export default PageConfirmEmail;
