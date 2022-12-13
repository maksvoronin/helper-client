import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import AuthService from '../@services/auth.service';
import config from '../config';
import User from '../@types/user.interface';
import $api from '../@http';

export default class Store {
  user = {} as User;
  background: string = '';
  stat = {} as { comments: number; decisions: number };

  systems = {} as any;
  series = {} as any;

  isAuth: boolean = false;
  static login: any;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: any) {
    this.user = user;
    if (this.isAuth && this.user) {
      $api.get(`${config.API}/stat/user?id=${this.user.id}&params=count`).then(({ data }) => (this.stat = { comments: data.data.countComments, decisions: data.data.countDecisions }));
      $api.get(`${config.API}/background/get?id=${this.user.background}`).then(({ data }) => {
        this.background = data.data.content || 'default_bg.png';
      });
    }
  }

  setSystems(systems: any) {
    this.systems = systems;
  }

  setBackground(background: string) {
    this.background = background;
  }

  setSeries(series: any) {
    this.series = series;
  }

  async login(data: any) {
    try {
      localStorage.setItem('token', data.accessToken);
      this.setAuth(true);
      this.setUser(data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as User);
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get(`${config.API}/auth/refresh`, { withCredentials: true });
      this.setAuth(true);
      localStorage.token = response.data.data.accessToken;
      this.setUser(response.data.data.user);
      console.log(response.data);
      if (response.data.type === 'error') {
        this.setAuth(false);
        localStorage.removeItem('token');
        this.setUser({} as User);
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async dislikeDecision(id: string) {
    try {
      await $api.post(`${config.API}/decision/unlike`, { id });
      this.user.likedDecisions.splice(this.user.likedDecisions.indexOf(id));
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async likeDecision(id: string) {
    try {
      await $api.post(`${config.API}/decision/like`, { id });
      this.user.likedDecisions.push(id);
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async subscribeSystem(id: string) {
    try {
      $api.post(`${config.API}/system/subscribe`, { id });
      this.user.subscribedSystems.push(id);
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async unsubscribeSystem(id: string) {
    try {
      $api.post(`${config.API}/system/unsubscribe`, { id });
      this.user.subscribedSystems.splice(this.user.subscribedSystems.indexOf(id));
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async subscribeComment(id: string) {
    try {
      $api.post(`${config.API}/comment/subscribe`, { id });
      this.user.subscribedComments.push(id);
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async unsubscribeComment(id: string) {
    try {
      $api.post(`${config.API}/comment/unsubscribe`, { id });
      this.user.subscribedComments.splice(this.user.subscribedComments.indexOf(id));
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async changeName(name: string) {
    $api.post(`${config.API}/user/settings/name`, { name });
    this.user.name = name;
  }

  async changeSurname(surname: string) {
    $api.post(`${config.API}/user/settings/surname`, { surname });
    this.user.surname = surname;
  }

  async changePhone(phone: string) {
    $api.post(`${config.API}/user/settings/phone`, { phone });
    this.user.phone = phone;
  }

  async changeBG(bg: string) {
    $api.post(`${config.API}/user/settings/background`, { background: bg });
    this.user.background = bg;
  }

  async changeAvatar(avatar: string) {
    $api.post(`${config.API}/user/settings/avatar`, { avatar });
    this.user.avatar = avatar;
  }

  async updateColdData() {
    $api.get(`${config.API}/system/all`).then(({ data }) => (this.systems = data.data));
    $api.get(`${config.API}/series/all`).then(({ data }) => (this.series = data.data));
  }
}
