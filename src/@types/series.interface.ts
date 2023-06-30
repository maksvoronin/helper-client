import { User } from ".";

export default interface Series {
  name: { type: String; required: true };
  by: User;
  link: string;
  visible: boolean;
  created: number;
  events: {};
}
