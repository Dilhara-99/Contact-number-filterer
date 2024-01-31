import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Grid, Typography } from "@mui/material";

const GenderComp = ({ onSelectGender, userCountByGender }) => {
  const [value, setValue] = React.useState("All");

  useEffect(() => {
  }, [userCountByGender]);

  const handleChange = (event) => {
    setValue(event.target.value);
    onSelectGender(event.target.value);
  };

  return (
    <Box sx={{ marginLeft: "65px", marginTop: "20px" }}>
      <Grid container>
        <Grid item xs={2}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={value}
              name="radio-buttons-group"
              onChange={handleChange}
            >
              <FormControlLabel value="All" control={<Radio />} label="All" />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Unknown"
                control={<Radio />}
                label="Unknown"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <div>
            {Array.isArray(userCountByGender) ? (
              userCountByGender.map((genderData) => (
                <span key={genderData.Gender}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#585959",
                    }}
                  >
                    {` Selected Gender count : ${genderData.Gender} (${genderData.userCount})`}
                  </Typography>
                </span>
              ))
            ) : (
              <span></span>
            )}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GenderComp;
