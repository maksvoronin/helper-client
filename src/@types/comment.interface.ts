import { User, System, Series } from ".";
import Decision from "./decision.interface";

export default interface Comment {
  _id: string;
  content: string;
  by: User;
  link: string;
  visible: boolean;
  created: number;
  system: System;
  series: Series;
  decisions: Decision[];
  file?: string;
  events: Event[];
}
