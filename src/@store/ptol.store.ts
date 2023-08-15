import { createContext, useContext } from "react";
import { Ptol } from "../@types";
import { action, makeObservable, observable } from "mobx";

class PtolStore { 
  ptols: Ptol[] = [];
  ptolsLoaded: boolean = false;

  constructor() {
    makeObservable(this, {
      ptols: observable,
      ptolsLoaded: observable,
      setPtols: action.bound,
      setPtolsLoaded: action.bound
    });
  }

  setPtols(ptols: Ptol[]) {
    this.ptols = ptols;
  }

  setPtolsLoaded(b: boolean) {
    this.ptolsLoaded = b;
  }
}

const ptolStore = new PtolStore();
export const PtolStoreContext = createContext(ptolStore);
export const usePtolStoreContext = () => useContext(PtolStoreContext);