export default interface PostScript {
  _id: string;
  name: string;
  link: string;
  visible: boolean;
  created: number;
  events: object[]
}