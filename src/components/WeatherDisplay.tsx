import { Paper, Typography, Box } from "@mui/material";
import React from "react";

//{(weatherData.main.temp - 273.15)*9/5 + 32} °F, {(weatherData.main.temp - 273.15)} °C
export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  if (!weatherData) {
    return <div>No Data</div>;
  }
  return (
    <Paper elevation={3} sx={{ p: 2, margin: "0 auto" }}>
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="h6" gutterBottom>
          Weather in {weatherData.name}, {weatherData.sys.country}
        </Typography>
        <Typography>
          Main: {weatherData.weather[0].main},{" "}
          {weatherData.weather[0].description}
        </Typography>
        <Typography>
          Temperature: {weatherData.main.temp} °K /{"    "}
          {(((weatherData.main.temp - 273.15) * 9) / 5 + 32).toFixed(2)} °F /
          {"    "} {(weatherData.main.temp - 273.15).toFixed(2)} °C
        </Typography>
        <Typography>
          Feels Like: {weatherData.main.feels_like} °K /{"    "}
          {(((weatherData.main.feels_like - 273.15) * 9) / 5 + 32).toFixed(
            2
          )}{" "}
          °F / {"    "}
          {(weatherData.main.feels_like - 273.15).toFixed(2)} °C
        </Typography>
        <Typography>Min Temperature: {weatherData.main.temp_min} °K</Typography>
        <Typography>Max Temperature: {weatherData.main.temp_max} °K</Typography>
        <Typography>Pressure: {weatherData.main.pressure} hPa</Typography>
        <Typography>Humidity: {weatherData.main.humidity}%</Typography>
        <Typography>Wind Speed: {weatherData.wind.speed} m/s</Typography>
        <Typography>Wind Direction: {weatherData.wind.deg}°</Typography>
        <Typography>Cloudiness: {weatherData.clouds.all}%</Typography>
        <Typography>
          Sunrise:{" "}
          {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
        </Typography>
        <Typography>
          Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default WeatherDisplay;
