import Event from "./event.interface";
import User from "./user.interface";

export default interface Background {
  title: string;
  type: "image" | "color";
  content: string;
  author: User;
  events: Event;
}