import User from "./user.interface";

export default interface Blog {
  _id: string;
  title: string;
  description: string;
  link: string;
  owner: User;
  text: string;
  cover: string;
  created: number;
}
