import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../@assets/logo";
import DefaultLayout from "../@layouts/default.layout";
import { DefaultPage } from "../@types/pageDefault.interface";
import s from './mainrecovery.module.scss';

const MainRecovery = ({title}: DefaultPage) => {

  const [email, setEmail] = useState<string>("");
  const [phoneError, setPhoneError] = useState<{status: boolean, message: string}>({status: false, message: ""});

  const sendData = () => {
    if(!email || email === "") {
      return setPhoneError({status: true, message: "Укажите почту"});
    }
  }

  return(
    <DefaultLayout title={title}>
      <div className={s.mainRecovery}>
        <div className={s.recoveryForm}>
          <Logo />
          <h1>Восстановление аккаунта</h1>
          <input type="email" placeholder="Ваша почта" className={`${phoneError.status && s.error}`} value={email} onChange={({ target }) => setEmail(target.value)} />
          {
            phoneError.status && <p className={s.error}>{phoneError.message}</p>
          }      
          <button onClick={sendData}>Восстановить</button>
          <Link to={"/register"}>Регистрация</Link>
          <Link to={"/login"}>Войти</Link>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default MainRecovery;