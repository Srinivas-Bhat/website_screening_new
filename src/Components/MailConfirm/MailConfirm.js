import { Box, Card, Typography } from "@mui/material";
import React from "react";
import styles from "../../styles/confirmMail.module.css";
import TickAnimation from "../Common/TickAnimation";

const MailConfirm = () => {
  return (
    <Box sx={{ height: "100vh" }} className={styles.centered}>
      <Card variant="outlined" sx={{ width: "100%", p: 3 }}>
        <TickAnimation />
        <Typography align="center" sx={{ my: 4 }} variant="h5">
          <b>Your Mail Sent Successfully</b>
        </Typography>
        <Typography align="center" sx={{ my: 1 }} color="textSecondary" variant="body1">
          Thanks for signing-up with us. Please check your entered email id to verify your
          email address.
        </Typography>
      </Card>
    </Box>
  );
};

export default MailConfirm;
