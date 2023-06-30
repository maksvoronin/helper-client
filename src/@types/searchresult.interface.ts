import Comment from "./comment.interface";
import Decision from "./decision.interface";
import User from "./user.interface";

export default interface SearchResult {
  users: User[];
  comments: Comment[];
  decisions: Decision[];
}
