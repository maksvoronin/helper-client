import { createContext, useContext } from "react";
import { JournalMove, LokomotiveNumber } from "../@types";
import { action, makeObservable, observable } from "mobx";

class JournalmoveStore { 
  journalmove: JournalMove[] = [];

  constructor() {
    makeObservable(this, {
      journalmove: observable,
      setJournalMove: action.bound
    });
  }

  setJournalMove(journalmove: JournalMove[]) {
    this.journalmove = journalmove;
  }
}

const journalmoveStore = new JournalmoveStore();
export const JournalMoveStore = createContext(journalmoveStore);
export const useJournalMoveStore = () => useContext(JournalMoveStore);