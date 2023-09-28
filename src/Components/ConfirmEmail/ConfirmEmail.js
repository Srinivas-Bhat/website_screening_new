import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import styles from "../../styles/confirmMail.module.css";
import axios from "axios";
import TickAnimation from "../Common/TickAnimation";

function ConfirmEmail() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnacbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("error");
  const [userEmail, setUserEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({
    email: false,
    otp: false,
  });
  const [userOtp, setUserOtp] = useState("");
  const { email, otp } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setUserEmail(email);
    setUserOtp(otp);
  }, [email, otp]);

  useEffect(() => {
    setSuccess(false);
  }, []);

  const handleConfirmEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      if (/^[0-9]+$/.test(otp) && otp.trim().length) {
        let config = {
          method: "POST",
          url: `${process.env.REACT_APP_WEBSITE_SCREENING}/verify-otp`, //get-data-from-user-id
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            email: email,
            otp: otp,
          },
        };
        axios(config)
          .then((response) => {
            console.log(response.data);
            setSuccess(true);
            setSnackbarOpen(true);
            setSnacbarMessage(response.data?.data);
            setSnackbarType("success");
            setError({ ...error, email: false });
            setError({ ...error, otp: false });
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          })
          .catch((error) => {
            console.log(error);
            setSuccess(false);
            setSnackbarOpen(true);
            setSnacbarMessage(
              error?.response?.data?.error || "Some error occurred"
            );
            setSnackbarType("error");
          });
      } else {
        setError({ ...error, otp: true });
      }
    } else {
      setError({ ...error, email: true });
    }
  };

  const handleResendEmail = () => {
    let config = {
      method: "POST",
      url: `${process.env.REACT_APP_WEBSITE_SCREENING}/resend-otp`, //get-data-from-user-id
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
      },
    };
    axios(config)
      .then((response) => {
        console.log(response.data);
        setSuccess(true);
      })
      .catch((error) => {
        setSuccess(false);
        console.log(error);
      });
  };

  const handleInputs = (e, inputName) => {
    if (inputName === "email") {
      if (email && email.trim().length) {
        setUserEmail(e.target.value);
      }
    } else {
      if (otp && otp.trim().length) {
        setUserOtp(e.target.value);
      }
    }
  };

  return (
    <>
      {success ? (
        <Box sx={{ height: "100vh" }} className={styles.centered}>
          <Card variant="outlined" sx={{ width: "100%", p: 3 }}>
            <TickAnimation />
            <Typography align="center" sx={{ my: 4 }} variant="h5">
              <b>Your Mail Sent Successfully</b>
            </Typography>
            <Typography
              align="center"
              sx={{ my: 1 }}
              color="textSecondary"
              variant="body1">
              Email Successfully verified. Please login with your entered email
              id and password.
            </Typography>
          </Card>
        </Box>
      ) : (
        <Box sx={{ height: "100vh" }} className={styles.centered}>
          <Card variant="outlined" sx={{ width: "100%", p: 3 }}>
            <Box>
              <Typography variant="h5" align="center" sx={{ mb: 0.5 }}>
                <b>Confirm Email</b>
              </Typography>
              <Divider sx={{ fontSize: "14px", my: 2 }} />
            </Box>
            <Stack direction="column" spacing={0}>
              <Box>
                <Typography variant="body1">
                  <b>Email</b>
                </Typography>
                <TextField
                  color={error.email ? "error" : "primary"}
                  margin="normal"
                  type="email"
                  size="small"
                  required
                  fullWidth
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  autoComplete="email"
                  value={userEmail}
                  onChange={(e) => handleInputs(e, "email")}
                  helperText={error.email ? "Enter a valid email" : " "}
                />
              </Box>
              <Box>
                <Typography variant="body1">
                  <b>OTP</b>
                </Typography>
                <TextField
                  margin="normal"
                  type="text"
                  size="small"
                  required
                  fullWidth
                  id="otp"
                  placeholder="OTP"
                  name="otp"
                  autoComplete="otp"
                  value={userOtp}
                  onChange={(e) => handleInputs(e, "otp")}
                />
              </Box>
              <Button onClick={handleConfirmEmail} variant="contained">
                Confirm Email
              </Button>
            </Stack>
            <Typography variant="body2" align="center" sx={{ mt: 1 }}>
              Don't have an account ?
              <Button variant="text" onClick={handleResendEmail}>
                Resend Email
              </Button>
            </Typography>
          </Card>
        </Box>
      )}

      {/* Snackbar for showing the alerts */}
      <Snackbar
        open={snackbarOpen}
        // autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setSnackbarOpen(false)}>
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarType}
          sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ConfirmEmail;
