import { createContext, useContext } from "react";
import { action, makeObservable, observable } from "mobx";

class PopupStore {
  visible: boolean = false;
  title: string = "";
  content: any;

  constructor() {
    makeObservable(this, {
      visible: observable,
      content: observable,
      title: observable,
      setTitle: action.bound,
      setVisible: action.bound,
      setContent: action.bound,
    });
  }

  setTitle(t: string) {
    this.title = t;
  }

  setVisible(v: boolean) {
    this.visible = v;
  }

  setContent(content: any) {
    this.content = content;
  }
}

const popupStore = new PopupStore();
export const PopupStoreContext = createContext(popupStore);
export const usePopupStoreContext = () => useContext(PopupStoreContext);
