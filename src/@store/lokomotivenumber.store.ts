import { createContext, useContext } from "react";
import { LokomotiveNumber } from "../@types";
import { action, makeObservable, observable } from "mobx";

class LokomotiveNumberStore { 
  lokomotivenumbers: LokomotiveNumber[] = [];
  lokomotivenumbersLoaded: boolean = false;

  constructor() {
    makeObservable(this, {
      lokomotivenumbers: observable,
      lokomotivenumbersLoaded: observable,
      setLokomotiveNumbers: action.bound,
      setLokomotiveNumbersLoaded: action.bound
    });
  }

  setLokomotiveNumbers(lokomotivenumbers: LokomotiveNumber[]) {
    this.lokomotivenumbers = lokomotivenumbers;
  }

  setLokomotiveNumbersLoaded(b: boolean) {
    this.lokomotivenumbersLoaded = b;
  }
}

const lokomotivenumberStore = new LokomotiveNumberStore();
export const LokomotiveNumberStoreContext = createContext(lokomotivenumberStore);
export const useLokomotiveNumberStoreContext = () => useContext(LokomotiveNumberStoreContext);