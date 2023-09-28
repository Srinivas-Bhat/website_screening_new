import React from "react";
import { Box, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import styles from "../../../styles/footer.module.css";

const DataDeletion = (props) => {
  return (
    <Box
      sx={{ height: { md: "70vh", sm: "60vh", xs: "30vh" } }}
      className={styles.root}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
          border: "1px solid #ccc",
          borderRadius: 5,
        }}>
        <DeleteForeverIcon sx={{ fontSize: "50px", color: "#ccc", p: 1.5 }} />
      </Box>
      <Box sx={{ maxWidth: { md: "50%", sm: "100%" } }}>
        <Typography variant="h6" align="center">
          <b>Data Deletion / Data Opt-out Instructions</b>
        </Typography>
        <Typography align="center" sx={{ my: 2 }}>
          In order to complying with GDPR and related data privacy regulations,
          to delete your data from TrustCheckr, please send the email with your
          phone number, email and reason to{" "}
          <span style={{ color: "blue" }}>support@trustcheckr.com</span>
        </Typography>
        <Typography align="center">
          We strive hard to honor your requests within 7 working days.
        </Typography>
      </Box>
    </Box>
  );
};

export default DataDeletion;
