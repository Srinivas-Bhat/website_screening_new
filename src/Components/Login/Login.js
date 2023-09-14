import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import tcIcon from "../../Assets/trustcheckr_icon.png";
import {
  Alert,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import connect from "../../Utils/connect";

const Login = () => {
  //   const url = connect();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarType, setSnackbarType] = React.useState("error");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const { value } = e.target;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      setEmail(value);
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    if (value === "" || value.trim().length < 0) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      setPassword(value);
    }
  };

  // handleSubmit function for login
  const handleSubmit = async (event) => {
    event.preventDefault();
    // let data = new FormData();
    // data.append("email", email);
    // data.append("password", password);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    if (email !== "" && email.trim().length > 0 && !emailError) {
      if (password !== "" && password.trim().length > 0 && !passwordError) {
        let data = {
          email: email,
          password: password,
        };
        var config = {
          method: "POST",
          //   url: `${url}/auth/login`,
          url: `${process.env.REACT_APP_WEBSITE_SCREENING}/login`,
          data,
        };
        await axios(config)
          .then((response) => {
            console.log(response.data);
            if (response.status === 200 || response.status === 201) {
              setSnackbarOpen(true);
              setSnackbarType("success");
              setSnackbarMessage("Login Successful");
              setEmailError(false);
              setPasswordError(false);
              setEmail(false);
              setPassword(false);
              localStorage.setItem(
                "websiteScreening",
                JSON.stringify(response.data?.data)
              );
              setTimeout(() => {
                navigate("/");
              }, 1050);
            } else {
              setSnackbarOpen(true);
              setSnackbarType("error");
              setSnackbarMessage("Some error occurred. Please try again");
            }
          })
          .catch((error) => {
            console.log(error);
            console.log("im throwing error", error?.response?.data?.error);
            if (error?.response?.data?.showErrToUser) {
              setSnackbarType("error");
              setSnackbarOpen(true);
              setSnackbarMessage(error?.response?.data?.error);
              // if (error.response.data.error === "You have entered an invalid email") {
              //   setEmailError(true);
              // } else {
              //   setPasswordError(true);
              // }
            } else {
              setSnackbarType("error");
              setSnackbarOpen(true);
              setSnackbarMessage(error?.response?.data?.error);
            }
          });
      } else {
        setPasswordError(true);
        setSnackbarType("error");
        setSnackbarOpen(true);
        setSnackbarMessage("Password is Required");
      }
    } else {
      setEmailError(true);
      setSnackbarType("error");
      setSnackbarOpen(true);
      setSnackbarMessage("Email is Required");
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          underline="none"
          sx={{ display: "flex", alignItems: "center", mb: 2 }}
        >
          <img src={tcIcon} alt="icon" height={30} width={30} />
          <Typography variant="h5" sx={{ ml: 1 }}>
            <b>TrustCheckr</b>
          </Typography>
        </Link>
        <Card variant="outlined" sx={{ p: 4 }}>
          <Typography variant="h5" align="center" sx={{ mb: 0.5 }}>
            <b>Login</b>
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 3 }}>
            Welcome back! Please login to your account
          </Typography>
          <Divider sx={{ fontSize: "14px", my: 3 }}></Divider>
          <Box component="form" sx={{ mt: 1 }}>
            <Typography sx={{ mb: 0.5 }} variant="body2">
              <b>Email</b>
            </Typography>
            <TextField
              margin="normal"
              type="email"
              size="small"
              required
              fullWidth
              id="email"
              placeholder="Email Address"
              name="email"
              autoComplete="email"
              sx={{ mb: 2 }}
              // value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailError && "Enter valid Email"}
            />
            <Typography sx={{ mb: 0.5 }} variant="body2">
              <b>Password</b>
            </Typography>
            <TextField
              required
              fullWidth
              margin="normal"
              size="small"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              error={passwordError}
              helperText={passwordError && "Enter a valid Password"}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Box>
          <Typography align="center">
            <Link variant="caption" href="/signup">
              Don't have an account ?
            </Link>
          </Typography>
        </Card>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarType}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
