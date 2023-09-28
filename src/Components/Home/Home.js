import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import styles from "../../styles/Home.module.css";
import { MuiChipsInput } from "mui-chips-input";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import Result from "../Result/Result";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";

const Home = ({ isMdDown, isSmDown }) => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("websiteScreening"))?.userId;
  const [inputBoxCount, setInputBoxCount] = useState([
    {
      type: "text",
      id: 0,
      url: "",
      keywords: [],
      csvKeyWords: null,
    },
  ]);
  const [loading, setLoading] = useState({
    createJob: false,
    userIdData: false,
  });
  const [apiData, setApiData] = useState(null);
  const hiddenFileInput = useRef(null);
  const [error, setError] = useState([
    {
      id: 0,
      url: false,
      keywords: false,
      csvKeyWords: false,
    },
  ]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("error");

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip
      // placement="bottom-end"
      {...props}
      classes={{ popper: className }}
    />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 12,
    },
  }));

  // eslint-disable-next-line no-lone-blocks
  {
    /* CSV Sample file download configuration */
  }
  const csvHeaders = [{ label: "keywords", key: "keywords" }];
  const csvData = [
    { keywords: "scam" },
    { keywords: "fraud" },
    { keywords: "Cheat" },
    { keywords: "Drugs" },
  ];
  const csvlink = {
    filename: "keywords.csv",
    headers: csvHeaders,
    data: csvData,
  };

  const handleAddFields = (index, e) => {
    if (inputBoxCount.length < 10) {
      setInputBoxCount((s) => {
        return [
          ...s,
          {
            type: "text",
            id: index,
            url: "",
            keywords: [],
            csvKeyWords: null,
          },
        ];
      });
      setError((s) => {
        return [
          ...s,
          {
            id: 0,
            url: false,
            keywords: false,
            csvKeyWords: false,
          },
        ];
      });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const index = e.target.id;
    setInputBoxCount((s) => {
      const newArr = s.slice();
      let { value } = e.target;
      newArr[index].url = value;
      return newArr;
    });
  };

  const handleChipChange = (newChips, ind) => {
    const index = ind;
    setInputBoxCount((s) => {
      const newArr = s.slice();
      if (newArr[index].keywords.length < 10) {
        newArr[index].keywords = newChips;
      }

      return newArr;
    });
  };

  const handleDeleteFields = () => {
    if (inputBoxCount.length > 1) {
      let newArr = [...inputBoxCount];
      newArr.splice(inputBoxCount.length - 1, 1);
      setInputBoxCount([...newArr]);
    }
    if (error.length > 1) {
      let newArr = [...error];
      newArr.splice(error.length - 1, 1);
      setError([...newArr]);
    }
  };

  const validateFields = () => {
    let a = inputBoxCount.map((item, index) => {
      let urlRegex =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
      let isValid = urlRegex.test(item?.url?.trim());
      if (isValid) {
        setError((s) => {
          const newErrorArr = s.slice();
          newErrorArr[item.id].url = false;
          return newErrorArr;
        });
        if (item?.keywords?.length > 0 || item?.csvKeyWords?.length) {
          setError((s) => {
            const newErrorArr = s.slice();
            newErrorArr[item.id].keywords = false;
            return newErrorArr;
          });
          setError((s) => {
            const newErrorArr = s.slice();
            newErrorArr[item.id].csvKeyWords = false;
            return newErrorArr;
          });
          return false;
        } else {
          setError((s) => {
            const newErrorArr = s.slice();
            newErrorArr[item.id].keywords = true;
            return newErrorArr;
          });
          setSnackbarOpen(true);
          setSnackbarType("error");
          setSnackbarMessage("Enter Keywords or Upload a csv file");
          return true;
        }
      } else {
        setError((s) => {
          const newErrorArr = s.slice();
          newErrorArr[item.id].url = true;
          return newErrorArr;
        });
        setSnackbarOpen(true);
        setSnackbarType("error");
        setSnackbarMessage("Enter the URL");
        return true;
      }
    });
    return a;
  };

  const handleSearch = (e) => {
    let a = validateFields();
    if (a.includes(true)) {
      console.log("sorry");
    } else {
      console.log("Success");
      let arr = [];
      for (let i = 0; i < inputBoxCount?.length; i++) {
        let fraudKeyWords;
        if (
          inputBoxCount[i]?.keywords?.length &&
          inputBoxCount[i]?.csvKeyWords?.length
        ) {
          fraudKeyWords = [
            ...inputBoxCount[i]?.keywords,
            ...inputBoxCount[i]?.csvKeyWords,
          ];
        } else if (inputBoxCount[i]?.keywords?.length) {
          fraudKeyWords = [...inputBoxCount[i]?.keywords];
        } else {
          fraudKeyWords = [...inputBoxCount[i]?.csvKeyWords];
        }
        if (inputBoxCount[i].url.endsWith("/")) {
          inputBoxCount[i].url = inputBoxCount[i].url.slice(0, -1);
        }
        let obj = {
          url: inputBoxCount[i]?.url,
          keywords: fraudKeyWords,
        };
        arr.push(obj);
      }
      // console.log(arr);
      handleSearchClick(arr);
    }
  };

  const handleSearchClick = (arr) => {
    if (!JSON.parse(localStorage.getItem("websiteScreening"))?.userId) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setLoading({ ...loading, createJob: true });
      var config = {
        method: "POST",
        url: `${process.env.REACT_APP_WEBSITE_SCREENING}/url-screening`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          user_id: JSON.parse(localStorage.getItem("websiteScreening"))?.userId,
          user_data: arr,
        },
      };
      axios(config)
        .then((response) => {
          if (response.status === 200) {
            setSnackbarMessage("Task created Successfully");
            setSnackbarOpen(true);
            setSnackbarType("success");
            for (let item of arr) {
              setTimeout(() => handleInternalAPICall(item), 1500);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading({ ...loading, createJob: false });
          setSnackbarMessage("Some Error Occurred");
          setSnackbarOpen(true);
          setSnackbarType("error");
        });
    }
  };

  const handleInternalAPICall = (item) => {
    var config = {
      method: "POST",
      url: `${process.env.REACT_APP_WEBSITE_SCREENING}/get-inline-url`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        base_url: item.url,
        url: [item.url],
      },
    };
    axios(config)
      .then((response) => {
        // console.log(response.data);
        if (response.status === 200) {
          setInputBoxCount([
            {
              type: "text",
              id: 0,
              url: "",
              keywords: [],
              csvKeyWords: null,
            },
          ]);
          setError([
            {
              id: 0,
              url: false,
              keywords: false,
              csvKeyWords: false,
            },
          ]);
          setTimeout(() => handleGetDataFromUserId(), 1500);
        }
        setLoading({ ...loading, createJob: false });
      })
      .catch((error) => {
        console.log(error);
        setLoading({ ...loading, createJob: false });
      });
  };

  const handleGetDataFromUserId = () => {
    setLoading({ ...loading, userIdData: true });
    let config = {
      method: "POST",
      url: `${process.env.REACT_APP_WEBSITE_SCREENING}/get-data-from-user-id`, //get-data-from-user-id
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        user_id: userId,
      },
    };
    axios(config)
      .then((response) => {
        setApiData(response.data?.data?.value);
        setLoading({ ...loading, userIdData: false });
      })
      .catch((error) => {
        console.log(error);
        setLoading({ ...loading, userIdData: false });
        setApiData(null);
      });
  };

  const handleCSVUpload = (event, index) => {
    const fileUploaded = event.target.files[0];
    let data = new FormData();
    data.append("csv_file", fileUploaded);
    let config = {
      method: "POST",
      url: `${process.env.REACT_APP_WEBSITE_SCREENING}/upload-csv-file`, //get-data-from-user-id
      headers: {
        "content-type": "multipart/form-data",
      },
      data,
    };
    axios(config)
      .then((response) => {
        // console.log(response.data.data);
        setInputBoxCount((s) => {
          const newArr = s.slice();
          newArr[index].csvKeyWords = response.data?.data;
          return newArr;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("websiteScreening"))?.userId) {
      handleGetDataFromUserId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={{ bgcolor: "#eeeeee", pt: 8 }}>
        <Grid container spacing={2} sx={{ pb: { xs: 8, sm: 0 } }}>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              // maxHeight: "90vh",
            }}>
            <Box sx={{ mt: 5 }}>
              <Typography
                variant={isSmDown ? "h4" : isMdDown && !isSmDown ? "h3" : "h3"}
                sx={{ mb: { sm: 4, xs: 0 } }}
                align="center"
                color="primary">
                <b>Merchant Website Screening</b>
              </Typography>
            </Box>
            <Box
              className={styles.centered}
              sx={{
                flexDirection: "column",
                gap: 1,
                height: "70vh",
                overflowY: "scroll",
              }}>
              {inputBoxCount &&
                inputBoxCount.map((el, index) => (
                  <React.Fragment key={el.id + index}>
                    <Box
                      sx={{ gap: 1, flexDirection: "column", mt: 2 }}
                      className={styles.middle}>
                      <Box
                        className={styles.centered_noScroll}
                        sx={{
                          gap: { sm: 3.5, xs: 2 },
                          flexDirection: { xs: "column", sm: "row" },
                        }}>
                        <FormControl>
                          <Paper
                            component="form"
                            sx={{
                              p: "2px 10px",
                              display: "flex",
                              alignItems: "center",
                              width: 300,
                              height: 40,
                            }}>
                            <InputBase
                              multiline={false}
                              value={inputBoxCount[index].url}
                              fullWidth={true}
                              id={index}
                              sx={{ ml: 1, flex: 1 }}
                              onChange={(e) => handleChange(e)}
                              placeholder="Enter URL ex: https://example.com"
                            />
                          </Paper>
                        </FormControl>
                        {index === 0 ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}>
                            <Button
                              size="small"
                              variant="outlined"
                              disabled={index === 10 ? true : false}
                              color="primary"
                              sx={{ height: { sm: 44, xs: 34 } }}
                              onClick={(e) =>
                                handleAddFields(inputBoxCount.length, e)
                              }>
                              <AddIcon />
                            </Button>
                            <Button
                              className={styles.centered}
                              disabled={
                                inputBoxCount.length === 1 ? true : false
                              }
                              sx={{ height: { sm: 44, xs: 34 } }}
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={handleDeleteFields}>
                              <RemoveIcon />
                            </Button>
                          </Box>
                        ) : (
                          <>
                            <Button
                              disabled={true}
                              size="small"
                              variant="text"></Button>
                            <Button
                              disabled={true}
                              size="small"
                              variant="text"></Button>
                          </>
                        )}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: { sm: "row", xs: "column" },
                        }}>
                        <Paper
                          component="form"
                          id={index}
                          sx={{
                            p: "2px 10px",
                            display: "flex",
                            alignItems: "center",
                            width: 300,
                            minHeight: 60,
                            overflow: "scroll",
                          }}>
                          <MuiChipsInput
                            sx={{ "& fieldset": { border: "none" } }}
                            hideClearAll
                            // disableDeleteOnBackspace
                            fullWidth
                            size="small"
                            value={inputBoxCount[index].keywords}
                            onChange={(newValue) => {
                              // console.log(newValue, newValue.length);
                              if (newValue.length < 10) {
                                handleChipChange(newValue, index);
                              }
                            }}
                          />
                        </Paper>
                        <Typography
                          variant="caption"
                          align="center"
                          color="textSecondary"
                          sx={{ px: 0.7 }}>
                          OR
                        </Typography>
                        {inputBoxCount[index].csvKeyWords &&
                        inputBoxCount[index].csvKeyWords.length ? (
                          <>
                            <Button
                              // onClick={handleUploadButtonClick}
                              variant="contained"
                              component="label"
                              color="success"
                              startIcon={
                                <CloudUploadOutlinedIcon color="textSecondary" />
                              }>
                              File Uploaded
                              <input
                                type="file"
                                accept=".csv"
                                ref={hiddenFileInput}
                                hidden
                                onChange={(e) => handleCSVUpload(e, index)}
                              />
                              <LightTooltip
                                placement="bottom-start"
                                title={
                                  <>
                                    <Typography variant="caption">
                                      1.Heading of the CSV file should be
                                      'keywords'.
                                      <br />
                                      2. Keywords has to be lesser than 500
                                    </Typography>
                                    <br />
                                    <Stack
                                      direction="column"
                                      align="center"
                                      sx={{ mt: 0.5 }}>
                                      <CSVLink {...csvlink} target="_blank">
                                        <Button
                                          sx={{ alignItems: "center" }}
                                          size="small"
                                          variant="outlined">
                                          Download Sample File
                                        </Button>
                                      </CSVLink>
                                    </Stack>
                                  </>
                                }>
                                <IconButton size="small" sx={{ ml: 1 }}>
                                  <InfoOutlinedIcon />
                                </IconButton>
                              </LightTooltip>
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              // onClick={handleUploadButtonClick}
                              variant="contained"
                              component="label"
                              startIcon={
                                <CloudUploadOutlinedIcon color="textSecondary" />
                              }>
                              Upload a File
                              <input
                                type="file"
                                accept=".csv"
                                ref={hiddenFileInput}
                                hidden
                                onChange={(e) => handleCSVUpload(e, index)}
                              />
                            </Button>
                            <LightTooltip
                              placement="bottom-start"
                              title={
                                <>
                                  <Typography variant="caption">
                                    1.Heading of the CSV file should be
                                    'keywords'.
                                    <br />
                                    2. Keywords has to be lesser than 500
                                  </Typography>
                                  <br />
                                  <Stack
                                    direction="column"
                                    align="center"
                                    sx={{ mt: 0.5 }}>
                                    <CSVLink {...csvlink} target="_blank">
                                      <Button
                                        sx={{ alignItems: "center" }}
                                        size="small"
                                        variant="outlined">
                                        Download Sample File
                                      </Button>
                                    </CSVLink>
                                  </Stack>
                                </>
                              }>
                              <IconButton size="small" sx={{ ml: 1 }}>
                                <InfoOutlinedIcon />
                              </IconButton>
                            </LightTooltip>
                          </>
                        )}
                      </Box>
                      {error[index].url && (
                        <FormHelperText error={error[index].url} color="error">
                          Enter Valid Details
                        </FormHelperText>
                      )}
                      {inputBoxCount[index].keywords.length >= 10 && (
                        <Typography variant="body2" color="error">
                          Key words limit is exceeded
                        </Typography>
                      )}
                    </Box>
                  </React.Fragment>
                ))}
              <Button
                onClick={handleSearch}
                size="large"
                sx={{ mt: 1, mb: 2 }}
                disabled={loading.createJob ? true : false}
                endIcon={
                  loading.createJob ? (
                    <CircularProgress sx={{ color: "#fff" }} size={20} />
                  ) : (
                    <SendIcon />
                  )
                }
                variant="contained">
                Search
              </Button>

              <Typography
                sx={{
                  display: inputBoxCount?.length === 10 ? "block" : "none",
                }}
                variant="caption"
                color="error">
                TextField limit is exceeded
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* past search view */}

      <Container sx={{ my: 2, minHeight: 200 }}>
        <Typography variant="h5" color="primary" align="left" sx={{ my: 3 }}>
          <b>Website Searches</b>
        </Typography>
        {loading.userIdData ? (
          <>
            <Box
              sx={{
                height: 200,
                border: "1px solid #E8E8E8",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <CircularProgress />
            </Box>
          </>
        ) : (
          <>
            {!loading.userIdData && apiData && apiData.length ? (
              apiData.map((item, index) => (
                <React.Fragment key={index + item?.base_url}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      id="panel1a-header">
                      <Box sx={{ gap: 1 }} className={styles.middle}>
                        <Typography variant="body2">
                          {item?.whois_information?.domain_name
                            ? typeof item?.whois_information?.domain_name ===
                              "object"
                              ? item?.whois_information?.domain_name[0]
                              : item?.whois_information?.domain_name
                            : item?.base_url}
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                      <Result
                        data={item}
                        isSmDown={isSmDown}
                        isMdDown={isMdDown}
                      />
                    </AccordionDetails>
                  </Accordion>
                </React.Fragment>
              ))
            ) : (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <center>
                  <Typography variant="body1" color="error" align="center">
                    No Past Searches Found !
                  </Typography>
                </center>
              </Box>
            )}
          </>
        )}
        {/* {loading ? (
          <Box
            sx={{
              height: 200,
              border: "1px solid #E8E8E8",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <CircularProgress />
          </Box>
        ) : null}
        {!loading && apiData && apiData.length ? (
          apiData.map((item) => (
            <>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="panel1a-header">
                  <Box sx={{ gap: 1 }} className={styles.middle}>
                    <Typography variant="body2">
                      {typeof item?.whois_information?.domain_name === "object"
                        ? item?.whois_information?.domain_name[0]
                        : item?.whois_information?.domain_name}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Result data={item} />
                </AccordionDetails>
              </Accordion>
            </>
          ))
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Typography variant="body1" color="error" align="center">
              <center>No Past Searches Found!</center>
            </Typography>
          </Box>
        )} */}
      </Container>

      {/* snackBar for error and success messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
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
};

export default Home;
