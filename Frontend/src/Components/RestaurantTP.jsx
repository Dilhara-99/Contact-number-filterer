import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const RestaurantTP = ({ setSelectedTime }) => {
  const [value, setValue] = useState([660, 1439]);

  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60) % 24;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes % 60 === 0 ? "00" : minutes % 60;
    const formattedSeconds = "00";

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const formattedTime = [
      minutesToTime(newValue[0]),
      minutesToTime(newValue[1]),
    ];
    setSelectedTime(formattedTime);
  };
  return (
    <div style={{ width: 600, marginLeft: "40px" }}>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={660}
        max={1439}
        step={15}
        valueLabelFormat={(value) => minutesToTime(value)}
        valueLabelStyle={{ top: -20 }}
        aria-labelledby="range-slider"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <Typography>{minutesToTime(value[0])}</Typography>
        <Typography>{minutesToTime(value[1])}</Typography>
      </div>
    </div>
  );
};

export default RestaurantTP;
