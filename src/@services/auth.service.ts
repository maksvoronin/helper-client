import $api from "../@http";
import axios from 'axios';
import config from "../config";

export default class AuthService {
  static async login(email: string, password: string) {
    return $api.post('/auth/login', { email, password });
  }

  static async registration(name: string, surname: string, phone: string, email: string, password: string, road: string, work: string) {
    return $api.post('/auth/registration', { name, surname, phone, email, password, road, work });
  }

  static async logout() {
    $api.post('/auth/logout');
  }

  static async isAuth(): Promise<boolean> {
    const response = await axios.get(`${config.API}/auth/refresh`, { withCredentials: true });
    if (response.data.type === "error") {
      return false;
    }
    localStorage.setItem('token', response.data.data.accessToken);
    return true;
  }
}