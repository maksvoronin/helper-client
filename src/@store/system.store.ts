import { createContext, useContext } from "react";
import { System } from "../@types";
import { action, makeObservable, observable } from "mobx";

class SystemStore { 
  systems: System[] = [];

  constructor() {
    makeObservable(this, {
      systems: observable,
      setSystems: action.bound
    });
  }

  setSystems(systems: System[]) {
    this.systems = systems;
  }
}

const systemStore = new SystemStore();
export const SystemStoreContext = createContext(systemStore);
export const useSystemStoreContext = () => useContext(SystemStoreContext);