import { createContext, useContext } from "react";
import { LokomotiveNumber } from "../@types";
import { action, makeObservable, observable } from "mobx";

class LokomotiveNumberStore { 
  lokomotivenumbers: LokomotiveNumber[] = [];

  constructor() {
    makeObservable(this, {
      lokomotivenumbers: observable,
      setLokomotiveNumbers: action.bound
    });
  }

  setLokomotiveNumbers(lokomotivenumbers: LokomotiveNumber[]) {
    this.lokomotivenumbers = lokomotivenumbers;
  }
}

const lokomotivenumberStore = new LokomotiveNumberStore();
export const LokomotiveNumberStoreContext = createContext(lokomotivenumberStore);
export const useLokomotiveNumberStoreContext = () => useContext(LokomotiveNumberStoreContext);