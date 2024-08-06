import styles from './Header.module.scss'

import React, { useState, useEffect, useCallback } from "react";
import Select from 'react-select'

import headerLogo from "../../assets/header/Header logo.svg"
import invertCollors from "../../assets/header/Invert collors.svg"
import { useTheme } from '../../hooks/useTheme';
import { Theme } from '../../context/ThemeContext';

import { weatherOptions } from '../../service/WeatherOption';
import { fetchDataSelectUpdate} from '../../service/WeatherFetch';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const Header: React.FC = () => {
const theme = useTheme();

const queryClient = useQueryClient();

const { mutate } = useMutation({
  mutationFn: (data) => {
    return fetchDataSelectUpdate(data);
  },
  onSuccess: (url: any) => {
      queryClient.setQueryData(['weatherData'], url);
  },
});

//const { data, isLoading, error } = fetchWeatherData('https://api.open-meteo.com/v1/forecast?latitude=53.9&longitude=27.5667&hourly=temperature_2m,weather_code&timezone=Europe%2FMoscow');

  const colourStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor:
        theme.theme === Theme.DARK ? '#4F4F4F' : 'rgba(71, 147, 255, 0.2)',
      width: '194px',
      height: '37px',
      border: 'none',
      borderRadius: '10px',
      zIndex: 100,
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: theme.theme === Theme.DARK ? '#fff' : '#000',
    }),
  };

  const changeTheme = useCallback(() => {
    theme.changeTheme(theme.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }, [theme]);
  const [selected, setSelected] = useState(Number);

  useEffect(() => {
    const storedValue = localStorage.getItem('selectedFetchCity');
    if (storedValue) {
      const value = JSON.parse(storedValue);
      const index = weatherOptions.findIndex((option) => option.value === value);
      setSelected(index)
    }else{
      setSelected(0)
    }
  }, []);

  const handleChange = (newValue: any) => {
  if (newValue.value !== selected) {
    localStorage.setItem('selectedFetchCity', JSON.stringify(newValue.value));
    localStorage.setItem('selectedCity', JSON.stringify(newValue.label));
    setSelected(newValue.value);
    mutate(newValue.value);
  }
};

return (
  <header>
    <section className={styles.wraper}>
      <div className={styles.wraper__component}>
        <img src={headerLogo} alt="header logo" />
        <h1>React weather</h1>
      </div>
      <div className={styles.wraper__component}>
        <img src={invertCollors} alt="invert collors" onClick={changeTheme} />
        <Select
          className={styles.select}
          styles={colourStyles}
          options={weatherOptions}
          onChange={handleChange}
          value={weatherOptions[selected]}
        />
      </div>
    </section>
  </header>
);
}