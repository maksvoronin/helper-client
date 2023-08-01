export default interface Section {
  _id: string;
  name: string;
  link: string;
  visible: boolean;
  created: number;
  events: object[]
}