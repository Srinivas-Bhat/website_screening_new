import React, { useEffect } from "react";
import { Container, useMediaQuery, useTheme } from "@mui/material";
import MailConfirm from "../../Components/MailConfirm/MailConfirm";

function PageMailConfirm() {
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
      <Container maxWidth="xs">
        <MailConfirm />
      </Container>
    </>
  );
}

export default PageMailConfirm;
