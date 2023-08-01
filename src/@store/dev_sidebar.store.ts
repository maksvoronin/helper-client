import { createContext, useContext } from "react";
import { action, makeObservable, observable } from "mobx";

class DevSidebarStore {
  isDevSidebar: boolean = false;

  constructor() {
    makeObservable(this, {
      isDevSidebar: observable,
      setDevSidebar: action.bound,
    });
  }

  setDevSidebar(b: boolean) {
    this.isDevSidebar = b;
  }
}

export const devSidebarStore = new DevSidebarStore();
export const DevSidebarStoreContext = createContext(devSidebarStore);
export const useDevSidebarStoreContext = () => useContext(DevSidebarStoreContext);
