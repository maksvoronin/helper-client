export default interface User {
  _id: string;
  id: string;
  name: string;
  surname: string;
  email: string;
  permissions: number;
  isActivated: boolean;
  avatar: string;
  likedDecisions: any[];
  subscribedSystems: any;
  subscribedComments: any;
  phone: string;
  background: string;
  created: number;
}