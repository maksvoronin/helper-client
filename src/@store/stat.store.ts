import { createContext, useContext } from "react";
import { action, makeObservable, observable } from "mobx";

class StatStore { 
  comments: number = 0;
  decisions: number = 0;

  constructor() {
    makeObservable(this, {
      comments: observable,
      decisions: observable,
      setComments: action.bound,
      setDecisions: action.bound
    });
  }

  setComments(count: number) {
    this.comments = count;
  }

  setDecisions(count: number) {
    this.decisions = count;
  }
}

const statStore = new StatStore();
export const StatStoreContext = createContext(statStore);
export const useStatStoreContext = () => useContext(StatStoreContext);