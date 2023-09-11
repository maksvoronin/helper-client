import { observer } from "mobx-react";
import { FC, PropsWithChildren, useEffect } from "react";
import { PageProps, Response, User } from "../@types";
import styled from "styled-components";
import { useAuthStoreContext } from "../@store";
import $api from "../@http";
import { useNavigate } from "react-router-dom";
import { AlertPanel, BlogHeader, Popup } from "../@widgets";
import config, { dev_mode } from "../config";

const Layout = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 0;
  margin-bottom: 30px;
  @media (max-width: 812px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const DevMark = styled.p`
  position: fixed;
  right: 0px;
  top: 0px;
  margin: 0;
  padding: 0;
  opacity: 0.4;
`;

const BlogLayout: FC<PropsWithChildren<PageProps>> = observer(({ children, title }) => {
  const { user, isAuth, setAuth, setUser } = useAuthStoreContext();
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

  return (
    <>
      <title>{title}</title>
      {dev_mode && <DevMark>{config.dev_title}</DevMark>}
      <Layout>
        <BlogHeader />
        {children}
      </Layout>
      <AlertPanel />
      <Popup />
    </>
  );
});

export default BlogLayout;
