import { createContext, useContext } from "react";
import { Road } from "../@types";
import { action, makeObservable, observable } from "mobx";

class RoadStore { 
  roads: Road[] = [];

  constructor() {
    makeObservable(this, {
      roads: observable,
      setRoads: action.bound
    });
  }

  setRoads(roads: Road[]) {
    this.roads = roads;
  }
}

const roadStore = new RoadStore();
export const RoadStoreContext = createContext(roadStore);
export const useRoadStoreContext = () => useContext(RoadStoreContext);