import Blok from "./blok.interface";
import JournalMove from "./journalmove.interface";
import LokomotiveNumber from "./lokomotivenumber.interface";
import PostNumber from "./postnumber.interface";
import PostScript from "./postscript.interface";
import Ptol from "./ptol.interface";
import Road from "./road.interface";
import Section from "./section.interface";
import Series from "./series.interface";
import System from "./system.interface";
import User from "./user.interface";

export default interface CommentsJournal {
  _id: string;
  start: string,
  finish: String,
  road: Road,
  ptol: Ptol,
  postscript: PostScript,
  series: Series,
  lokomotivenumber: LokomotiveNumber,
  section: Section,
  replacement: string,
  journalmove: JournalMove,
  system: System,
  blok: Blok,
  numbermark: string,
  numberwithdraw: string,
  time: string,
  postnumber: PostNumber,
  noteptol: string,
  user: User,
}