import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const TimeRangeSlider = () => {
  const [value, setValue] = useState([0, 1439]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60) % 12 || 12;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = (minutes % 60 === 0) ? '00' : minutes % 60;
    const period = (minutes < 720) ? 'AM' : 'PM';

    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  return (
    <div style={{ width: 600,marginLeft:'40px'}}>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={1439}
        step={15}
        valueLabelFormat={(value) => minutesToTime(value)}
        valueLabelStyle={{ top: -20 }}
        aria-labelledby="range-slider"
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        <Typography>{minutesToTime(value[0])}</Typography>
        <Typography>{minutesToTime(value[1])}</Typography>
      </div>
    </div>
  );
};

export default TimeRangeSlider;
