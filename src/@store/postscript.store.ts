import { createContext, useContext } from "react";
import { PostScript } from "../@types";
import { action, makeObservable, observable } from "mobx";

class PostScriptStore { 
  postscripts: PostScript[] = [];

  constructor() {
    makeObservable(this, {
      postscripts: observable,
      setPostScripts: action.bound
    });
  }

  setPostScripts(postscripts: PostScript[]) {
    this.postscripts = postscripts;
  }
}

const postscriptStore = new PostScriptStore();
export const PostScriptStoreContext = createContext(postscriptStore);
export const usePostScriptStoreContext = () => useContext(PostScriptStoreContext);