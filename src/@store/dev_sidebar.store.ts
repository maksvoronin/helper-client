import { createContext, useContext } from "react";
import { action, makeObservable, observable } from "mobx";

class DevSidebarStore {
  isDevSidebar: "true" | "false" = "false";

  constructor() {
    makeObservable(this, {
      isDevSidebar: observable,
      setDevSidebar: action.bound,
    });
  }

  setDevSidebar(b: "true" | "false") {
    this.isDevSidebar = b;
  }
}

export const devSidebarStore = new DevSidebarStore();
export const DevSidebarStoreContext = createContext(devSidebarStore);
export const useDevSidebarStoreContext = () => useContext(DevSidebarStoreContext);
