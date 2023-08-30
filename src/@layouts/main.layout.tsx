import "../style.css";
import defaultBG from "../@assets/default.jpg";
import config, { dev_mode } from "../config";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Background, PageProps, Response, User } from "../@types";
import $api from "../@http";
import styled from "styled-components";
import { AlertPanel, Popup, Sidebar } from "../@widgets";
import { useAuthStoreContext, useThemeStore } from "../@store";
import { useNavigate } from "react-router-dom";
import { Loader } from "../@components";

const MainGrid = styled.div`
  display: flex;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-attachment: fixed !important;
  position: relative;
  background-position: center !important;
  min-height: 100vh;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  width: 100%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  @media (max-width: 1000px) {
    margin: 10px;
    width: calc(100% - 20px);
    margin-top: 80px;
  }
`;

const DevMark = styled.span`
  position: fixed;
  right: 5px;
  top: 5px;
  opacity: 0.4;
  font-weight: 500;
`;

const Ads = styled.div`
  max-width: 280px;
  background: var(--containerBackground);
  border-radius: 12px;
  margin: 20px;
  margin-left: 0;
  backdrop-filter: blur(20px);

  @media (max-width: 1000px) {
    margin: 10px;
    max-width: calc(100% - 20px);
  }
`;

const MainLayout: FC<PropsWithChildren<PageProps>> = observer(({ title, children }) => {
  const { user, isAuth, setAuth, setUser } = useAuthStoreContext();
  const { theme } = useThemeStore();
  const [backgroundImage, setBackgroundImage] = useState<Background>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.token) return;
    if (!isAuth) {
      $api.get<Response<{ accessToken: string; refreshToken: string; user: User }>>(`/auth/refresh`, { withCredentials: true }).then(({ data }) => {
        if (data.type === "error") return console.log(data);
        setUser(data.data!.user);
        setAuth(true);
        localStorage.token = data.data!.accessToken;
      });
    }
    if (!user.isActivated && isAuth) {
      navigate("/activate");
    }
  }, [user.name, setUser, isAuth, setAuth, navigate, user.isActivated]);

  useEffect(() => {
    setBackgroundImage(user.background);
  }, [user, user.background]);

  useEffect(() => {
    if (!dev_mode) {
      const yaDiv = document.createElement("div");
      yaDiv.setAttribute("id", "yandex_rtb_R-A-2536124-1");
      const yaScript = document.createElement("script");
      yaScript.setAttribute("type", "text/javascript");
      yaScript.innerHTML = `window.yaContextCb.push(()=>{
        Ya.Context.AdvManager.render({
          "blockId": "R-A-2536124-1",
          "renderTo": "yandex_rtb_R-A-2536124-1"
        })
      })`;
      document.getElementById("ads")?.append(yaDiv);
      document.head.appendChild(yaScript);
      const mobileScript = document.createElement("script");
      mobileScript.setAttribute("type", "text/javascript");
      mobileScript.innerHTML = `window.yaContextCb.push(()=>{
        Ya.Context.AdvManager.render({
          "blockId": "R-A-2536124-2",
          "type": "floorAd"
        })
      })`;
      document.body.appendChild(mobileScript);
    }
  }, []);

  return (
    <>
      <title>{title}</title>
      <MainGrid
        style={{
          background: `${backgroundImage ? `url(${config.API}/public/${backgroundImage.content})` : `url(${defaultBG})`}`,
        }}
        className={`theme__${theme}`}
      >
        <Loader />
        <Sidebar />
        <MainContent>{children}</MainContent>
        {
          !dev_mode && <Ads id="ads"></Ads>
        }
        {dev_mode && <DevMark>{config.dev_title}</DevMark>}
      </MainGrid>
      <Popup />
      <AlertPanel />
    </>
  );
});

export default MainLayout;
