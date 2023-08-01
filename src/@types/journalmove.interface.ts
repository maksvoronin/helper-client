export default interface JournalMove {
  _id: string;
  name: string;
  link: string;
  visible: boolean;
  created: number;
  events: object[];
}
