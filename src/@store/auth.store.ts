import { createContext, useContext } from "react";
import { User } from "../@types";
import { action, makeObservable, observable } from "mobx";

class AuthStore {
  user: User = {} as User;
  isAuth: boolean = false;

  constructor() {
    makeObservable(this, {
      user: observable,
      isAuth: observable,
      setUser: action.bound,
      setAuth: action.bound,
    });
  }

  setAuth(b: boolean) {
    this.isAuth = b;
  }

  setUser(user: User) {
    this.user = user;
  }
}

export const authStore = new AuthStore();
export const AuthStoreContext = createContext(authStore);
export const useAuthStoreContext = () => useContext(AuthStoreContext);
