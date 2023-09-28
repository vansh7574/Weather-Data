import { GenericAbortSignal } from "axios";
import { createSlice } from "@reduxjs/toolkit";
// utils
import axiosInstance from "utils/axiosInstance";
import { dispatch } from "redux/store";
import { WeatherData } from "components/WeatherDisplay";

// ----------------------------------------------------------------------
interface IState {
  search: {
    isLoading: boolean;
    data: WeatherData | null;
  };
}
const initialState: IState = {
  search: {
    isLoading: false,
    data: null,
  },
};

const slice = createSlice({
  name: "shared",
  initialState,
  reducers: {
    // START LOADING
    startSearchLoading(state) {
      state.search.isLoading = true;
    },
    setSearchResults(state, action) {
      state.search.data = action.payload;
      state.search.isLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

export function searchByZipCode(
  zipCountryCode: string,
  signal: GenericAbortSignal | null
) {
  return async () => {
    dispatch(slice.actions.startSearchLoading());
    try {
      // https://api.openweathermap.org/geo/1.0/zip?zip=E14,GB&appid=
      const { status, data } = await axiosInstance.get(
        `/geo/1.0/zip?zip=${zipCountryCode}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`,
        signal ? { signal } : {}
      );
      if (status === 200) {
        const { lat, lon } = data;
        await dispatch(searchWeatherInfo(lat, lon));
      }
    } catch (error) {
      dispatch(slice.actions.setSearchResults(null));
    }
  };
}

export function searchWeatherInfo(lat: number, lon: number) {
  return async () => {
    dispatch(slice.actions.startSearchLoading());
    try {
      // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
      const { status, data } = await axiosInstance.get(
        `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
      );
      if (status === 200) {
        dispatch(slice.actions.setSearchResults(data));
      }
    } catch (error) {
      return error;
    }
  };
}
