import { createContext, useContext } from "react";
import { action, makeObservable, observable } from "mobx";

class LoaderStoreS {
  isLoaded: boolean = false;

  constructor() {
    makeObservable(this, {
      isLoaded: observable,
      setLoaded: action.bound,
    });
  }

  setLoaded(b: boolean) {
    this.isLoaded = b;
  }

}

export const loaderStore = new LoaderStoreS();
export const LoaderStore = createContext(loaderStore);
export const useLoaderStore = () => useContext(LoaderStore);
