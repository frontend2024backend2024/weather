import React from 'react';
import { GlobalSvgSelector } from '../../../../assets/icons/GlobalSvgSelector';
import { Day } from './Days';

import style from './Card.module.scss';

interface Props {
  day: Day;
}

export const Card = React.memo(({ day }: Props) => {

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
  return (
    <div className={style.card}>
      <div className={style.day}>{day.day}</div>
      <div className={style.day__info}>{day.day_info}</div>
      <div className={style.img}>
        <GlobalSvgSelector id={getWeatherDescription(day.icon_id)} />
      </div>
      <div className={style.temp__day}>{day.temp_day}</div>
      <div className={style.temp__night}>{day.temp_night}</div>
      <div className={style.info}>{day.info}</div>
    </div>
  );
});