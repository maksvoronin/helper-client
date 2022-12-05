import { useEffect, useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "..";
import Logo from "../@assets/logo";
import DefaultLayout from "../@layouts/default.layout";
import { DefaultPage } from "../@types/pageDefault.interface";
import s from './mainrecovery.module.scss';

const MainRecovery = ({title}: DefaultPage) => {

  const {store} = useContext(Context);

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<{status: boolean, message: string}>({status: false, message: ""});

  const sendData = () => {
    if(!email || email === "") {
      return setEmailError({status: true, message: "Укажите почту"});
    }
  }

  useEffect(() => {
    setEmailError({status: false, message: ""});
  }, [email]);

  if(store.isAuth) {
    return(
      <Navigate to="/" />
    )
  }

  return(
    <DefaultLayout title={title}>
      <div className={s.mainRecovery}>
        <div className={s.recoveryForm}>
          <Logo />
          <h1>Восстановление аккаунта</h1>
          <input type="email" placeholder="Ваша почта" className={`${emailError.status && s.error}`} value={email} onChange={({ target }) => setEmail(target.value)} />
          {
            emailError.status && <p className={s.error}>{emailError.message}</p>
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