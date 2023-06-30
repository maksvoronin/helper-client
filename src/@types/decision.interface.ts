import {Comment, Commentary, Event, User } from ".";

export default interface Decision {
  _id: string;
  content: string,
  by: User,
  link: string,
  visible: boolean,
  created: number,
  comment: Comment,
  file?: string,
  events: Event[],
  comments: Commentary[]
};