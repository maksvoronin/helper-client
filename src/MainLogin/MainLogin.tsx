import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "..";
import Logo from "../@assets/logo";
import DefaultLayout from "../@layouts/default.layout";
import AuthService from "../@services/auth.service";
import { DefaultPage } from "../@types/pageDefault.interface";
import s from './mainlogin.module.scss';
import { observer } from "mobx-react";

const MainLogin = observer(({ title }: DefaultPage) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailError, setEmailError] = useState({ status: false, message: "" });
  const [passwordError, setPasswordError] = useState({ status: false, message: "" });

  const navigate = useNavigate();
  const {store} = useContext(Context);

  useEffect(() => {
    setEmailError({ status: false, message: "" });
  }, [email]);

  useEffect(() => {
    setPasswordError({ status: false, message: "" });
  }, [password]);

  useEffect(() => {
    if(store.isAuth) {
      navigate('/');
    }
  }, [navigate, store.isAuth]);

  const sendData = () => {
    if (!email || email === "") {
      if (!password || password === "") {
        setPasswordError({ status: true, message: "Укажите пароль" });
      }
      return setEmailError({ status: true, message: "Укажите почту" });
    }
    if (!password || password === "") {
      return setPasswordError({ status: true, message: "Укажите пароль" });
    }
    AuthService.login(email, password).then(({ data }) => {
      if (data.type === "error") {
        if (data.data.includes('email')) {
          return setEmailError({ status: true, message: data.data });
        }
        if (data.data.includes('парол')) {
          return setPasswordError({ status: true, message: data.data });
        }
      } else {
        store.login(data.data);
        console.log(data.data);
        navigate('/');
      }
    });
  }

  return (
    <DefaultLayout title={title}>
      <div className={s.mainLogin}>
        <div className={s.loginForm}>
          <Logo />
          <h1>Вход</h1>
          <input type="text" placeholder="Ваша почта" className={`${emailError.status && s.error}`} value={email} onChange={({ target }) => setEmail(target.value)} />
          {
            emailError.status && <p className={s.error}>{emailError.message}</p>
          }
          <input type="password" placeholder="Ваш пароль" className={`${passwordError.status && s.error}`} value={password} onChange={({ target }) => setPassword(target.value)} />
          {
            passwordError.status && <p className={s.error}>{passwordError.message}</p>
          }
          <button onClick={sendData}>Войти</button>
          <Link to={"/register"}>Зарегистрироваться</Link>
          <Link to={"/recovery"}>Восстановить пароль</Link>
        </div>
      </div>
    </DefaultLayout>
  );
});

export default MainLogin;