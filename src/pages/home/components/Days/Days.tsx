import { Card } from './Card';

import style from './Days.module.scss';
import { Tabs } from './Tabs';

import { getApiData } from '../../../../service/WeatherService';

import { useEffect, useState } from 'react';

import { useStore } from 'zustand';

import { storeZustand } from '../../../../service/WeatherService';

export interface Day {
  day: string;
  day_info: string;
  icon_id: string;
  temp_day: string;
  temp_night: string;
  info: string;
}


export const Days = () => {

  const { dayCount} = useStore(storeZustand);

  const { data } = getApiData();
  const [days, setDays] = useState<Day[]>([]);


  function getDayOfWeekRussian(dateString: any) {
    const daysOfWeekRussian = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return daysOfWeekRussian[dayIndex];
  }

  function formatDate(dateString: any) {
    const months = [
      "янв", "фев", "мар", "апр", "май", "июн",
      "июл", "авг", "сен", "окт", "ноя", "дек"
    ];
  
    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    const day = date.getDate();
  
    return `${day} ${months[monthIndex]}`;
  }

  function getWeatherDescription(code: any) {
    switch (code) {
      case 0:
        return "ясное небо";
      case 1:
        return "преимущественно ясно";
      case 2:
        return "частично облачно";
      case 3:
        return "пасмурно";
      case 45:
        return "туман";
      case 48:
        return "налипающий туман";
      case 51:
        return "морось слабой интенсивности";
      case 53:
        return "морось умеренной интенсивности";
      case 55:
        return "морось сильной интенсивности";
      case 56:
        return "ледяная морось слабой интенсивности";
      case 57:
        return "ледяная морось сильной интенсивности";
      case 61:
        return "дождь небольшой интенсивности";
      case 63:
        return "дождь умеренной интенсивности";
      case 65:
        return "дождь сильной интенсивности";
      case 66:
        return "ледяной дождь слабой интенсивности";
      case 67:
        return "ледяной дождь сильной интенсивности";
      case 71:
        return "снегопад слабой интенсивности";
      case 73:
        return "снегопад умеренной интенсивности";
      case 75:
        return "снегопад сильной интенсивности";
      case 77:
        return "град";
      case 80:
        return "ливневый дождь слабой интенсивности";
      case 81:
        return "ливневый дождь умеренной интенсивности";
      case 82:
        return "ливневый дождь сильной интенсивности";
      case 85:
        return "снегопад слабой интенсивности";
      case 86:
        return "снегопад сильной интенсивности";
      case 95:
        return "гроза слабая или умеренная";
      case 96:
        return "гроза с градом слабым";
      case 99:
        return "гроза с градом сильным";
      default:
        return "Неизвестный код погоды";
    }
  }

  useEffect(() => {
    if (data) {
      const newDays: Day[] = data.daily.time.map((time: string, index: number) => {
        let dayInfo = '';
        if (index === 0) {
          dayInfo = 'Сегодня';
        } else if (index === 1) {
          dayInfo = 'Завтра';
        } else {
          dayInfo = getDayOfWeekRussian(time);
        }

        return {
          day: dayInfo,
          day_info: formatDate(data.daily.time[index]),
          icon_id: data.daily.weather_code[index],
          temp_day: data.daily.temperature_2m_max[index],
          temp_night: data.daily.temperature_2m_min[index],
          info: getWeatherDescription(data.daily.weather_code[index]),
        };
      });

      setDays(newDays);
    }
  }, [data]);
  
  return (
    <>
      <Tabs />
      <div className={style.days}>
        {days.slice(0, dayCount).map((day: Day, index) => (
          <Card day={day} key={index} />
        ))}
      </div>
    </>
  );
};