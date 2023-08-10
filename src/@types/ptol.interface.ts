import Road from "./road.interface";

export default interface Ptol {
  _id: string;
  name: string;
  link: string;
  visible: boolean;
  road: Road;
  created: number;
  events: object[]
}