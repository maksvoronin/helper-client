import { createContext, useContext } from "react";
import { Ptol } from "../@types";
import { action, makeObservable, observable } from "mobx";

class PtolStore { 
  ptols: Ptol[] = [];

  constructor() {
    makeObservable(this, {
      ptols: observable,
      setPtols: action.bound
    });
  }

  setPtols(ptols: Ptol[]) {
    this.ptols = ptols;
  }
}

const ptolStore = new PtolStore();
export const PtolStoreContext = createContext(ptolStore);
export const usePtolStoreContext = () => useContext(PtolStoreContext);