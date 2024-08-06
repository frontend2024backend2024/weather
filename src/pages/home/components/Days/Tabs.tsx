
import style from './Tabs.module.scss';

import { useStore } from 'zustand';

import { storeZustand } from '../../../../service/WeatherService';

import { useState } from 'react';


export const Tabs = () => {

  const { setDayCount} = useStore(storeZustand);

  const [activeTab, setActiveTab] = useState({ value: 'На неделю' });

  const tabs = [
    {
      value: 'На неделю',
      count: 7,
    },
    {
      value: 'На 12 дней',
      count: 12,
    },
    {
      value: 'На 16 дней',
      count: 16,
    },
  ];

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
    setDayCount(tab.count);
  };

  return (
    <div className={style.tabs}>
      <div className={style.tabs__wrapper}>
        {tabs.map(tab => (
          <div
          className={`${style.tab} ${activeTab.value === tab.value ? style.active : ''}`}
          key={tab.value}
          onClick={() => handleTabClick(tab)}
        >
            {tab.value}
          </div>
        ))}
      </div>
      <div className={style.cancel}>.!..</div>
    </div>
  );
};