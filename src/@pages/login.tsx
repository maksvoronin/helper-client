import { observer } from "mobx-react";
import { FormStatus, PageProps, Response, User } from "../@types";
import { FC, useEffect, useState } from "react";
import { DefaultLayout } from "../@layouts";
import { styled } from "styled-components";
import { Button, Input, Link } from "../@shared";
import { Logo } from "../@assets";
import { ResultField } from "../@components";
import $api from "../@http";
import { useAuthStoreContext } from "../@store";
import { useNavigate } from "react-router-dom";

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

const LoginForm = styled.div`
  max-width: 320px;
  width: 100%;
  background-color: white;
  border-radius: 12px;
  box-shadow: var(--blockBoxShadow);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  gap: 20px;
  @media (max-width: 500px) {
    max-width: none;
    max-height: none;
    width: 100%;
    height: calc(100% - 90px);
    padding-top: 60px;
    justify-content: start;
  }
`;

const LoginTitle = styled.h1`
  font-size: 28px;
  color: #333;
  margin: 0;
`;

const Login: FC<PageProps> = observer(({ title }) => {
  const { user, setUser } = useAuthStoreContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [formError, setFormError] = useState<FormStatus>({ status: false, message: "" });

  useEffect(() => {
    if(user._id) {
      return navigate("/");
    }
  }, [user, navigate]);

  const sendData = () => {
    if (!email || email === "") {
      return setFormError({ status: false, message: "Укажите почту" });
    }
    if (!password || password === "") {
      return setFormError({ status: false, message: "Укажите пароль" });
    }
    $api.post<Response<{ accessToken: string; refreshToken: string; user: User }>>(`/auth/login`, { email, password }).then(({ data }) => {
      if (data.type === "error") {
        return setFormError({ status: false, message: "Произошла ошибка: " + data.data });
      }
      setUser(data.data!.user);
      localStorage.token = data.data?.accessToken;
      setFormError({ status: true, message: "Успешно" });
      navigate("/");
    });
  };

  return (
    <DefaultLayout title={title}>
      <LoginWrapper>
        <LoginForm>
          <Logo />
          <LoginTitle>Вход</LoginTitle>
          <Input placeholder="Ваша почта" onChange={({ target }: any) => setEmail(target.value)} value={email} />
          <Input type={"password"} placeholder="Ваш пароль" onChange={({ target }: any) => setPassword(target.value)} value={password} />
          <Button onClick={sendData}>Войти</Button>
          <ResultField status={formError.status} message={formError.message} />
          <Link to={"/recovery"}>Восстановить пароль</Link>
          <Link to={"/register"}>Зарегистрироваться</Link>
        </LoginForm>
      </LoginWrapper>
    </DefaultLayout>
  );
});

export default Login;
