export default interface User {
  name: string;
  surname: string;
  email: string;
  permissions: number;
  id: string;
  isActivated: boolean;
  avatar: string;
  likedDecisions: any[];
  subscribedSystems: any;
  subscribedComments: any;
  phone: string;
  background: string;
  created: number;
}