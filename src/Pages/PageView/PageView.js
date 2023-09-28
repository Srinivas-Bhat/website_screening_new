import { Box } from "@mui/material";
import React from "react";
import Navbar from "../../Components/Common/Navbar";
import View from "../../Components/View/View";
import Footer from "../../Components/Common/Footer/Footer";

const PageView = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ mt: { xs: 7, sm: 8 } }}>
        <View />
      </Box>
      <Footer />
    </>
  );
};

export default PageView;
