import { createContext, useContext } from "react";
import { Section } from "../@types";
import { action, makeObservable, observable } from "mobx";

class SectionStore { 
  sections: Section[] = [];
  sectionLoaded: boolean = false;

  constructor() {
    makeObservable(this, {
      sections: observable,
      sectionLoaded: observable,
      setSections: action.bound,
      setSectionLoaded: action.bound
    });
  }

  setSectionLoaded(b: boolean) {
    this.sectionLoaded = b;
  }

  setSections(sections: Section[]) {
    this.sections = sections;
  }
}

const sectionStore = new SectionStore();
export const SectionStoreContext = createContext(sectionStore);
export const useSectionStoreContext = () => useContext(SectionStoreContext);