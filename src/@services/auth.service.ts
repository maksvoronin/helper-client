import $api from "../@http";
import axios, {AxiosResponse} from 'axios';
import { AuthResponse } from "../@types/authresponse.interface";
import config from "../config";

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', {email, password});
  }

  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration', {email, password});
  }

  static async logout(): Promise<void> {
    $api.post<AuthResponse>('/logout');
  }

  static async isAuth(): Promise<boolean> {
    try {
      const response = await axios.get(`${config.API}/auth/refresh`, {withCredentials: true});
      if(response.data.type === "error") {
        return false;
      } else {
        return true;
      }
    } catch(e: any) {
      console.log(e.message);
    }
    
    return false;
  }
}