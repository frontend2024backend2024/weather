import React, { useState, useEffect } from 'react';

import style from './ThisDay.module.scss'


import { useStore } from 'zustand';

import { getApiData, storeZustand, getHourDayTime } from '../../../../service/WeatherService';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchData } from '../../../../service/WeatherFetch'; 
import { GlobalSvgSelector } from '../../../../assets/icons/GlobalSvgSelector';

export const ThisDay: React.FC =() => {

  const MemoizedGlobalSvgSelector = React.memo(GlobalSvgSelector);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => {
      return fetchData();
    },
    onSuccess: (url: any) => {
        queryClient.setQueryData(['weatherData'], url);
    },
  });

  let { data, isLoading, error } = getApiData();
  const { time, setTime} = useStore(storeZustand);
  const [weather, setWeather ] = useState(String);


  useEffect(() => {
    // Вызываем setCurrentTime один раз до установки интервала
    setTime(new Date().toLocaleTimeString());
  
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString();
      setTime(newTime);
      if(newTime == `00:00:00`){
        mutate();
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, [setTime]);

  const timeHourZustandApiValue = getHourDayTime(time);

    const storedValue = localStorage.getItem('selectedCity');
    const value = storedValue ? JSON.parse(storedValue) : 'Минск';


    function getWeatherDescription(code: any) {
      switch (code) {
        case 0:
          return "sun";
        case 1:
          return "sun";
        case 2:
          return "sun";
        case 3:
          return "mainly_cloudy";
        case 45:
          return "туман";
        case 48:
          return "налипающий туман";
        case 51:
          return "small_rain_sun";
        case 53:
          return "small_rain_sun";
        case 55:
          return "small_rain_sun";
        case 56:
          return "small_rain_sun";
        case 57:
          return "small_rain_sun";
        case 61:
          return "small_rain";
        case 63:
          return "small_rain";
        case 65:
          return "small_rain";
        case 66:
          return "small_rain";
        case 67:
          return "small_rain";
        case 71:
          return "снегопад слабой интенсивности";
        case 73:
          return "снегопад умеренной интенсивности";
        case 75:
          return "снегопад сильной интенсивности";
        case 77:
          return "град";
        case 80:
          return "rain";
        case 81:
          return "rain";
        case 82:
          return "rain";
        case 85:
          return "снегопад слабой интенсивности";
        case 86:
          return "снегопад сильной интенсивности";
        case 95:
          return "rain";
        case 96:
          return "rain";
        case 99:
          return "rain";
        default:
          return "Неизвестный код погоды";
      }
    }

    useEffect(() => {
      if (data) {
        const dataWeather = getWeatherDescription(data.hourly.weather_code[timeHourZustandApiValue]);
        setWeather(dataWeather);
      }
    }, [data]);
      
    return (
        <>
            <section className={style.this__day}>
                <div className={style.this__dayTemp}>
                    <div className={style.dayTemp__header}>
                    {isLoading ? (
                      <p className={style.dayTemp__temperature}>Загрузка...</p>
                    ) : error ? (
                      <p className={style.dayTemp__temperature}>Error: {(error as Error).message}</p>
                    ) : (
                    data && (
                      <div>
                        <p className={style.dayTemp__temperature}>{data.hourly.temperature_2m[timeHourZustandApiValue]}°</p>
                      </div>
                    )
                  )}
                        <p className={style.dayTemp__dayNumber}>Сейчас</p>
                    </div>
                    <div className={style.dayTemp__bottom}>
                      <MemoizedGlobalSvgSelector width={140} height={140} id={weather} />
                    </div>
                </div>
                <div className={style.this__dayInfoSity}>
                    <p>Время: {time}</p>
                    <p>Город: {value}</p>
                </div>
            </section>
        </>
    );
}