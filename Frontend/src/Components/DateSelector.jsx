import React, { useState } from "react";
import { Box, Typography, Stack, Checkbox } from "@mui/material";

const DateSelector = ({ setSelectedDays }) => {
  const [pselectedDays, setPSelectedDays] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const handleCheckboxChange = (index) => {
    const newSelectedDays = [...pselectedDays];
    newSelectedDays[index] = !newSelectedDays[index];
    setPSelectedDays(newSelectedDays);

    const selectedDayNames = newSelectedDays
      .map((isSelected, index) =>
        isSelected
          ? [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ][index]
          : null
      )
      .filter((day) => day !== null);
    setSelectedDays(selectedDayNames);
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
                checked={pselectedDays[index]}
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
