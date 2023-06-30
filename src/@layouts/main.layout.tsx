import config from "../config";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { PageProps, Response, User } from "../@types";
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
`;

const MainContent = styled.div`
  width: 100%;
  margin: 20px;
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainLayout: FC<PropsWithChildren<PageProps>> = observer(({ title, children }) => {
  const { user, setUser } = useAuthStoreContext();
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  useEffect(() => {
    if (!localStorage.token) return;
    $api.get<Response<{accessToken: string, refreshToken: string, user: User}>>(`${config.API}/auth/refresh`, { withCredentials: true }).then(({ data }) => {
      if (data.type === "error") return;
      setUser(data.data!.user);
      localStorage.token = data.data!.accessToken;

    });
  }, [setUser]);

  useEffect(() => {
    setBackgroundImage(user.background);
  }, [user, user.background]);

  return (
    <>
      <title>{title}</title>
      <MainGrid
        style={{
          background: `${backgroundImage ? `url(${config.API}/public/${backgroundImage})` : `url(${config.API}/public/default_bg.png)`}`,
        }}
      >
        <Sidebar />
        <MainContent>{children}</MainContent>
      </MainGrid>
      <AlertPanel />
    </>
  );
});

export default MainLayout;
