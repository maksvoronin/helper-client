import { createContext, useContext } from "react";
import { Blok, PostNumber } from "../@types";
import { action, makeObservable, observable } from "mobx";

class PostnumberS { 
  postnumber: PostNumber[] = [];

  constructor() {
    makeObservable(this, {
      postnumber: observable,
      setPostNumber: action.bound
    });
  }

  setPostNumber(postnumber: PostNumber[]) {
    this.postnumber = postnumber;
  }
}

const postNumberStore = new PostnumberS();
export const PostNumberStore = createContext(postNumberStore);
export const usePostNumberStore = () => useContext(PostNumberStore);