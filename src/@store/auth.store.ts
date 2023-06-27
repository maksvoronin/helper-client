import { createContext, useContext } from "react";
import { User } from "../@types";
import { action, makeObservable, observable } from "mobx";

class AuthStore { 
  user: User = {} as User;

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action.bound
    });
  }

  setUser(user: User) {
    this.user = user;
  }
}

const authStore = new AuthStore();
export const AuthStoreContext = createContext(authStore);
export const useAuthStoreContext = () => useContext(AuthStoreContext);