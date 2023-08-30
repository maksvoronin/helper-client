import { action, makeObservable, observable } from "mobx";
import React from "react";

class ThemeStore {
  theme: "light" | "dark" = window.localStorage.theme;
  constructor() {
    makeObservable(this, {
      theme: observable,
      setTheme: action.bound,
    });
  }
  setTheme(theme: "light" | "dark") {
    this.theme = theme;
  }
}

const themeStore = new ThemeStore();
export const ThemeStoreContext = React.createContext(themeStore);
export const useThemeStore = () => React.useContext(ThemeStoreContext);
