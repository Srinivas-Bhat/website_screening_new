import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import styles from "../../styles/View.module.css";
import moment from "moment";

const View = () => {
  function useIsWidthDown(breakpoint) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.down(breakpoint));
  }
  const isSmDown = useIsWidthDown("sm");
  let { id } = useParams();
  const [formatedData, setFormatedData] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState({
    websiteDetails: false,
    apiCall: false,
  });
  let websiteScreening = JSON.parse(localStorage.getItem("websiteScreening"));

  const flat_an_object = (object) => {
    let result = {};
    const recursiveFunction = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === "object" && Array.isArray(obj[key]) === false) {
          recursiveFunction(obj[key]);
        } else {
          result = { ...result, [key]: obj[key] };
        }
      }
    };
    recursiveFunction(object);
    // console.log(result);
    setFormatedData(result);
    // return result;
  };

  const flatDataHelper = (searchedDataArray) => {
    if (searchedDataArray && searchedDataArray?.data?.value?.length) {
      let data = searchedDataArray?.data?.value.map((item) => {
        return flat_an_object(item);
      });
      setFormatedData(data);
      // flat_an_object()
    }
  };

  const handleApiCall = () => {
    setLoading({ ...loading, apiCall: true });
    var config = {
      method: "POST",
      url: `${process.env.REACT_APP_WEBSITE_SCREENING}/get-data-from-url`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        base_url: `https://${id}`,
        user_id: websiteScreening?.userId,
      },
    };
    axios(config)
      .then((response) => {
        // console.log(response.data);
        // getWebsiteDetails();
        setLoading({ ...loading, apiCall: false });
        setApiData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading({ ...loading, apiCall: false });
      });
  };

  const handleKeyword = (item) => {
    let data = "";
    item.keywords.map((el) => {
      data += el.word + ", ";
    });
    return data;
  };

  useEffect(() => {
    handleApiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    flat_an_object(apiData?.data?.value);
  }, [apiData]);

  return (
    <>
      <Container>
        <Box sx={{ position: "relative", minHeight: "45vh" }}>
          <Grid
            container
            sx={{
              position: "absolute",
              top: "25%",
            }}>
            <Grid item xs={12} sm={4} className={styles.centered}>
              {loading.websiteDetails ? (
                <Skeleton variant="circular" width={150} height={150} />
              ) : (
                <Box
                  sx={{
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    flexDirection: "column",
                  }}
                  className={styles.centered}>
                  <img
                    className={styles.centered}
                    // src={`https://www.google.com/s2/favicons?sz=64&domain_url=${id}`}
                    src={`https://logo.clearbit.com/${id}`}
                    width={"100%"}
                    height={"100%"}
                    alt="logo"
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                  {isSmDown ? null : (
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      sx={{
                        mt: 1,
                        ":first-letter": { textTransform: "uppercase" },
                      }}>
                      <b>{id}</b>
                    </Typography>
                  )}
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={8}>
              <Stack direction="column" align={isSmDown ? "center" : ""}>
                <Typography
                  variant={isSmDown ? "h4" : "h3"}
                  color="primary"
                  sx={{
                    ":first-letter": { textTransform: "uppercase" },
                    my: { xs: 2, sm: 1 },
                  }}>
                  <b>{id}</b>
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ my: 1 }}>
                  {formatedData && formatedData["twitter:title"]}
                </Typography>
                {/* <Stack direction="row" sx={{ my: 1 }}>
                    <Typography color="textSecondary">
                      <b>Rank : </b>
                    </Typography>
                    <Typography color="textSecondary">
                      &nbsp;&nbsp;{formatedData && formatedData.website_rank}
                    </Typography>
                  </Stack> */}
                {/* <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{ my: 1 }}>
                    <b>Reviews</b>
                  </Typography> */}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {/* <Box sx={{ minHeight: 600 }}> */}
      <Grid container sx={{ minHeight: 500, borderTop: "1px solid #f2f2f2" }}>
        <Grid
          item
          xs={12}
          sm={8.5}
          sx={{
            bgcolor: "#f2f2f2",
            height: "100%",
            p: 2,
          }}>
          {/* ************************ negative key word check ************************** */}
          <Box>
            <Typography color="primary" variant="h6">
              <b>Negative Keyword Check</b>
            </Typography>
            <Stack direction="row" spacing={2} sx={{ my: 1 }}>
              <Chip label="Drugs" />
              <Chip label="Concaine" />
              <Chip label="Magic Mushroom" />
            </Stack>
            <Paper
              variant="outlined"
              sx={{
                // height: 420,
                bgcolor: "#f2f2f2",
                p: 1,
              }}>
              {loading.apiCall ? (
                <Box
                  sx={{
                    height: 350,
                    width: "100%",
                  }}
                  className={styles.centered}>
                  <CircularProgress />
                </Box>
              ) : formatedData?.fraud_urls_found?.length === 0 ? (
                <Box
                  sx={{
                    width: "100%",
                    minHeight: 300,
                  }}
                  className={styles.centered}>
                  <Typography variant="h6" color="error" align="center">
                    No Data Found
                  </Typography>
                </Box>
              ) : (
                <TableContainer
                  component={Paper}
                  elevation={0}
                  sx={{
                    overflow: "scroll",
                    height: 350,
                    overflowX: "hidden",
                  }}>
                  <Table
                    stickyHeader
                    // padding="normal"
                    sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>URL</b>
                        </TableCell>
                        <TableCell align="right">
                          <b>Key Words</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formatedData?.fraud_urls_found?.map((row, index) => (
                        <TableRow
                          key={
                            row.url +
                            index +
                            row.fraudScore +
                            row.totalScore +
                            row.sentimentScore
                          }
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                            "&:nth-of-type(odd)": {
                              backgroundColor: "#eee",
                            },
                          }}>
                          <TableCell
                            sx={{
                              maxWidth: 350,
                              lineBreak: "strict",
                              overflowWrap: "break-word",
                              wordWrap: "break-word",
                            }}
                            component="th"
                            scope="row">
                            {row.url}
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title={handleKeyword(row)}>
                              <InfoIcon fontSize="small" color="action" />
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Box>

          {/* ************************ Online External Data ************************** */}
          <Box sx={{ my: 2 }}>
            <Typography color="primary" variant="h6">
              <b>Online External Data</b>
            </Typography>
            <Paper
              variant="outlined"
              sx={{ minHeight: 200, my: 1, bgcolor: "#f2f2f2", p: 1 }}>
              <Stack direction="row" sx={{ my: 2 }}>
                <Typography variant="body1" color="textSecondary">
                  <b>Rank : &nbsp;</b>
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <b>
                    {(formatedData && formatedData.website_rank) ||
                      "Not Available"}
                  </b>
                </Typography>
              </Stack>
              <Typography variant="body1" color="primary" sx={{ my: 1 }}>
                <b>Customer Reviews</b>
              </Typography>

              <Box
                sx={{
                  border: "1px solid #e1e1e1",
                  width: "100%",
                  height: 150,
                }}
                className={styles.centered}>
                <Typography color="error" variant="body1">
                  No Data Found!
                </Typography>
              </Box>

              <Typography variant="body1" color="primary" sx={{ my: 1 }}>
                <b>News Check</b>
              </Typography>
              {loading.apiCall ? (
                <Box
                  sx={{
                    height: 100,
                    width: "100%",
                  }}
                  className={styles.centered}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {formatedData && formatedData?.news_check?.length ? (
                    <Box
                      sx={{ border: "1px solid #e1e1e1", height: 100 }}></Box>
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        height: 150,
                        border: "1px solid #e1e1e1",
                      }}
                      className={styles.centered}>
                      <Typography variant="body1" color="error" align="center">
                        No Data Found!
                      </Typography>
                    </Box>
                  )}
                </>
              )}
              {/* <Box sx={{ border: "1px solid white" }}>
                  <Typography color="error" variant="body1">
                    No Data Found!
                  </Typography>
                </Box>
                <Typography variant="body1" color="textSecondary">
                  <b>Customer Reviews</b>
                </Typography>
                <Box sx={{ border: "1px solid white" }}>
                  <Typography color="error" variant="body1">
                    No Data Found!
                  </Typography>
                </Box> */}
            </Paper>
          </Box>

          {/* ************************ Policy Data ************************** */}
          <Box>
            <Typography color="primary" variant="h6">
              <b>Policy Data</b>
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                minHeight: 200,
                bgcolor: "#f2f2f2",
                p: 1,
                my: 1,
              }}>
              <Stack
                direction="row"
                sx={{
                  my: 2,
                }}>
                <Typography variant="body2" color="textSecondary">
                  <b>Privacy Policy: </b> &nbsp; &nbsp;
                </Typography>
                {loading.apiCall ? (
                  <Skeleton variant="rectangular" width={150} height={20} />
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    {apiData?.data?.value?.domain_information?.privacy_url ||
                      "Not Available"}
                  </Typography>
                )}
              </Stack>
              <Typography variant="body1" color="primary" sx={{ my: 1 }}>
                <b>Registration Details</b>
              </Typography>
              <Box sx={{ border: "1px solid #e1e1e1", p: 1, mb: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>Registrar</b>
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {(formatedData && formatedData?.registrar) ||
                          "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>Registrant Postal Code</b>
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {(formatedData &&
                          formatedData?.registrant_postal_code) ||
                          "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>Hostname</b>
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {(formatedData && formatedData?.hostname) ||
                          "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>Creation Data</b>
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {(formatedData &&
                          moment(formatedData?.creation_date).format("ll")) ||
                          "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>Terms URL </b>
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {apiData?.data?.value?.domain_information?.terms_url ||
                          "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>Organization </b>
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {formatedData?.org || "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Box>

              {/* <Typography variant="body1" color="primary" sx={{ my: 1 }}>
                  <b>Privacy Policy</b>
                </Typography>
                {loading.apiCall ? (
                  <Box
                    sx={{
                      height: 100,
                      width: "100%",
                    }}
                    className={styles.centered}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    {apiData?.data?.value?.domain_information &&
                    apiData?.data?.value?.domain_information?.privacy_url
                      ?.length ? (
                      <Box
                        sx={{ border: "1px solid #e1e1e1", height: 100 }}></Box>
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: 150,
                          border: "1px solid #e1e1e1",
                        }}
                        className={styles.centered}>
                        <Typography variant="body1" color="error" align="center">
                          No Data Found!
                        </Typography>
                      </Box>
                    )}
                  </>
                )} */}
            </Paper>
          </Box>

          {/* ************************ Social Media Data ************************** */}
          <Box>
            <Typography color="primary" variant="h6">
              <b>Social Media Data</b>
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                minHeight: 100,
                bgcolor: "#f2f2f2",
                p: 1,
                my: 1,
              }}>
              {loading.apiCall ? (
                <Box
                  sx={{
                    height: 100,
                    width: "100%",
                  }}
                  className={styles.centered}>
                  <CircularProgress />
                </Box>
              ) : (
                <Stack spacing={2} direction="row" sx={{ mt: 3 }}>
                  {formatedData && formatedData?.social_media?.length ? (
                    formatedData?.social_media?.map((item) => (
                      <Link
                        href={item.url}
                        target="_blank"
                        sx={{ cursor: "pointer" }}>
                        <Chip
                          color="primary"
                          variant="outlined"
                          label={item.media}
                        />
                      </Link>
                    ))
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        height: 100,
                        border: "1px solid #e1e1e1",
                      }}
                      className={styles.centered}>
                      <Typography variant="body1" color="error" align="center">
                        No Data Found!
                      </Typography>
                    </Box>
                  )}
                </Stack>
              )}
            </Paper>
          </Box>

          {/* ************************ Technology Data ************************** */}
          <Box>
            <Typography color="primary" variant="h6">
              <b>Technology Data</b>
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                minHeight: 200,
                bgcolor: "#f2f2f2",
                p: 1,
                my: 1,
              }}>
              <Stack direction="row" sx={{ my: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  <b>Robots.txt :</b> &nbsp;&nbsp;
                </Typography>
                {loading.apiCall ? (
                  <Skeleton variant="rectangular" width={150} height={20} />
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    {apiData?.data?.value?.domain_information?.robots_txt ||
                      "Not Available"}
                  </Typography>
                )}
              </Stack>
              <Stack direction="row" sx={{ my: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  <b>Sitemap.xml :</b> &nbsp;&nbsp;
                </Typography>
                {loading.apiCall ? (
                  <Skeleton variant="rectangular" width={150} height={20} />
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    {apiData?.data?.value?.domain_information?.sitemap_xml ||
                      "Not Available"}
                  </Typography>
                )}
              </Stack>
              <Stack direction="row" sx={{ my: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  <b>Ads.txt :</b> &nbsp;&nbsp;
                </Typography>
                {loading.apiCall ? (
                  <Skeleton variant="rectangular" width={150} height={20} />
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    {apiData?.data?.value?.domain_information?.ads_txt ||
                      "Not Available"}
                  </Typography>
                )}
              </Stack>
              <Typography variant="body1" color="primary" sx={{ my: 1 }}>
                <b>Fraud Image URLs</b>
              </Typography>
              {loading.apiCall ? (
                <Box
                  sx={{
                    height: 100,
                    width: "100%",
                  }}
                  className={styles.centered}>
                  <CircularProgress />
                </Box>
              ) : (
                <Stack spacing={2} direction="row" sx={{ mt: 1 }}>
                  {formatedData &&
                  formatedData?.image_fraud_urls_found?.length ? (
                    formatedData?.image_fraud_urls_found?.map((item) => (
                      <Box
                        sx={{
                          height: 100,
                          width: 100,
                          objectFit: "scale-down",
                        }}>
                        <img
                          src={""}
                          alt="fraud img"
                          width="100%"
                          height="100%"
                        />
                      </Box>
                    ))
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        height: 100,
                        border: "1px solid #e1e1e1",
                      }}
                      className={styles.centered}>
                      <Typography variant="body1" color="error" align="center">
                        No Data Found!
                      </Typography>
                    </Box>
                  )}
                </Stack>
              )}
              <Typography variant="body1" color="primary" sx={{ my: 1 }}>
                <b>SSL Details</b>
              </Typography>
              <Box sx={{ border: "1px solid #e1e1e1", p: 1 }}>
                <Grid container spacing={3}>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>Peername</b>
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {formatedData?.peername?.join(` |  `) ||
                          "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>SAN :</b> &nbsp;&nbsp;
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {formatedData?.SAN?.join(` |  `) || "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>Host Name :</b> &nbsp;&nbsp;
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {formatedData?.hostname || "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>Common Name :</b> &nbsp;&nbsp;
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {formatedData?.commonname || "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>Issuer :</b> &nbsp;&nbsp;
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {formatedData?.issuer || "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>NotAfter :</b> &nbsp;&nbsp;
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {moment(formatedData?.notbefore).format("lll") ||
                          "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>NotBefore :</b> &nbsp;&nbsp;
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {moment(formatedData?.notafter).format("lll") ||
                          "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>Name :</b> &nbsp;&nbsp;
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {formatedData?.name || "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Box>
              {/* <Box sx={{ border: "1px solid #B8B8B8", minHeight: 100, px: 1 }}>
                  
                  
                  
                  <Stack direction="row" sx={{ my: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      <b>NotBefore :</b> &nbsp;&nbsp;
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        {moment(formatedData?.notafter).format("lll") ||
                          "Not Available"}
                      </Typography>
                    )}
                  </Stack>
                </Box> */}
              <Typography variant="body1" color="primary" sx={{ my: 1 }}>
                <b>Servers</b>
              </Typography>
              <Box sx={{ border: "1px solid #e1e1e1", minHeight: 100, px: 1 }}>
                {loading.apiCall ? (
                  <Box
                    sx={{
                      height: 100,
                      width: "100%",
                    }}
                    className={styles.centered}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Stack spacing={1} direction="column" sx={{ mt: 1 }}>
                    {formatedData && formatedData?.name_servers?.length ? (
                      formatedData?.name_servers?.map((item, index) => (
                        <Typography
                          color="textSecondary"
                          key={item + index}
                          variant="body2">
                          {item}
                        </Typography>
                      ))
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: 100,
                          border: "1px solid #e1e1e1",
                        }}
                        className={styles.centered}>
                        <Typography
                          variant="body1"
                          color="error"
                          align="center">
                          No Data Found!
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                )}
              </Box>
            </Paper>
          </Box>

          {/* ************************ Other Website Data ************************** */}
          <Box>
            <Typography color="primary" variant="h6">
              <b>Other Website Data</b>
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                minHeight: 200,
                bgcolor: "#f2f2f2",
                p: 1,
                my: 1,
              }}>
              <Typography variant="body1" color="primary" sx={{ my: 1 }}>
                <b>Details</b>
              </Typography>
              <Box sx={{ border: "1px solid #e1e1e1", minHeight: 100, p: 1 }}>
                <Grid container spacing={3}>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>Website Exists:</b> &nbsp;&nbsp;
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {(formatedData && formatedData?.website_exists) ||
                          "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>Address </b>
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {formatedData?.address || "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>City</b>
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {formatedData?.city || "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>State </b>
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {formatedData?.state || "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>Country :</b> &nbsp;&nbsp;
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {formatedData?.country || "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      <b>Email :</b> &nbsp;&nbsp;
                    </Typography>
                    {loading.apiCall ? (
                      <Skeleton variant="rectangular" width={150} height={20} />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          backgroundColor: "#dadbf4",
                          padding: "5px",
                          overflow: "hidden",
                        }}>
                        {(typeof formatedData?.emails === "object"
                          ? formatedData?.emails?.join(" , ")
                          : formatedData?.emails) || "Not Available"}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Box>

              <Typography variant="body1" color="primary" sx={{ my: 1 }}>
                <b>Contacts</b>
              </Typography>

              <Box sx={{ border: "1px solid #e1e1e1", minHeight: 100, px: 1 }}>
                {loading.apiCall ? (
                  <Box
                    sx={{
                      height: 100,
                      width: "100%",
                    }}
                    className={styles.centered}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Stack spacing={1} direction="column" sx={{ mt: 1 }}>
                    {formatedData &&
                    formatedData?.contact_information?.length ? (
                      formatedData?.contact_information?.map((item, index) => (
                        <React.Fragment key={item?.url}>
                          {item?.data?.phone &&
                            item?.data?.phone?.length &&
                            item?.data?.phone.map((elem, ind) => (
                              <React.Fragment key={elem.number + ind}>
                                <Stack direction="row" spacing={2}>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary">
                                    <b>Number</b>
                                  </Typography>
                                  {loading.apiCall ? (
                                    <Skeleton
                                      variant="rectangular"
                                      width={150}
                                      height={20}
                                    />
                                  ) : (
                                    <Typography
                                      variant="body2"
                                      color="textSecondary">
                                      {elem.number} - {elem.country || null}
                                    </Typography>
                                  )}
                                </Stack>
                                <Divider light={false} />
                              </React.Fragment>
                            ))}
                          <Stack direction="row" spacing={2}>
                            <Typography variant="body2" color="textSecondary">
                              <b>Email</b>
                            </Typography>
                            {loading.apiCall ? (
                              <Skeleton
                                variant="rectangular"
                                width={150}
                                height={20}
                              />
                            ) : (
                              <Typography variant="body2" color="textSecondary">
                                {item?.data?.email || "Not Available"}
                              </Typography>
                            )}
                          </Stack>
                          <Stack direction="row" spacing={2}>
                            <Typography variant="body2" color="textSecondary">
                              <b>URL</b>
                            </Typography>
                            {loading.apiCall ? (
                              <Skeleton
                                variant="rectangular"
                                width={150}
                                height={20}
                              />
                            ) : (
                              <Typography variant="body2" color="textSecondary">
                                {item?.data?.url || "Not Available"}
                              </Typography>
                            )}
                          </Stack>
                          <Stack direction="row" spacing={2}>
                            <Typography variant="body2" color="textSecondary">
                              <b>UPI</b>
                            </Typography>
                            {loading.apiCall ? (
                              <Skeleton
                                variant="rectangular"
                                width={150}
                                height={20}
                              />
                            ) : (
                              <Typography variant="body2" color="textSecondary">
                                {item?.data?.upi || "Not Available"}
                              </Typography>
                            )}
                          </Stack>
                          <Stack direction="row" spacing={2}>
                            <Typography variant="body2" color="textSecondary">
                              <b>URL</b>
                            </Typography>
                            {loading.apiCall ? (
                              <Skeleton
                                variant="rectangular"
                                width={150}
                                height={20}
                              />
                            ) : (
                              <Typography variant="body2" color="textSecondary">
                                {item?.url || "Not Available"}
                              </Typography>
                            )}
                          </Stack>
                        </React.Fragment>
                      ))
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: 100,
                        }}
                        className={styles.centered}>
                        <Typography
                          variant="body1"
                          color="error"
                          align="center">
                          No Data Found!
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                )}
              </Box>

              <Typography variant="body1" color="primary" sx={{ my: 1 }}>
                <b>Whois Information</b>
              </Typography>
              <Box
                sx={{
                  border: "1px solid #e1e1e1",
                  minHeight: 100,
                  px: 1,
                  mt: 1,
                }}></Box>
            </Paper>
          </Box>
        </Grid>

        {/* ******* about website section ******* */}
        <Grid
          item
          xs={12}
          sm={3.5}
          sx={{
            // border: "1px solid black",
            height: "100%",
          }}>
          <Box sx={{ p: 1 }}>
            <Typography color="primary" variant="h6" sx={{ my: 1 }}>
              <b>About Website</b>
            </Typography>
            <Typography variant="body2">
              {(formatedData && formatedData["twitter:title"]) ||
                (formatedData && formatedData["og:title"])}
              . &nbsp;
              {(formatedData && formatedData["twitter:description"]) ||
                (formatedData && formatedData.description)}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography color="primary" variant="h6" sx={{ my: 1 }}>
              <b>Contact</b>
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <LocalPhoneIcon sx={{ color: "gray" }} />
              <Typography variant="body2">{formatedData?.name}</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mt: 1, overflow: "hidden" }}>
              <AlternateEmailIcon sx={{ color: "gray" }} />
              <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
                {(typeof formatedData?.emails === "object"
                  ? formatedData?.emails?.join(" , ")
                  : formatedData?.emails) || "Not Available"}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mt: 1 }}>
              <ContactMailIcon sx={{ color: "gray" }} />
              <Typography variant="body2">{formatedData?.address}</Typography>
            </Stack>
            <Divider sx={{ my: 1 }} />
            {/* <Box sx={{ my: 1, minHeight: 100 }}>
              <Typography color="primary" variant="h6">
                <b>Reviews</b>
              </Typography>
            </Box> */}
            <Box sx={{ my: 1, minHeight: 100 }}>
              <Typography color="primary" variant="h6">
                <b>Reviews</b>
              </Typography>
              <Paper
                variant="outlined"
                sx={{ p: 1, minHeight: 200 }}
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

export default View;
