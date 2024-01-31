import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

function valuetext(value) {
  return `${value}`;
}

const AgeSlider = ({ onSelectAge, userCountByAge }) => {
  const [value, setValue] = React.useState([15, 60]);

  useEffect(() => {
  }, [userCountByAge]);

  const handleChange = (event, newValue) => {
    const validNewValue =
      newValue[0] <= newValue[1] ? newValue : [newValue[0], newValue[0]];
    setValue(validNewValue);
    onSelectAge(validNewValue);
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={3}>
          <Typography>
            Selected Age range:
            <Typography variant="h6" sx={{ color: "black" }}>
              {value[0]} - {value[1]}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={9}>
          {userCountByAge && (
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#585959",
              }}
            >
              Selected count : ({userCountByAge[0]?.userCount || 0})
            </Typography>
          )}
        </Grid>
      </Grid>
      <Box sx={{ width: 300, marginTop: "20px", marginLeft: "20px" }}>
        <Slider
          getAriaLabel={() => "Age range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={15}
          max={60}
          step={1}
        />
      </Box>
    </Box>
  );
};

export default AgeSlider;
