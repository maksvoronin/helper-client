import { createContext, useContext } from "react";
import { Series } from "../@types";
import { action, makeObservable, observable } from "mobx";

class SeriesStore { 
  series: Series[] = [];

  constructor() {
    makeObservable(this, {
      series: observable,
      setSeries: action.bound
    });
  }

  setSeries(series: Series[]) {
    this.series = series;
  }
}

const seriesStore = new SeriesStore();
export const SeriesStoreContext = createContext(seriesStore);
export const useSeriesStoreContext = () => useContext(SeriesStoreContext);