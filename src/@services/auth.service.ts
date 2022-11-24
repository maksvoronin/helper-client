import $api from "../@http";
import axios from 'axios';
import config from "../config";

export default class AuthService {
  static async login(email: string, password: string) {
    return $api.post('/auth/login', { email, password });
  }

  static async registration(email: string, password: string) {
    return $api.post('/auth/registration', { email, password });
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