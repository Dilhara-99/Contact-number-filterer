import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Divider, RadioGroup, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import DateSelector from "./DateSelector";

export default function Taxi({
  setSelectedDays,
  selectedServiceProvider,
  setSelectedServiceProvider,
  travelFeeOption,
  setTravelFeeOption,
  travelTimeOption,
  setTravelTimeOption,
  travelFeeAmount,
  setTravelFeeAmount,
  travelTime,
  setTravelTime,
}) {
  const handleServiceProviderChange = (provider) => {
    const isSelected = selectedServiceProvider.includes(provider);

    if (isSelected) {
      const updatedProviders = selectedServiceProvider.filter(
        (r) => r !== provider
      );
      setSelectedServiceProvider(updatedProviders);
    } else {
      setSelectedServiceProvider([...selectedServiceProvider, provider]);
    }
  };

  const handleTravelFeeAmountChange = (index, value1) => {
    const newTravelFeeAmount = [...travelFeeAmount];
    newTravelFeeAmount[index] = value1;
    setTravelFeeAmount(newTravelFeeAmount);
  };

  const handleTravelTimeChange = (index, value) => {
    const newTravelTimeValues = [...travelTime];
    newTravelTimeValues[index] = value;
    setTravelTime(newTravelTimeValues);
  };

  const renderTravelTimeInputs = () => {
    if (travelTimeOption === "Between") {
      return (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "20ch" },
            margin: "0 0 1px 13px",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="rangeStart"
            variant="outlined"
            placeholder="minutes"
            value={travelTime[0]}
            onChange={(e) => handleTravelTimeChange(0, e.target.value)}
          />
          <TextField
            id="rangeEnd"
            variant="outlined"
            placeholder="minutes"
            value={travelTime[1]}
            onChange={(e) => handleTravelTimeChange(1, e.target.value)}
          />
        </Box>
      );
    } else {
      return (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            margin: "0 0 1px 13px",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            variant="outlined"
            placeholder="minutes"
            value={travelTime[0]}
            onChange={(e) => handleTravelTimeChange(0, e.target.value)}
          />
        </Box>
      );
    }
  };

  const renderTravelFeeInputs = () => {
    if (travelFeeOption === "Between") {
      return (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "20ch" },
            margin: "0 0 1px 13px",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="travelFeeStart"
            variant="outlined"
            placeholder="Rs."
            value={travelFeeAmount[0]}
            onChange={(e) => handleTravelFeeAmountChange(0, e.target.value)}
          />
          <TextField
            id="travelFeeEnd"
            variant="outlined"
            placeholder="Rs."
            value={travelFeeAmount[1]}
            onChange={(e) => handleTravelFeeAmountChange(1, e.target.value)}
          />
        </Box>
      );
    } else {
      return (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            margin: "0 0 1px 13px",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            variant="outlined"
            placeholder="Rs."
            value={travelFeeAmount[0]}
            onChange={(e) => handleTravelFeeAmountChange(0, e.target.value)}
          />
        </Box>
      );
    }
  };

  const handleTravelFeeRadioChange = (e) => {
    setTravelFeeOption(e.target.value);
    setTravelFeeAmount([""]);
  };

  const handleTravelTimeRadioChange = (e) => {
    setTravelTimeOption(e.target.value);
    setTravelTime([""]);
  };

  

  return (
    <>
      <Grid>
        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "black",
              fontSize: "18px",
              padding: "10px 10px 0 10px",
            }}
          >
            Taxi
          </Typography>
          <Divider>Select Taxi</Divider>
          <Box
            sx={{
              border: "1px solid #f0efed",
              borderRadius: "15px",
              margin: "5px 7px 0 7px",
              padding: "0 15px 0 15px",
            }}
          >
            <Box
              sx={{
                marginTop: "5px",
                padding: "0 10px 0 10px",
                height: "90px",
                overflowY: "scroll",
              }}
            >
              <Grid container>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedServiceProvider.includes("PickMe")}
                            onChange={() =>
                              handleServiceProviderChange("PickMe")
                            }
                          />
                        }
                        label="PickMe"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedServiceProvider.includes("Uber")}
                            onChange={() => handleServiceProviderChange("Uber")}
                          />
                        }
                        label="Uber"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedServiceProvider.includes("Kangaroo")}
                            onChange={() =>
                              handleServiceProviderChange("Kangaroo")
                            }
                          />
                        }
                        label="Kangaroo"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedServiceProvider.includes("Other")}
                            onChange={() =>
                              handleServiceProviderChange("Other")
                            }
                          />
                        }
                        label="Other"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Grid container>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    border: "1px solid #f0efed",
                    borderRadius: "15px",
                    margin: "10px",
                    padding: "0 10px 0 10px",
                  }}
                >
                  <DateSelector setSelectedDays={setSelectedDays} />
                </Box>
              </Grid>
              <Box
                sx={{
                  border: "1px solid #f0efed",
                  borderRadius: "15px",
                  margin: "10px",
                  padding: "10px 10px 0 10px",
                }}
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Box sx={{ margin: "0 0 5px 0" }}>
                      <Typography>Travel Time :</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ margin: "0 0 0 13px" }}>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={travelTimeOption}
                        onChange={handleTravelTimeRadioChange}
                        name="radio-buttons-group"
                      >
                        <Grid container>
                          <Grid item xs={3}>
                            <FormControlLabel
                              value="Equal"
                              control={<Radio />}
                              label="Equal"
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <FormControlLabel
                              value="Grater than"
                              control={<Radio />}
                              label="Grater than"
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <FormControlLabel
                              value="Less than"
                              control={<Radio />}
                              label="Less than"
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <FormControlLabel
                              value="Between"
                              control={<Radio />}
                              label="Between"
                            />
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    {renderTravelTimeInputs()}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: "1px solid #f0efed",
                  borderRadius: "15px",
                  margin: "0 10px 0 10px",
                  padding: "10px 10px 0 10px",
                }}
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Box sx={{ margin: "0 0 2px 0" }}>
                      <Typography>Travel Fee :</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ margin: "0 0 0 3px" }}>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={travelFeeOption}
                        onChange={handleTravelFeeRadioChange}
                        name="radio-buttons-group"
                      >
                        <Grid container>
                          <Grid item xs={3}>
                            <FormControlLabel
                              value="Equal"
                              control={<Radio />}
                              label="Equal"
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <FormControlLabel
                              value="Grater than"
                              control={<Radio />}
                              label="Grater than"
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <FormControlLabel
                              value="Less than"
                              control={<Radio />}
                              label="Less than"
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <FormControlLabel
                              value="Between"
                              control={<Radio />}
                              label="Between"
                            />
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    {renderTravelFeeInputs()}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
}
