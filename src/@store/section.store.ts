import { createContext, useContext } from "react";
import { Section } from "../@types";
import { action, makeObservable, observable } from "mobx";

class SectionStore { 
  sections: Section[] = [];

  constructor() {
    makeObservable(this, {
      sections: observable,
      setSections: action.bound
    });
  }

  setSections(sections: Section[]) {
    this.sections = sections;
  }
}

const sectionStore = new SectionStore();
export const SectionStoreContext = createContext(sectionStore);
export const useSectionStoreContext = () => useContext(SectionStoreContext);