import Sidebar from "../@components/Sidebar/Sidebar";
import { DefaultPage } from "../@types/pageDefault.interface";
import config from "../config";
import { useState, useEffect } from 'react';
import $api from "../@http";
import AuthService from "../@services/auth.service";

const MainLayout = ({ title, children }: DefaultPage) => {


  const [user, setUser] = useState<any>();
  const [background, setBackground] = useState<any>();
  const [isAuth, setAuth] = useState<boolean>();
  useEffect(() => {
    if (localStorage.token) {
      AuthService.isAuth().then((r: boolean) => {
        setAuth(r);
      });
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) {
      $api.get(`${config.API}/user/me`).then(({ data }) => {
        setUser(data.data);
      });
    }
  }, [isAuth]);

  useEffect(() => {
    if (user) {
      $api.get(`${config.API}/background/get?id=${user.background}`).then(({ data }) => {
        setBackground(data.data);
      });
    }
  }, [user]);

  return (
    <>
      <title>{title}</title>
        <div className={"maincontainer"} style={{
          background:
            `${background ? (background.type === 'color' ? background.content : `url(${config.API}/public/${background.content})`)
              : `url(${config.API}/public/default_bg.png)`}`
        }}>
          <Sidebar />
          <div className="maincontent">
            {children}
          </div>
        </div>
      </>
      );
}

      export default MainLayout;