export default interface PostNumber {
  _id: string;
  name: string;
  link: string;
  visible: boolean;
  created: number;
  events: object[]
}