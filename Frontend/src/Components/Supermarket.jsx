import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Divider, RadioGroup, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import DateSelector from "../Components/DateSelector";
import SupermarketTP from "./SupermarketTP";

export default function Supermarket({
  setSelectedDays,
  setSelectedTime,
  amountValues,
  setAmountValues,
  setAmountOption,
  amountOption,
  selectedServiceProvider,
  setSelectedServiceProvider,
}) {
  const handleAmountChange = (index, value) => {
    const newAmountValues = [...amountValues];
    newAmountValues[index] = value;
    setAmountValues(newAmountValues);
  };

  const handleServiceProviderChange = (restaurant) => {
    const isSelected = selectedServiceProvider.includes(restaurant);

    if (isSelected) {
      const updatedRestaurants = selectedServiceProvider.filter(
        (r) => r !== restaurant
      );
      setSelectedServiceProvider(updatedRestaurants);
    } else {
      setSelectedServiceProvider([...selectedServiceProvider, restaurant]);
    }
  };
  const renderAmountInputs = () => {
    if (amountOption === "Between") {
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
            placeholder="Rs."
            value={amountValues[0]}
            onChange={(e) => handleAmountChange(0, e.target.value)}
          />
          <TextField
            id="rangeEnd"
            variant="outlined"
            placeholder="Rs."
            value={amountValues[1]}
            onChange={(e) => handleAmountChange(1, e.target.value)}
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
            value={amountValues[0]}
            onChange={(e) => handleAmountChange(0, e.target.value)}
          />
        </Box>
      );
    }
  };
  const handleRadioChange = (e) => {
    setAmountOption(e.target.value);
    setAmountValues([""]);
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
              padding: "12px 12px 0 12px",
            }}
          >
            Supermarket
          </Typography>
          <Divider>Select Supermarket</Divider>
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
                            checked={selectedServiceProvider.includes(
                              "Keells Super"
                            )}
                            onChange={() =>
                              handleServiceProviderChange("Keells Super")
                            }
                          />
                        }
                        label="Keells Super"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedServiceProvider.includes(
                              "Cargills"
                            )}
                            onChange={() => handleServiceProviderChange("Cargills")}
                          />
                        }
                        label="Cargills"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Arpico"
                        checked={selectedServiceProvider.includes("Arpico")}
                        onChange={() => handleServiceProviderChange("Arpico")}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Laugfs"
                        checked={selectedServiceProvider.includes("Laugfs")}
                        onChange={() => handleServiceProviderChange("Laugfs")}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Grid container>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: "1px solid #f0efed",
                  borderRadius: "15px",
                  margin: "10px 10px 0 10px",
                  padding: "10px",
                }}
              >
                <DateSelector setSelectedDays={setSelectedDays} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: "1px solid #f0efed",
                  borderRadius: "15px",
                  margin: "10px 10px 0 10px",
                  padding: "10px",
                }}
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Box sx={{ marginBottom: "5px" }}>
                      <Typography>Time Range :</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <SupermarketTP setSelectedTime={setSelectedTime} />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: "1px solid #f0efed",
                  borderRadius: "15px",
                  margin: "10px",
                  padding: "10px",
                }}
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Box sx={{ margin: "0 0 10px 0" }}>
                      <Typography>Amount Spent :</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ margin: "0 0 5px 13px" }}>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={amountOption}
                        onChange={handleRadioChange}
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
                    {renderAmountInputs()}
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
