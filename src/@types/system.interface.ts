import User from "./user.interface";

export default interface System {
  name: string,
  by: User,
  link: string,
  visible: boolean,
  created: number,
  events: {}
}