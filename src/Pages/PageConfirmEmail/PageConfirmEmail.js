import React, { useEffect } from "react";
import { Container } from "@mui/material";
// import MobileNavbar from "../../Components/Common/MobileNavbar";
import ConfirmEmail from "../../Components/ConfirmEmail/ConfirmEmail";

function PageConfirmEmail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Container maxWidth="xs">
        <ConfirmEmail />
      </Container>
    </>
  );
}

export default PageConfirmEmail;
