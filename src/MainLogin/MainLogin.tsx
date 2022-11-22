import { Link } from "react-router-dom";
import Logo from "../@assets/logo";
import DefaultLayout from "../@layouts/default.layout";
import { DefaultPage } from "../@types/pageDefault.interface";
import s from './mainlogin.module.scss';

const MainLogin = ({ title }: DefaultPage) => {
  return (
    <DefaultLayout title={title}>
      <div className={s.mainLogin}>
        <div className={s.loginForm}>
          <Logo />
          <h1>Вход</h1>
          <input placeholder="Ваша почта" />
          <input placeholder="Ваш пароль" />
          <button>Войти</button>
          <Link to={"/register"}>Зарегистрироваться</Link>
          <Link to={"/recovery"}>Восстановить пароль</Link>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default MainLogin;