import React, { useEffect, useState } from "react";

import { dispatch, useSelector } from "redux/store";
import { actions, searchByZipCode } from "redux/slices/shared";
import WeatherDisplay from "components/WeatherDisplay";
import { Box, TextField, Typography } from "@mui/material";

const Home = () => {
  let controller = new AbortController();
  let signal = controller.signal;
  const [searchedText, setSearchedText] = useState("");
  const {
    search: { data: weatherData },
  } = useSelector((state) => state.shared);

  useEffect(() => {
    if (searchedText.length >= 1) {
      controller.abort();
      controller = new AbortController();
      signal = controller.signal;
      dispatch(searchByZipCode(searchedText, signal));
      return () => controller.abort();
    } else if (!searchedText.length) {
      dispatch(actions.setSearchResults(null));
    }
  }, [searchedText]);

  const handleSearchedTextChange = (text: string) => {
    setSearchedText(text);
  };

  return (
    <Box
      m={5}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      <Typography variant="h4" align="center">
        Weather App
      </Typography>
      <TextField
        size="medium"
        fullWidth
        label="Enter ZIP/Country Code"
        placeholder="Type in format zip,country code"
        variant="outlined"
        value={searchedText}
        onChange={(event) => handleSearchedTextChange(event.target.value)}
      />
      <WeatherDisplay weatherData={weatherData} />
    </Box>
  );
};

export default Home;
