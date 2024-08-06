import React from 'react';

import style from './ThisDayInfo.module.scss'

import image from "../../../../assets/ThisDayInfo/Cloud.png"

import { ThisDayItem } from './ThisDayItem';

import { getApiData } from '../../../../service/WeatherService';

import { useStore } from 'zustand';

import { storeZustand, getHourDayTime } from '../../../../service/WeatherService';

export interface Item {
  icon_id: string;
  name: string;
  value: string;
}

export const items = [
  {
    icon_id: 'temp',
    name: 'Температура',
    value: '20° - ощущается как 17°',
  },
  {
    icon_id: 'pressure',
    name: 'Давление',
    value: '765 мм ртутного столба - нормальное',
  },
  {
    icon_id: 'precipitation',
    name: 'Осадки',
    value: 'Без осадков',
  },
  {
    icon_id: 'wind',
    name: 'Ветер',
    value: '3 м/с юго-запад - легкий ветер',
  },
];

export const ThisDayInfo: React.FC = () => {

  const { time } = useStore(storeZustand);
  const timeHourValue = getHourDayTime(time);

  //const { data } = useQuery<any>({
        //queryKey: ['weatherData'],
      //});

      const { data } = getApiData();

      const windValue = data?.hourly?.wind_speed_10m?.[timeHourValue] ?? 'Загрузка..';
      const surfacePressureValue = data?.hourly?.surface_pressure?.[timeHourValue] ?? 'Загрузка..';
      const himidityValue = data?.hourly?.relative_humidity_2m?.[timeHourValue] ?? 'Загрузка..';
      const pretipitationValue = data?.daily?.precipitation_sum?.[0] !== undefined
      ? `${data?.daily?.precipitation_sum?.[0]} мм`
      : 'Загрузка...';
      const precipitationHourValue =
      data?.daily?.precipitation_hours?.[0] !== undefined
      ? data?.daily?.precipitation_hours?.[0] > 0
      ? ` ${data?.daily?.precipitation_hours?.[0]}ч`
      : ''
    : 'Загрузка...';
      const windDirectionDominantValue = data?.daily?.wind_direction_10m_dominant?.[0] ?? 'Загрузка..';

      const tempMax = data?.daily?.temperature_2m_max?.[0];
      const tempMin = data?.daily?.temperature_2m_min?.[0];
      const apparentTempMax = data?.daily?.apparent_temperature_max?.[0];
      const apparentTempMin = data?.daily?.apparent_temperature_min?.[0];

const deges = [
  'северный', 
  'северо-восточный', 
  'восточный', 
  'юго-восточный', 
  'южный', 
  'юго-западный', 
  'западный', 
  'северо-западный'];

let windDirection;
if (windDirectionDominantValue !== 'Загрузка..') {
  const angle = windDirectionDominantValue;
  if (angle >= 0 && angle < 45) {
    windDirection = deges[0];
  } else if (angle >= 45 && angle < 90) {
    windDirection = deges[1];
  } else if (angle >= 90 && angle < 135) {
    windDirection = deges[2];
  } else if (angle >= 135 && angle < 180) {
    windDirection = deges[3];
  } else if (angle >= 180 && angle < 225) {
    windDirection = deges[4];
  } else if (angle >= 225 && angle < 270) {
    windDirection = deges[5];
  } else if (angle >= 270 && angle < 315) {
    windDirection = deges[6];
  } else if (angle >= 315 && angle <= 360) {
    windDirection = deges[7];
  }
} else {
  windDirection = 'Загрузка..';
}

const windPower = [
  'затишье(штиль) (дым идет вертикально)', 
  'тихий ветерок (дым изгабается)',
  'легкий бриз (листья шевелятся)',
  'слабый бриз (листья и тонкие ветви колышатся)',
  'умереный бриз (поднимается пыль, тонкие ветви качаются)',
  'свежий бриз (качаются тонкие деревья)',
  'сильный бриз (качаются толстые деревья)',
  'крепкий ветер (изгибаются стволы деревьев)',
  'очень крепкий ветер(буря) (ломаются ветки)',
  'сильная буря(шторм) (черепица и трубы срываются)',
  'полная буря (сильный шторм) (деревья вырываются с корнем)',
  'жестокая буря(жесточайший шторм) (везде повреждения)',
  'ураган(тайфун) (большие разрушения)'] ;

let windPowerValue;
if (windValue !== 'Загрузка..') {
  const angle = windValue;
  if (angle >= 0 && angle < 0.2) {
    windPowerValue = windPower[0];
  } else if (angle >= 0.3 && angle <= 1.5) {
    windPowerValue = windPower[1];
  } else if (angle >= 1.6 && angle <= 3.3) {
    windPowerValue = windPower[2];
  } else if (angle >= 3.4 && angle <= 5.4) {
    windPowerValue = windPower[3];
  } else if (angle >= 5.5 && angle <= 7.9) {
    windPowerValue = windPower[4];
  } else if (angle >= 8.0 && angle <= 10.7) {
    windPowerValue = windPower[5];
  } else if (angle >= 10.8 && angle <= 13.8) {
    windPowerValue = windPower[6];
  } else if (angle >= 13.9 && angle <= 17.1) {
    windPowerValue = windPower[7];
  } else if (angle >= 17.2 && angle <= 20.7) {
    windPowerValue = windPower[8];
  } else if (angle >= 20.8 && angle <= 24.4) {
    windPowerValue = windPower[9];
  } else if (angle >= 24.5 && angle <= 28.4) {
    windPowerValue = windPower[10];
  } else if (angle >= 28.5 && angle <= 32.6) {
    windPowerValue = windPower[11];
  } else if (angle >= 32.7) {
    windPowerValue = windPower[12];
  }
} else {
  windPowerValue = 'Загрузка..';
}

const surfacePressure = Math.round((surfacePressureValue * 100) / 133.322);
let result;
if (surfacePressure >= 740 && surfacePressure <= 780) {
  result = `${surfacePressure} мм ртутного столба - нормальное`;
} else if (surfacePressure <= 739) {
  result = `${surfacePressure} мм ртутного столба - низкое`;
} else if (surfacePressure >= 781){
  result = `${surfacePressure} мм ртутного столба - высокое`;
}

const items = [
        {
          icon_id: 'temp',
          name: 'Температура',
          value: ` Макс ${tempMax}° - ощущается как ${apparentTempMax}°. Мин ${tempMin}° - ощущается как ${apparentTempMin}°`,
        },
        {
          icon_id: 'pressure',
          name: 'Давление',
          value: `${result}`,
        },
        {
          icon_id: 'precipitation',
          name: 'Осадки',
          value: `${pretipitationValue} ${precipitationHourValue}. Влажность ${himidityValue}%`,
        },
        {
          icon_id: 'wind',
          name: 'Ветер',
          value: `${windValue} м/с ${windDirection} - ${windPowerValue}`,
        },
      ];
    

    return (
        <>
            <section className={style.this__dayInfo}>
                <div className={style.dayInfo__PositionReleative}>
                {items.map((item: any, index) => (
                    <ThisDayItem key={index} item={item} />
                ))}
                <img src={image} alt="wather" />
                </div>
            </section></>
    );
}