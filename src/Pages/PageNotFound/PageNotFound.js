import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ErrorImage from "../../Assets/page_not_found.svg";

function PageNotFound() {
  return (
    <Container
      maxWidth="lg"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <img
              src={ErrorImage}
              alt="ErrorImage"
              style={{ height: "20rem", width: "auto" }}
            />
          </Box>
          <Typography variant="h5" color="textSecondary" align="center">
            Page Not Found !
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" href="/" sx={{ px: 4 }}>
              Back To Home
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PageNotFound;
