import { AxiosResponse } from "axios";
import $api from "../@http";
import { User } from "../@types/user.interface";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<User[]>> {
    return $api.get<User[]>('/users');
  }
}