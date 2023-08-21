import { observer } from "mobx-react";
import { Application, FormStatus, PageProps, Response, User } from "../@types";
import { FC, useEffect, useState } from "react";
import { DefaultLayout } from "../@layouts";
import { styled } from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import $api from "../@http";
import { alert } from "../@services";
import { Button, FormText, Input, Link } from "../@shared";
import { baseURIs } from "../config";
import { useAuthStoreContext } from "../@store";
import { Logo } from "../@assets";
import { ResultField } from "../@components";

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--pageBackground);
  @media ((max-width: 500px) or (max-height: 650px)) {
    align-items: flex-start;
  }
`;

const LoginContainer = styled.div`
  max-width: 720px;
  width: 100%;
  background-color: white;
  border-radius: 12px;
  box-shadow: var(--blockBoxShadow);
  display: flex;
  justify-content: center;
  padding: 30px;
  gap: 20px;
  @media (max-width: 500px) {
    max-width: none;
    max-height: none;
    width: 100%;
    height: calc(100% - 90px);
    padding-top: 60px;
    justify-content: start;
    flex-direction: column;
  }
`;

const AboutApplication = styled.div`
  width: 70%;
  height: 100%;
  border-right: 1px solid #e2e2e2;
  padding-right: 30px;
`;

const LoginForm = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  justify-content: flex-start;
`;

const ApplicationTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 18px;
`;

const AppText = styled.p`
  margin-top: 0px;
  font-size: 14px;
`;

const LoginTitle = styled.h1`
  font-size: 28px;
  color: #333;
  margin: 0;
`;

const LoginApplication: FC<PageProps> = observer(({ title }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [formError, setFormError] = useState<FormStatus>({ status: false, message: "" });
  const [searchParams] = useSearchParams();
  const [appId, setAppId] = useState<string>("");
  const [app, setApp] = useState<Application>();
  const navigate = useNavigate();

  const { user, setUser } = useAuthStoreContext();

  useEffect(() => {
    if (!appId) {
      setAppId(searchParams.get("app_id") || "");
    } else if (appId) {
      $api.get<Response<Application>>(`/application/get?id=${appId}`).then(({ data }) => {
        if (!data.data || data.type === "error" || !data.data.joinURI) {
          alert("error", "Ошибка", "Приложение не найдено");
          return setTimeout(() => navigate("/"), 1500);
        }
        setApp(data.data);
      });
    }
  }, [setAppId, appId, navigate, searchParams]);

  if (!app || !app.joinURI)
    return (
      <DefaultLayout title={title}>
        <LoginWrapper>
          <LoginContainer>Приложение не найдено</LoginContainer>
        </LoginWrapper>
      </DefaultLayout>
    );

  const joinProfile = () => {
    $api.post<Response<{ accessToken: string; refreshToken: string; user: User }>>(`/auth/login`, { email, password }).then(({ data }) => {
      if (data.type === "error" || !data.data) {
        return setFormError({ status: false, message: "Произошла ошибка: " + data.data });
      }
      setUser(data.data.user);
      localStorage.token = data.data.accessToken;
      setFormError({ status: true, message: "Успешно" });
      $api.post<Response<User>>("/auth/login/application", { appId: app._id, user_id: data.data.user._id }).then((e) => {
        if (e.data.type === "error" || !e.data.data) return alert("error", "Ошибка", data.message);
        setUser(e.data.data);
        navigate(`//${app.joinURI}?user_token=${e.data.data.api_tokens[e.data.data.api_tokens.length - 1].token}`);
      });
    });
  };

  const joinAuthed = () => {
    $api.post<Response<User>>("/auth/login/application", { appId: app._id, user_id: user._id }).then(({ data }) => {
      if (data.type === "error" || !data.data) return alert("error", "Ошибка", data.message);
      setUser(data.data);
      navigate(`//${app.joinURI}?user_token=${user.api_tokens[user.api_tokens.length - 1].token}`);
    });
  };

  return (
    <DefaultLayout title={title}>
      <LoginWrapper>
        <LoginContainer>
          <AboutApplication>
            <ApplicationTitle>Вход в «{app.name}»</ApplicationTitle>
            <FormText style={{ paddingBottom: 15, borderBottom: "1px solid #e2e2e2" }}>Это приложение получить доступ к Вашему аккаунту Helper и сможет управлять им</FormText>
            <FormText>Владелец</FormText>
            <AppText>
              <Link to={`${baseURIs.main}/profile/${app.owner._id}`}>
                {app.owner.name} {app.owner.surname}
              </Link>
            </AppText>
            <FormText>Описание</FormText>
            <AppText>{app.description}</AppText>
            <FormText>Использование</FormText>
            <AppText>{app.usage}</AppText>
          </AboutApplication>
          <LoginForm>
            <Logo size={42} />
            <LoginTitle>Вход</LoginTitle>
            {user && user._id ? (
              <>
                <AppText style={{ textAlign: "center", margin: 0, padding: 0 }}>Приложению «{app.name}» будет доступен полный доступ к Вашему аккаунту</AppText>
                <Button onClick={joinAuthed}>Продолжить как {user.name}</Button>
              </>
            ) : (
              <>
                <Input placeholder="Ваша почта" onChange={({ target }: any) => setEmail(target.value)} value={email} />
                <Input type={"password"} placeholder="Ваш пароль" onChange={({ target }: any) => setPassword(target.value)} value={password} />
                <Button onClick={joinProfile}>Войти</Button>
                <ResultField status={formError.status} message={formError.message} />
              </>
            )}
          </LoginForm>
        </LoginContainer>
      </LoginWrapper>
    </DefaultLayout>
  );
});

export default LoginApplication;
