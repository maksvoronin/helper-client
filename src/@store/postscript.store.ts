import { createContext, useContext } from "react";
import { PostScript } from "../@types";
import { action, makeObservable, observable } from "mobx";

class PostScriptStore {
  postscripts: PostScript[] = [];
  postscriptsLoaded: boolean = false;

  constructor() {
    makeObservable(this, {
      postscripts: observable,
      setPostScripts: action.bound,
      postscriptsLoaded: observable,
      setPostScriptsLoaded: action.bound,
    });
  }

  setPostScripts(postscripts: PostScript[]) {
    this.postscripts = postscripts;
  }

  setPostScriptsLoaded(b: boolean) {
    this.postscriptsLoaded = b;
  }
}

const postscriptStore = new PostScriptStore();
export const PostScriptStoreContext = createContext(postscriptStore);
export const usePostScriptStoreContext = () => useContext(PostScriptStoreContext);
