import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Link,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import tcIcon from "../../Assets/trustcheckr_logo_new.svg";

const Navbar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const trigger = useScrollTrigger({
    target: props.window ? props.window() : undefined,
    disableHysteresis: true,
    threshold: 25,
  });

  let websiteScreening = JSON.parse(localStorage.getItem("websiteScreening"));

  const handleLogout = () => {
    localStorage.removeItem("websiteScreening");
    navigate("/login");
  };

  return (
    <>
      <AppBar
        sx={{
          background: !trigger ? "transparent" : "white",
          boxShadow: trigger ? "0 5px 20px 0 rgb(0 0 0 / 10%)" : "none",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}>
        <Container>
          <Toolbar disableGutters sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Link
                href={"/"}
                underline="none"
                sx={{ display: "flex", alignItems: "center", mr: 5 }}>
                <img src={tcIcon} alt="logo" width={165} />
              </Link>
            </Box>

            {websiteScreening?.userId ? (
              <>
                <Tooltip title="Logout">
                  <IconButton
                    color="primary"
                    // onClick={handleMenuClick}
                    // aria-controls={open ? "account-menu" : undefined}
                    // aria-haspopup="true"
                    // aria-expanded={open ? "true" : undefined}
                  >
                    {/* <Avatar
                      alt={"User"}
                      src="./"
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: "#1976d2",
                        cursor: "pointer",
                      }}
                    /> */}
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
                {/* <Menu
                  anchorEl={anchorElement}
                  id="account-menu"
                  open={open}
                  onClose={handleMenuClose}
                  onClick={handleMenuClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      width: 150,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <Link href="/profile" color="inherit" underline="none">
                    <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon>
                        <PersonIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography variant="body2">Profile</Typography>
                    </MenuItem>
                  </Link>
                  <Link href="/billing" color="inherit" underline="none">
                    <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon>
                        <ReceiptIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography variant="body2">Billing</Typography>
                    </MenuItem>
                  </Link>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2" sx={{ p: 0.5 }}>
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu> */}
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  href={"/login"}
                  sx={{ borderRadius: 5, mr: 1 }}
                  size="large"
                  startIcon={<PersonIcon />}>
                  <b>Log in</b>
                </Button>
                <Button
                  variant="outlined"
                  href={"/login"}
                  sx={{ borderRadius: 5 }}
                  size="large"
                  startIcon={<PersonIcon />}>
                  <b>Sign up</b>
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {/* <Toolbar /> */}
    </>
  );
};

export default Navbar;
