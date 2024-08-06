import React from 'react';
import style from './Popup.module.scss'

import { GlobalSvgSelector } from '../assets/icons/GlobalSvgSelector';
import { IndicatorSvgSelector } from '../assets/icons/IndicatorSvgSelector';
import { items } from '../pages/home/components/thisDayInfo/ThisDayInfo';


export const Popup: React.FC = () => {

    interface Item {
        icon_id: string;
        name: string;
        value: string;
    }

    return (
        <section className={style.popup}>
            <div className={style.popup__weather}>
              <div className={style.day__temp}>20°</div>
              <div className={style.day__name}>Среда</div>
              <div className={style.img}>
                <GlobalSvgSelector id="sun" />
              </div>
              <div className={style.day__time}>
                Время: <span>21:54</span>
              </div>
              <div className={style.day__city}>
                Время: <span>Санкт-Петербург</span>
              </div>
            </div>
            <div className={style.popup__indicator}>
                <div>
                  {items.map((item: Item) => (
                    <div className={style.dayItem__indicator}>
                      <div className={style.indicatorGroup__icon_id}>
                        <IndicatorSvgSelector id={item.icon_id}/>
                      </div>
                      <div className={style.indicatorGroup__name}>
                        {item.name}
                      </div>
                      <div className={style.indicatorGroup__value}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
            </div>
            <div className={style.close}>
              <GlobalSvgSelector id="close" />
            </div>
        </section>
    );
}