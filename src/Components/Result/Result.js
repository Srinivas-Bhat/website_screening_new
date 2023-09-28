import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import styles from "../../styles/View.module.css";
import moment from "moment";

const Result = ({ data, isMdDown, isSmDown }) => {
  // console.log(data);
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Box sx={{ position: "relative", minHeight: "35vh" }}>
          <Grid
            align="center"
            container
            sx={{
              position: "absolute",
              top: "25%",
            }}>
            <Grid item xs={12} sm={3} className={styles.centered}>
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  flexDirection: "column",
                }}
                className={styles.centered}>
                <img
                  className={styles.centered}
                  // src={`https://www.google.com/s2/favicons?sz=64&domain_url=${id}`}
                  src={`https://logo.clearbit.com/${data.base_url}`}
                  width={"100%"}
                  height={"100%"}
                  alt="logo"
                  style={{
                    objectFit: "contain",
                    borderRadius: "10%",
                  }}
                />
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{
                    mt: 1,
                    ":first-letter": { textTransform: "uppercase" },
                  }}>
                  <b>{data?.base_url}</b>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={7} className={styles.centered}>
              <Stack direction="column">
                <Typography
                  variant={isSmDown ? "h5" : isMdDown ? "h5" : "h4"}
                  color="primary"
                  // sx={{ ":first-letter": { textTransform: "uppercase" } }}
                >
                  <b>
                    {data?.whois_information?.domain_name
                      ? typeof data?.whois_information?.domain_name === "object"
                        ? data?.whois_information?.domain_name[0]
                        : data?.whois_information?.domain_name
                      : data?.base_url}
                  </b>
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                  sx={{ my: 1 }}>
                  {data?.meta_data?.twitter?.title}
                </Typography>
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              md={2}
              sx={{ mt: { xs: 1, sm: 0 } }}
              className={styles.centered}>
              <Box sx={{ display: "flex", gap: { xs: 2, sm: 1, md: 2 } }}>
                {Math.abs(
                  (new Date() - new Date(data.created_at)) /
                    (1000 * 60 * 60 * 24)
                ) >= 1 ? (
                  <Button variant="contained" size="small" color="success">
                    COMPLETED
                  </Button>
                ) : (
                  <Button variant="contained" size="small" color="warning">
                    RUNNING
                  </Button>
                )}
                {data?.website_exists === "false" ? (
                  <Button variant="contained" size="small" disabled={true}>
                    VIEW
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate(`/results/${data.base_url}`)}>
                    VIEW
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {/* <Box sx={{ minHeight: 600 }}> */}
      <Grid
        container
        sx={{ border: "1px solid #f2f2f2", mt: { xs: 10, sm: 0 } }}>
        <Grid
          item
          xs={12}
          sm={8.5}
          sx={{
            bgcolor: "#F8F8F8",
            p: 2,
          }}>
          {/* <Box sx={{ width: 200 }}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Website Exists
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
              sx={{ backgroundColor: "#e6e7f8", padding: "5px" }}>
              True
            </Typography>
          </Box> */}
          <Typography variant="h6" color="primary">
            <b> Website Details</b>
          </Typography>
          {/* <Divider /> */}
          <Grid
            container
            rowSpacing={3}
            columnSpacing={2}
            sx={{
              mt: 0,
              bgcolor: "inherit",
            }}>
            <Grid item xs={12} sm={4} md={6} lg={6}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Website Exists:
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{
                  backgroundColor: "#e6e7f8",
                  padding: "5px",
                  overflow: "hidden",
                }}>
                {data?.website_exists ? data?.website_exists : "Not Found"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={6} lg={6}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Creation Date
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{
                  backgroundColor: "#e6e7f8",
                  padding: "5px",
                  overflow: "hidden",
                }}>
                {data?.whois_information?.creation_date
                  ? typeof data?.whois_information?.creation_date === "object"
                    ? moment(data?.whois_information?.creation_date[0]).format(
                        "ll"
                      )
                    : moment(data?.whois_information?.creation_date).format(
                        "ll"
                      )
                  : "Not Found"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={6} lg={6}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Registrar
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{
                  backgroundColor: "#e6e7f8",
                  padding: "5px",
                  overflow: "hidden",
                }}>
                {data?.whois_information?.registrar
                  ? data?.whois_information?.registrar
                  : "Not Found"}
              </Typography>
            </Grid>
            {/* <Grid item xs={12} sm={4} md={6} lg={6}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                ID
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{
                  backgroundColor: "#e6e7f8",
                  padding: "5px",
                  overflow: "hidden",
                }}>
                {"Not Found"}
              </Typography>
            </Grid> */}
            <Grid item xs={12} sm={4} md={6} lg={6}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Organization
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{
                  backgroundColor: "#e6e7f8",
                  padding: "5px",
                  overflow: "hidden",
                }}>
                {data?.whois_information?.org
                  ? data?.whois_information?.org
                  : "Not Found"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={6} lg={6}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Address
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{
                  backgroundColor: "#e6e7f8",
                  padding: "5px",
                  overflow: "hidden",
                }}>
                {data?.whois_information?.address
                  ? typeof data?.whois_information?.address === "object"
                    ? data?.whois_information?.address.join(" , ")
                    : data?.whois_information?.address
                  : "Not Found"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={6} lg={6}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                City
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{
                  backgroundColor: "#e6e7f8",
                  padding: "5px",
                  overflow: "hidden",
                }}>
                {data?.whois_information?.city
                  ? data?.whois_information?.city
                  : "Not Found"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={6} lg={6}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                State
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{
                  backgroundColor: "#e6e7f8",
                  padding: "5px",
                  overflow: "hidden",
                }}>
                {data?.whois_information?.state
                  ? data?.whois_information?.state
                  : "Not Found"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={6} lg={6}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Country
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{
                  backgroundColor: "#e6e7f8",
                  padding: "5px",
                  overflow: "hidden",
                }}>
                {data?.whois_information?.country
                  ? data?.whois_information?.country
                  : "Not Found"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={6} lg={6}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Postal Code
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{
                  backgroundColor: "#e6e7f8",
                  padding: "5px",
                  overflow: "hidden",
                }}>
                {data?.whois_information?.registrant_postal_code
                  ? data?.whois_information?.registrant_postal_code
                  : "Not Found"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={6} lg={6}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Email
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{
                  backgroundColor: "#e6e7f8",
                  padding: "5px",
                  overflow: "hidden",
                }}>
                {data?.whois_information?.emails
                  ? typeof data?.whois_information?.emails === "object"
                    ? data?.whois_information?.emails?.join(" , ")
                    : data?.whois_information?.emails
                  : "Not Found"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* ******* about website section ******* */}
        <Grid
          item
          xs={12}
          sm={3.5}
          sx={{
            height: "100%",
          }}>
          <Box sx={{ p: 1 }}>
            <Typography color="primary" variant="h6" sx={{ my: 1 }}>
              <b>About Website</b>
            </Typography>
            <Typography variant="body2">
              {data?.meta_data?.twitter && data?.meta_data?.twitter?.title}.
              &nbsp;
              {(data?.meta_data?.twitter &&
                data?.meta_data?.twitter?.description) ||
                data?.meta?.meta_data?.description}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography color="primary" variant="h6" sx={{ my: 1 }}>
              <b>Contact</b>
            </Typography>
            {/* <Stack direction="row" spacing={2} alignItems="center">
              <LocalPhoneIcon sx={{ color: "gray" }} />
              <Typography variant="body2">{formatedData?.name}</Typography>
            </Stack> */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mt: 1, overflow: "hidden" }}>
              <AlternateEmailIcon sx={{ color: "gray" }} />
              <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
                {data?.whois_information?.emails
                  ? typeof data?.whois_information?.emails === "object"
                    ? data?.whois_information?.emails?.join(" , ")
                    : data?.whois_information?.emails
                  : "Not Found"}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mt: 1 }}>
              <ContactMailIcon sx={{ color: "gray" }} />
              <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
                {data?.whois_information?.address
                  ? typeof data?.whois_information?.address === "object"
                    ? data?.whois_information?.address.join(" , ")
                    : data?.whois_information?.address
                  : "Not Found"}
              </Typography>
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ my: 1, minHeight: 100 }}>
              <Typography color="primary" variant="h6">
                <b>Reviews</b>
              </Typography>
              <Paper
                variant="outlined"
                sx={{ p: 1, minHeight: 100 }}
                className={styles.centered}>
                <Typography variant="body2" color="error" align="center">
                  Not Found
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* </Box> */}
    </>
  );
};

export default Result;
