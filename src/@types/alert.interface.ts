import { MouseEventHandler } from "react";

export interface IAlert {
  id?: number,
  type: "default" | "error",
  title: string,
  message: string,
  time?: number | 15,
  onClick?: MouseEventHandler<HTMLDivElement>
};