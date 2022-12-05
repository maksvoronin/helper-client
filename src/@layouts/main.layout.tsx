import Sidebar from "../@components/Sidebar/Sidebar";
import { DefaultPage } from "../@types/pageDefault.interface";
import config from "../config";
import { useContext, useState, useEffect } from 'react';
import $api from "../@http";
import { Context } from "..";
import AlertPanel from "../@components/AlertPanel/AlertPanel";

const MainLayout = ({ title, children }: DefaultPage) => {

  const { store } = useContext(Context);
  const [background, setBackground] = useState<any>();

  const checkBG = store.user ? store.user.background : "";

  useEffect(() => {
    if (store.user) {
      $api.get(`${config.API}/background/get?id=${store.user.background}`).then(({ data }) => {
        setBackground(data.data);
      });
    }
  }, [store.user, checkBG]);

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
      <AlertPanel />
    </>
  );
}

export default MainLayout;