import { createContext, useContext } from "react";
import { action, makeObservable, observable } from "mobx";

class SearchStore { 
  searchText: string = "";
  visibleResults: boolean = false;

  constructor() {
    makeObservable(this, {
      searchText: observable,
      visibleResults: observable,
      setVisibleResults: action.bound,
      setSearchText: action.bound
    });
  }

  setVisibleResults(visible: boolean) {
    this.visibleResults = visible;
  }

  setSearchText(text: string) {
    this.searchText = text;
  }
}

const searchStore = new SearchStore();
export const SearchStoreContext = createContext(searchStore);
export const useSearchStoreContext = () => useContext(SearchStoreContext);