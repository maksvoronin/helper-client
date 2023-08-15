import { createContext, useContext } from "react";
import { JournalMove } from "../@types";
import { action, makeObservable, observable } from "mobx";

class JournalmoveStore { 
  journalmove: JournalMove[] = [];
  journalmoveLoaded: boolean = false;

  constructor() {
    makeObservable(this, {
      journalmove: observable,
      journalmoveLoaded: observable,
      setJournalMove: action.bound,
      setJournalMoveLoaded: action.bound
    });
  }

  setJournalMove(journalmove: JournalMove[]) {
    this.journalmove = journalmove;
  }

  setJournalMoveLoaded(b: boolean) {
    this.journalmoveLoaded = b;
  }
}

const journalmoveStore = new JournalmoveStore();
export const JournalMoveStore = createContext(journalmoveStore);
export const useJournalMoveStore = () => useContext(JournalMoveStore);