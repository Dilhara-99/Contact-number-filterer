import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Grid, Typography } from "@mui/material";

function valuetext(value) {
  return `${value}`;
}

function calculateUserCount(range) {
  const userCount = Math.floor(range[1] - range[0]);
  return userCount;
}

export default function MainSlider() {
  const [value, setValue] = React.useState([0, 0]);
  const [userCount, setUserCount] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const count = calculateUserCount(newValue);
    setUserCount(count);
  };

  return (
    <>
      <Box>
        <Typography sx={{ margin: "15px" }}>
          Users within the range: {userCount}
        </Typography>
      </Box>

      <Box sx={{ margin: "0 25px 30px 25px" }}>
        <Slider
          style={{ padding: "0px" }}
          getAriaLabel={() => "users range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={1}
          max={100001}
        />
      </Box>
    </>
  );
}