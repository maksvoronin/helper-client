import Decision from "./decision.interface";
import User from "./user.interface";

export default interface Commentary {
  text: String,
  user: User,
  comment: Decision,
}