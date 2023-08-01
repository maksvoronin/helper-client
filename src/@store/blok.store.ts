import { createContext, useContext } from "react";
import { Blok } from "../@types";
import { action, makeObservable, observable } from "mobx";

class BlokS { 
  blok: Blok[] = [];

  constructor() {
    makeObservable(this, {
      blok: observable,
      setBlok: action.bound
    });
  }

  setBlok(blok: Blok[]) {
    this.blok = blok;
  }
}

const blokStore = new BlokS();
export const BlokStore = createContext(blokStore);
export const useBlokStore = () => useContext(BlokStore);