import User from "./user.interface";

export default interface Application {
  name: string;
  description: string;
  owner: User;
  token: string;
  status: boolean;
}