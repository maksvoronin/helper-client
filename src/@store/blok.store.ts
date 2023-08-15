import { createContext, useContext } from "react";
import { Blok } from "../@types";
import { action, makeObservable, observable } from "mobx";

class BlokS { 
  blok: Blok[] = [];
  blokLoaded: boolean = false;

  constructor() {
    makeObservable(this, {
      blok: observable,
      blokLoaded: observable,
      setBlok: action.bound,
      setBlokLoaded: action.bound
    });
  }

  setBlokLoaded(b: boolean) {
    this.blokLoaded = b;
  }

  setBlok(blok: Blok[]) {
    this.blok = blok;
  }
}

const blokStore = new BlokS();
export const BlokStore = createContext(blokStore);
export const useBlokStore = () => useContext(BlokStore);