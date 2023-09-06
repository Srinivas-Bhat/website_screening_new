import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import styles from "../../styles/Home.module.css";
import { MuiChipsInput } from "mui-chips-input";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import Result from "../Result/Result";
import UploadButton from "../Common/UploadButton";

const Home = ({ isMdDown, isSmDown }) => {
  const userId = JSON.parse(localStorage.getItem("websiteScreening")).userId;
  const [inputBoxCount, setInputBoxCount] = useState([
    {
      type: "text",
      id: 0,
      url: "",
      keyWords: [],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [flag, setFlag] = useState(null);
  const [error, setError] = useState([
    {
      id: 0,
      url: false,
      keyWords: false,
    },
  ]);

  const handleAddFields = (index, e) => {
    if (inputBoxCount.length < 10) {
      setInputBoxCount((s) => {
        return [
          ...s,
          {
            type: "text",
            id: index,
            url: "",
            keyWords: [],
          },
        ];
      });
      setError((s) => {
        return [
          ...s,
          {
            id: 0,
            url: false,
            keyWords: false,
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
      newArr[index].url = e.target.value;
      return newArr;
    });
  };

  const handleChipChange = (newChips, ind) => {
    const index = ind;
    setInputBoxCount((s) => {
      const newArr = s.slice();
      if (newArr[index].keyWords.length < 10) {
        newArr[index].keyWords = newChips;
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
    // inputBoxCount &&
    let a = inputBoxCount.map((item, index) => {
      let urlRegex =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
      let isValid = urlRegex.test(item?.url?.trim());
      // if (!isValid) {
      //   setError((s) => {
      //     const newErrorArr = s.slice();
      //     newErrorArr[item.id].url = true;
      //     return newErrorArr;
      //   });
      //   Errorflag = true;
      // } else {
      //   setError((s) => {
      //     const newErrorArr = s.slice();
      //     newErrorArr[item.id].url = false;
      //     return newErrorArr;
      //   });
      // }
      // if (item.keyWords.length === 0) {
      //   setError((s) => {
      //     const newErrorArr = s.slice();
      //     newErrorArr[item.id].keyWords = true;
      //     return newErrorArr;
      //   });
      // } else {
      //   setError((s) => {
      //     const newErrorArr = s.slice();
      //     newErrorArr[item.id].keyWords = false;
      //     return newErrorArr;
      //   });
      // }
      if (isValid) {
        setError((s) => {
          const newErrorArr = s.slice();
          newErrorArr[item.id].url = false;
          return newErrorArr;
        });
        if (item.keyWords.length > 0) {
          setError((s) => {
            const newErrorArr = s.slice();
            newErrorArr[item.id].keyWords = false;
            return newErrorArr;
          });
          return false;
        } else {
          setError((s) => {
            const newErrorArr = s.slice();
            newErrorArr[item.id].keyWords = true;
            return newErrorArr;
          });
          return true;
        }
      } else {
        setError((s) => {
          const newErrorArr = s.slice();
          newErrorArr[item.id].url = true;
          return newErrorArr;
        });
        return true;
      }
    });
    // console.log(a);
    return a;
  };

  const handleSearch = (e) => {
    let a = validateFields();
    console.log(a, error);
    if (a.includes(true)) {
      console.log("sorry");
    } else {
      console.log("Success");
    }
    // console.log(flag);
    // if (flag) {
    //   alert("sorry folks");
    // } else {
    // console.log(Object.values(error));
    // console.log(inputBoxCount);
    // }
  };

  const handleSecondInternalAPICall = () => {
    setLoading(true);
    var config = {
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
        // console.log(response.data);
        setApiData(response.data.data.value);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setApiData(null);
      });
  };

  useEffect(() => {
    handleSecondInternalAPICall();
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
              {inputBoxCount.map((el, index) => (
                <React.Fragment key={el.id + index}>
                  <Box
                    sx={{ gap: 1, flexDirection: "column", mt: 2 }}
                    className={styles.middle}>
                    <Box className={styles.centered_noScroll} sx={{ gap: 3.5 }}>
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
                            fullWidth={true}
                            id={index}
                            sx={{ ml: 1, flex: 1 }}
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter URL ex: https://example.com"
                            // inputProps={{ "aria-label": "search google maps" }}
                          />
                        </Paper>
                      </FormControl>
                      {index === 0 ? (
                        <>
                          <Button
                            size="small"
                            variant="outlined"
                            disabled={index === 10 ? true : false}
                            color="primary"
                            sx={{ height: 44 }}
                            onClick={(e) =>
                              handleAddFields(inputBoxCount.length, e)
                            }>
                            <AddIcon />
                          </Button>
                          <Button
                            className={styles.centered}
                            disabled={inputBoxCount.length === 1 ? true : false}
                            sx={{ height: 44 }}
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={handleDeleteFields}>
                            <RemoveIcon />
                          </Button>
                        </>
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
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Paper
                        component="form"
                        id={index}
                        sx={{
                          p: "2px 10px",
                          display: "flex",
                          alignItems: "center",
                          width: 300,
                          minHeight: 60,
                        }}>
                        <MuiChipsInput
                          sx={{ "& fieldset": { border: "none" } }}
                          hideClearAll
                          // disableDeleteOnBackspace
                          fullWidth
                          size="small"
                          value={inputBoxCount[index].keyWords}
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
                      <UploadButton />
                    </Box>
                    {error[index].url && (
                      <FormHelperText error={error[index].url} color="error">
                        Enter Valid Details
                      </FormHelperText>
                    )}
                    {inputBoxCount[index].keyWords.length >= 10 && (
                      <Typography variant="caption" color="error">
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
                endIcon={<SendIcon />}
                variant="contained">
                Search
              </Button>

              <Typography
                sx={{
                  display: inputBoxCount.length === 10 ? "block" : "none",
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

      <Container sx={{ my: 2, minHeight: 200, border: "1px solid #DCDCDC" }}>
        <Typography variant="h5" color="primary" align="left" sx={{ my: 3 }}>
          <b>Website Searches</b>
        </Typography>
        {loading ? (
          <Box
            sx={{
              height: 300,
              border: "1px solid #E8E8E8",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <CircularProgress />
          </Box>
        ) : null}
        {!loading && apiData && apiData.length
          ? apiData.map((item) => (
              <>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1a-header">
                    <Box sx={{ gap: 1 }} className={styles.middle}>
                      <Typography variant="body2">
                        {typeof item?.whois_information?.domain_name ===
                        "object"
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
          : null}

        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography>Lists2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 4,
              }}>
              <Box>
                <Typography variant="body1">
                  Domain Name: https://mui.com
                </Typography>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  sx={{ height: 10, borderRadius: 5 }}
                  value={50}
                />
                </Box>
              </Box>
              <Box>
                <Button variant="contained" color="warning">
                  Running
                </Button>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion> */}
      </Container>
    </>
  );
};

export default Home;