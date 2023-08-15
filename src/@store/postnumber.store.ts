import { createContext, useContext } from "react";
import { PostNumber } from "../@types";
import { action, makeObservable, observable } from "mobx";

class PostnumberS { 
  postnumber: PostNumber[] = [];
  postnumberLoaded: boolean = false;

  constructor() {
    makeObservable(this, {
      postnumber: observable,
      postnumberLoaded: observable,
      setPostNumber: action.bound,
      setPostNumberLoaded: action.bound
    });
  }

  setPostNumber(postnumber: PostNumber[]) {
    this.postnumber = postnumber;
  }

  setPostNumberLoaded(b: boolean) {
    this.postnumberLoaded = b;
  }

}

const postNumberStore = new PostnumberS();
export const PostNumberStore = createContext(postNumberStore);
export const usePostNumberStore = () => useContext(PostNumberStore);