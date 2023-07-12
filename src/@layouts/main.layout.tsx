import "../style.css";
import config, { dev_mode } from "../config";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Background, PageProps, Response, User } from "../@types";
import $api from "../@http";
import styled from "styled-components";
import { AlertPanel, Sidebar } from "../@widgets";
import { useAuthStoreContext } from "../@store";

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

const MainLayout: FC<PropsWithChildren<PageProps>> = observer(({ title, children }) => {
  const { user, setUser } = useAuthStoreContext();
  const [backgroundImage, setBackgroundImage] = useState<Background>();

  useEffect(() => {
    if (!localStorage.token) return console.log("Token not found");
    $api.get<Response<{ accessToken: string; refreshToken: string; user: User }>>(`${config.API}/auth/refresh`, { withCredentials: true }).then(({ data }) => {
      if (data.type === "error") return console.log(data);
      setUser(data.data!.user);
      localStorage.token = data.data!.accessToken;
    });
  }, [user.name, setUser]);

  useEffect(() => {
    setBackgroundImage(user.background);
  }, [user, user.background]);

  return (
    <>
      <title>{title}</title>
      <MainGrid
        style={{
          background: `${backgroundImage ? `url(${config.API}/public/${backgroundImage.content})` : `url(${config.API}/public/default_bg.png)`}`,
        }}
      >
        <Sidebar />
        <MainContent>{children}</MainContent>
        {dev_mode && <DevMark>{config.dev_title}</DevMark>}
      </MainGrid>
      <AlertPanel />
    </>
  );
});

export default MainLayout;
