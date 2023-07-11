import Background from "./background.interface";
import Comment from "./comment.interface";
import Decision from "./decision.interface";
import System from "./system.interface";

export default interface User {
  _id: string;
  id: string;
  name: string;
  surname: string;
  email: string;
  permissions: number;
  isActivated: boolean;
  avatar: string;
  likedDecisions: Decision[];
  subscribedSystems: System[];
  subscribedComments: Comment[];
  phone: string;
  background: Background;
  created: number;
}