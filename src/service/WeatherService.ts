import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./WeatherFetch";
import { create } from "zustand";

//interface WeatherData {
    //hourly: {
        //temperature_2m: number[],
    //},
  //}  


const getApiData = () => useQuery({
  queryKey: ['weatherData'],
  queryFn: fetchData
});

interface StoreState {
  dataApi: any;
  setDataApi: (data: any) => void;
  time: any;
  setTime: (data: any) => void;
  dayCount: any;
  setDayCount: (data: any) => void;
}

const storeZustand = create<StoreState>((set: any) => ({
  dataApi: null,
  setDataApi: (setDataApi: any) => set({ dataApi: setDataApi }),
  time: new Date().toLocaleTimeString(),
  setTime: (setTime: any) => set({ time: setTime }),
  dayCount: 7,
  setDayCount: (setDayCount: any) => set({ dayCount: setDayCount }),
}));

const getHourDayTime = (time: any) =>{
  return parseInt(time.split(":")[0])
}


export { getApiData, storeZustand, getHourDayTime }