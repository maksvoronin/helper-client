import { User } from ".";

export default interface Series {
  _id: string;
  name: string;
  by: User;
  link: string;
  visible: boolean;
  created: number;
  events: {};
}
