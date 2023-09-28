import React from "react";
import { Box, Grid, Link, Typography, Container, Divider } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import styles from "../../../styles/footer.module.css";

function Footer() {
  const list1 = [
    {
      label: "Privacy Policy",
      route: "/privacy-policy",
    },
    {
      label: "Terms",
      route: "/terms-of-use",
    },
    {
      label: "Cookie Policy",
      route: "/cookie-policy",
    },
    {
      label: "Opt Out",
      route: "/opt-out",
    },
  ];
  let list2 = [
    {
      label: "Team",
      route: "/",
    },
    {
      label: "Careers",
      // route: "/",
      route: "https://cutshort.io/company/trustcheckr",
    },
    {
      label: "Blogs",
      route: "https://blog.trustcheckr.com",
    },
  ];
  return (
    <Box sx={{ background: `linear-gradient(to left,#02225b,#1c59b3)`, mt: 6 }}>
      <Container>
        <Grid container sx={{ pt: 4, pl: { xs: 4, sm: 0 } }}>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ color: "white" }}>
              Legal
            </Typography>
            {list1.map((data) => (
              <Box sx={{ mt: 1.5 }} key={data.label}>
                <Link
                  sx={{ color: "#ccc" }}
                  underline="hover"
                  variant="body2"
                  href={data.route}
                  target="_blank">
                  {data.label}
                </Link>
              </Box>
            ))}
          </Grid>
          <Grid item xs={12} sm={4} sx={{ mt: { xs: 3, sm: 0 } }}>
            <Typography variant="h6" sx={{ color: "white" }}>
              Company
            </Typography>
            {list2.map((data) => (
              <Box sx={{ mt: 1.5 }} key={data.label}>
                <Link
                  sx={{ color: "#ccc" }}
                  underline="hover"
                  variant="body2"
                  href={data.route}
                  // target="_blank"
                >
                  {data.label}
                </Link>
              </Box>
            ))}
          </Grid>
          <Grid item xs={12} sm={4} sx={{ mt: { xs: 3, sm: 0 } }}>
            <Typography variant="h6" sx={{ color: "white" }}>
              Connect with us
            </Typography>
            <Typography sx={{ color: "#ccc", mt: 1 }} variant="body2">
              support@trustcheckr.com
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Link
                className={styles.socialIcon}
                sx={{ mr: 2 }}
                href="https://twitter.com/trustcheckr"
                target="_blank">
                <TwitterIcon />
              </Link>
              <Link
                className={styles.socialIcon}
                href="https://in.linkedin.com/company/trustcheckr"
                target="_blank">
                <LinkedInIcon />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ color: "white" }}>
              For Consumers
            </Typography>
            <Box sx={{ mt: 1.5 }}>
              <Link
                sx={{ color: "#ccc" }}
                underline="none"
                variant="body2"
                href="https://trustcheckr.com"
                target="_blank">
                Free Phone Check
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 4, mb: 2, backgroundColor: "white" }} />
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "#ccc", pb: 2 }}>
          Copyright © trustcheckr.com {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
