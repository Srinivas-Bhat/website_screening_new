import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import PageSignup from "./Pages/PageSignup/PageSignup";
import PageLogin from "./Pages/PageLogin/PageLogin";
import PageView from "./Pages/PageView/PageView";
import PageHome from "./Pages/PageHome/PageHome";
import PageConfirmEmail from "./Pages/PageConfirmEmail/PageConfirmEmail";
import TermsOfUse from "./Components/Common/Footer/TermsOfUse";
import PrivacyPolicy from "./Components/Common/Footer/PrivacyPolicy";
import CookiePolicy from "./Components/Common/Footer/CookiePolicy";
import DataDeletion from "./Components/Common/Footer/DataDeletion";

const theme = createTheme({
  typography: {
    useNextVariants: true,
    fontFamily: '"Nunito Sans", sans-serif',
    // fontFamily: "'Montserrat', sans-serif",
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          textTransform: "none",
          // backgroundColor: "#014b70",
          "&:hover": {
            // backgroundColor: "#0e6490",
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/results/:id" element={<PageView />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/signup" element={<PageSignup />} />
        <Route path="/" element={<PageConfirmEmail />}>
          <Route path=":email/:otp" element={<PageConfirmEmail />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/opt-out" element={<DataDeletion />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
