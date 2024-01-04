import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import LocationComp from "../Components/LocationComp";
import AgeSlider from "../Components/AgeSlider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import NavigationBar from "../Components/NavigationBar";
import MainSlider from "../Components/MainSlider";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import Restaurant from "../Components/Restaurant";
import Taxi from "../Components/Taxi";
import Supermarket from "../Components/Supermarket";
import Logistic from "../Components/Logistic";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const renderSelectedComponent = () => {
    switch (selectedService) {
      case "Restaurant":
        return <Restaurant />;
      case "Taxi":
        return <Taxi />;
      case "Supermarket":
        return <Supermarket />;
      case "Logistic":
        return <Logistic />;
      default:
        return null;
    }
  };

  return (
    <>
      <Box sx={{ marginBottom: "20px" }}>
        <NavigationBar />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          padding: " 0 15px 15px 15px",
          backgroundColor: "#ebedf0",
        }}
      >
        <Grid container spacing={2}>
          <Grid item md={6} sm={12} container spacing={2}>
            <Grid item md={12} xs={6}>
              <Item sx={{ borderRadius: "12px" }}>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "18px",
                      padding: "12px 12px 0 12px",
                    }}
                  >
                    Location
                  </Typography>
                  <Divider>Select Location</Divider>
                  <Box sx={{ height: "410px", overflowY: "scroll" }}>
                    <LocationComp />
                  </Box>
                </Box>
              </Item>
            </Grid>

            <Grid item md={12} sm={6}>
              <Item sx={{ borderRadius: "12px" }}>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "18px",
                      padding: "12px 12px 0 12px",
                    }}
                  >
                    Age
                  </Typography>
                  <Divider>Age Range</Divider>
                  <Box sx={{ marginLeft: "25px", padding: "20px" }}>
                    <AgeSlider />
                  </Box>
                </Box>
              </Item>
            </Grid>
            <Grid item md={12} sm={6}>
              <Item sx={{ borderRadius: "12px" }}>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "18px",
                      padding: "12px 12px 0 12px",
                    }}
                  >
                    Gender
                  </Typography>
                  <Divider>Select Gender</Divider>
                  <Box sx={{ marginLeft: "65px", marginTop: "20px" }}>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Box>
              </Item>
            </Grid>
          </Grid>
          <Grid item md={6} sm={12} container spacing={2}>
            <Grid item md={12} sm={6}>
              <Item sx={{ borderRadius: "12px" }}>
                <Grid container>
                  <Grid item xs={3}>
                    <Typography
                      sx={{
                        fontWeight: "light",
                        color: "black",
                        fontSize: "18px",
                        textAlign: "center",
                        padding: "20px",
                      }}
                    >
                      User Count :
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      sx={{
                        fontWeight: "light",
                        color: "#06398c",
                        fontSize: "30px",
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      500,000
                    </Typography>
                  </Grid>
                </Grid>
              </Item>
              <Item sx={{ marginTop: "18px", borderRadius: "12px" }}>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "18px",
                      padding: "12px 12px 0 12px",
                    }}
                  >
                    Services
                  </Typography>
                  <Divider>Select Service</Divider>
                  <Box
                    sx={{
                      marginLeft: "23px",
                      marginTop: "15px",
                      height: "130px",
                      overflowY: "scroll",
                    }}
                  >
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={selectedService}
                        onChange={handleServiceChange}
                      >
                        <Grid container>
                          <Grid item xs={4}>
                            <Grid container>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  value="Restaurant"
                                  control={<Radio />}
                                  label="Restaurant"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  value="Taxi"
                                  control={<Radio />}
                                  label="Taxi"
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <FormControlLabel
                                  value="Supermarket"
                                  control={<Radio />}
                                  label="Supermarket"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={4}>
                            <Grid container>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  value="Logistic"
                                  control={<Radio />}
                                  label="Logistic"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  value="Education"
                                  control={<Radio />}
                                  label="Education"
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <FormControlLabel
                                  value="Other"
                                  control={<Radio />}
                                  label="Other"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={4}>
                            <Grid container>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  value="1111"
                                  control={<Radio />}
                                  label="1111"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  value="2222"
                                  control={<Radio />}
                                  label="2222"
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <FormControlLabel
                                  value="3333"
                                  control={<Radio />}
                                  label="3333"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Box>
              </Item>
              <Item
                sx={{
                  marginTop: "18px",
                  borderRadius: "12px",
                  height: "625px",
                }}
              >
                {selectedService ? (
                  renderSelectedComponent()
                ) : (
                  <Typography
                    sx={{
                      fontWeight: "light",
                      color: "#8f8e8d",
                      fontSize: "18px",
                      textAlign: "center",
                      marginTop: "120px",
                    }}
                  >
                    Please select a service
                  </Typography>
                )}
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Item sx={{ borderRadius: "12px" }}>
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: "18px",
                    padding: "12px 12px 0 12px",
                  }}
                >
                  Filtered Users
                </Typography>
                <Divider>User Count</Divider>
                <Grid container>
                  <Grid item xs={8}>
                    <MainSlider />
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container>
                      <Grid item={6}>
                        <Box style={{ margin: "45px 0 0 25px" }}>
                          <Button
                            variant="contained"
                            startIcon={<VisibilityIcon />}
                          >
                            View
                          </Button>
                        </Box>
                      </Grid>
                      <Grid item={6}>
                        <Box style={{ margin: "45px 0 0 25px" }}>
                          <Button
                            variant="contained"
                            startIcon={<DownloadForOfflineIcon />}
                          >
                            Download
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
