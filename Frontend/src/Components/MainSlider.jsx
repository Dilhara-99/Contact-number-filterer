import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

function valuetext(value) {
  return `${value}`;
}

export default function MainSlider({ userCount,value, setValue}) {
  
  const [selectedUserCount, setSelectedUserCount] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const count = calculateUserCount(newValue);
    setSelectedUserCount(count);
  };

  useEffect(() => {
    setValue([value[0], userCount]);
    setSelectedUserCount(calculateUserCount([value[0], userCount]));
  }, [userCount]);

  function calculateUserCount(range) {
    const selectedUserCount = Math.floor(range[1] - range[0] + 1);
    return selectedUserCount;
  }
  return (
    <>
      <Box>
        <Typography sx={{ margin: "15px" }}>
          Users within the range: {selectedUserCount}
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
          max={userCount}
        />
      </Box>
    </>
  );
}
