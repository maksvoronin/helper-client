import { createContext, useContext } from "react";
import { Road } from "../@types";
import { action, makeObservable, observable } from "mobx";

class RoadStore { 
  roads: Road[] = [];
  roadsLoaded: boolean = false;

  constructor() {
    makeObservable(this, {
      roads: observable,
      roadsLoaded: observable,
      setRoads: action.bound,
      setRoadsLoaded: action.bound
    });
  }

  setRoads(roads: Road[]) {
    this.roads = roads;
  }

  setRoadsLoaded(b: boolean) {
    this.roadsLoaded = b;
  }
}

const roadStore = new RoadStore();
export const RoadStoreContext = createContext(roadStore);
export const useRoadStoreContext = () => useContext(RoadStoreContext);