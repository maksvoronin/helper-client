import { FC, PropsWithChildren, useEffect } from "react";
import { PageProps, Response, User } from "../@types";
import { observer } from "mobx-react";
import { styled } from "styled-components";
import { AlertPanel, DevelopersHeader, DevelopersSidebar, Popup } from "../@widgets";
import { useNavigate } from "react-router-dom";
import { useAuthStoreContext, useThemeStore } from "../@store";
import $api from "../@http";
import config, { dev_mode } from "../config";

const Layout = styled.div`
  max-width: var(--developersWrapperWidth);
  margin: 0 auto;
  display: flex;
  margin-top: 10px;
  gap: 20px;
  padding-left: 15px;
  padding-right: 15px;
`;

const DevVersion = styled.code`
  position: absolute;
  right: 0;
  bottom: 0;
  font-family: "Courier New", Courier, monospace;
  color: var(--developersPrimaryText);
`;

const MainGrid = styled.div`
  width: 100%;
  min-height: 100vh;
  background: var(--developersContainerBackground);
`;

const DevelopersLayout: FC<PropsWithChildren<PageProps>> = observer(({ title, children }) => {
  const { user, isAuth, setAuth, setUser } = useAuthStoreContext();
  const { theme } = useThemeStore();
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
      navigate("/auth/activate");
    }
  }, [user.name, setUser, isAuth, setAuth, navigate, user.isActivated]);
  return (
    <>
      <title>{title}</title>
      <MainGrid className={`theme__${theme}`}>
        <AlertPanel />
        <DevelopersHeader />
        <Popup />
        <Layout>
          <DevelopersSidebar />
          <div style={{ width: "100%" }}>{children}</div>
        </Layout>
        {dev_mode && <DevVersion>{config.dev_title}</DevVersion>}
      </MainGrid>
    </>
  );
});

export default DevelopersLayout;
