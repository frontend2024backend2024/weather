import { weatherOptions } from "./WeatherOption";
//import { storeZustand } from "./WeatherService";

export const fetchData = async () => {
  //const days = storeZustand.getState().dayCount;
  const url = localStorage.getItem('selectedFetchCity');
  if (url) {
    const value = JSON.parse(url);
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?${value}&hourly=weather_code,relative_humidity_2m,temperature_2m,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_hours,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Europe%2FMoscow&forecast_days=16`
    );
    return response.json();
  } else {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?${weatherOptions[0].value}&hourly=weather_code,relative_humidity_2m,temperature_2m,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_hours,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Europe%2FMoscow&forecast_days=16`
    );
    return response.json();
  }
};

export const fetchDataSelectUpdate = async (value: any) => {
  //const data = storeZustand.getState().dayCount;
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${value}&hourly=weather_code,relative_humidity_2m,temperature_2m,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_hours,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Europe%2FMoscow&forecast_days=16`
  );
  return response.json();
};