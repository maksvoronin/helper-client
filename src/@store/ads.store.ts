import { action, makeObservable, observable } from "mobx";
import React from "react";

class AdsStore {
  ads: boolean = window.localStorage.ads === "true" || false;
  constructor() {
    makeObservable(this, {
      ads: observable,
      setAds: action.bound,
    });
  }
  setAds(b: boolean) {
    window.localStorage.ads = b;
    this.ads = b;
  }
}

const adsStore = new AdsStore();
export const AdsStoreContext = React.createContext(adsStore);
export const useAdsStore = () => React.useContext(AdsStoreContext);
