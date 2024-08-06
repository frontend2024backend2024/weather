import React from 'react';
//import { Item } from '../thisDayInfo/ThisDayInfo';
import { IndicatorSvgSelector } from '../../../../assets/icons/IndicatorSvgSelector';
import style from './ThisDayItem.module.scss';

//interface Props {
  //item: Item;
//}

export const ThisDayItem =({ item }: any) => {
  const MemoizedGlobalSvgSelector = React.memo(IndicatorSvgSelector);

  return (
    <div className={style.dayItem__indicator}>
        <div className={style.dayItem__indicatorSvg}>
          <MemoizedGlobalSvgSelector id={item.icon_id}/>
        </div>
        <div className={style.indicatorGroup__name}>
          {item.name}
        </div>
        <div className={style.indicatorGroup__value}>
          {item.value}
        </div>
    </div>
  );
};