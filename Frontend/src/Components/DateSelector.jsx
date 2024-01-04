import React, { useState } from "react";
import { Box, Typography, Stack, Checkbox } from "@mui/material";

const DateSelector = () => {
  const [selectedDays, setSelectedDays] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  const handleCheckboxChange = (index) => {
    const newSelectedDays = [...selectedDays];
    newSelectedDays[index] = !newSelectedDays[index];
    setSelectedDays(newSelectedDays);
  };

  return (
    <>
      <Box>
        <Typography>Select Day :</Typography>
        <Stack direction="row" spacing={6} sx={{ padding: "5px" }}>
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day, index) => (
            <Box key={index}>
              <Checkbox
                checked={selectedDays[index]}
                onChange={() => handleCheckboxChange(index)}
              />
              <Typography>{day}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default DateSelector;
