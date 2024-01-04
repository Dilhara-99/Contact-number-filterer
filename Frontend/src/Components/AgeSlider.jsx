import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

function valuetext(value) {
  return `${value}`;
}

export default function AgeSlider() {
  const [value, setValue] = React.useState([15, 40]);

  const handleChange = (event, newValue) => {
    if (newValue[0] <= newValue[1]) {
      setValue(newValue);
    } else {
      setValue([newValue[0], newValue[0]]);
    }
  };

  return (
    <>
      <Box sx={{ width: 300 }}>
        <Typography>
          Selected Age range:
          <Typography sx={{ fontSize: "20px", color: "black" }}>
            {" "}
            {value[0]} - {value[1]}
          </Typography>{" "}
        </Typography>
      </Box>
      <Box sx={{ width: 300, marginTop: "20px", marginLeft: "20px" }}>
        <Slider
          getAriaLabel={() => "Age range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={15}
          max={70}
          step={1}
        />
      </Box>
    </>
  );
}
