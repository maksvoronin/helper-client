import { createContext, useContext } from "react";
import { Series } from "../@types";
import { action, makeObservable, observable } from "mobx";

class SeriesStore {
  series: Series[] = [];
  seriesLoaded: boolean = false;

  constructor() {
    makeObservable(this, {
      series: observable,
      seriesLoaded: observable,
      setSeries: action.bound,
      setSeriesLoaded: action.bound,
    });
  }

  setSeries(series: Series[]) {
    this.series = series;
  }

  setSeriesLoaded(b: boolean) {
    this.seriesLoaded = b;
  }
}

const seriesStore = new SeriesStore();
export const SeriesStoreContext = createContext(seriesStore);
export const useSeriesStoreContext = () => useContext(SeriesStoreContext);
