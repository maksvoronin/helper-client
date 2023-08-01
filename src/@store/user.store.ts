import { createContext, useContext } from "react";
import { User } from "../@types";
import { action, makeObservable, observable } from "mobx";

class UserS { 
  users: User[] = [];

  constructor() {
    makeObservable(this, {
      users: observable,
      setUsers: action.bound
    });
  }

  setUsers(users: User[]) {
    this.users = users;
  }
}

const userStore = new UserS();
export const UserStore = createContext(userStore);
export const useUserStore = () => useContext(UserStore);