import { createContext, useContext } from "react";
import { System } from "../@types";
import { action, makeObservable, observable } from "mobx";

class SystemStore {
  systems: System[] = [];
  systemsLoaded: boolean = false;

  constructor() {
    makeObservable(this, {
      systems: observable,
      systemsLoaded: observable,
      setSystems: action.bound,
      setSystemsLoaded: action.bound,
    });
  }

  setSystems(systems: System[]) {
    this.systems = systems;
  }

  setSystemsLoaded(b: boolean) {
    this.systemsLoaded = b;
  }
}

const systemStore = new SystemStore();
export const SystemStoreContext = createContext(systemStore);
export const useSystemStoreContext = () => useContext(SystemStoreContext);
