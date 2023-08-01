export default interface Blok {
  _id: string;
  name: string;
  link: string;
  visible: boolean;
  created: number;
  events: object[];
}
