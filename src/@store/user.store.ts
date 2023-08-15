import { createContext, useContext } from "react";
import { User } from "../@types";
import { action, makeObservable, observable } from "mobx";

class UserS { 
  users: User[] = [];
  usersLoaded: boolean = false;

  constructor() {
    makeObservable(this, {
      users: observable,
      usersLoaded: observable,
      setUsers: action.bound,
      setUsersLoaded: action.bound
    });
  }

  setUsers(users: User[]) {
    this.users = users;
  }

  setUsersLoaded(b: boolean) {
    this.usersLoaded = b;
  }

}

const userStore = new UserS();
export const UserStore = createContext(userStore);
export const useUserStore = () => useContext(UserStore);