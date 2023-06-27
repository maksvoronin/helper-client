import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "..";
import Logo from "../@assets/logo";
import DefaultLayout from "../@layouts/default.layout";
import { alert } from "../@services/alerting.service";
import AuthService from "../@services/auth.service";
import { DefaultPage } from "../@types/pageprops.interface";
import s from './mainregister.module.scss';
import { observer } from "mobx-react";

const MainRegister = observer(({ title }: DefaultPage) => {

  const {store} = useContext(Context);

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [road, setRoad] = useState<string>("");
  const [work, setWork] = useState<string>("");
  
  const [nameError, setNameError] = useState<{ status: boolean, message: string }>({ status: false, message: "" });
  const [surnameError, setSurnameError] = useState<{ status: boolean, message: string }>({ status: false, message: "" });
  const [phoneError, setPhoneError] = useState<{ status: boolean, message: string }>({ status: false, message: "" });
  const [emailError, setEmailError] = useState<{ status: boolean, message: string }>({ status: false, message: "" });
  const [passwordError, setPasswordError] = useState<{ status: boolean, message: string }>({ status: false, message: "" });
  const [passwordRepeatError, setPasswordRepeatError] = useState<{ status: boolean, message: string }>({ status: false, message: "" });
  const [roadError, setRoadError] = useState<{ status: boolean, message: string }>({ status: false, message: "" });
  const [workError, setWorkError] = useState<{ status: boolean, message: string }>({ status: false, message: "" });
  const [errorExists, setErrorExists] = useState<boolean>(false);

  const sendData = () => {
    if(!name || name === "") {
      setNameError({status: true, message: "Укажите имя"});
      setErrorExists(true);
    }
    if(!surname || surname === "") {
      setSurnameError({status: true, message: "Укажите фамилию"});
      setErrorExists(true);
    } 
    if(!phone || phone === "") {
      setPhoneError({status: true, message: "Укажите телефон"});
      setErrorExists(true);
    }
    if(!email || email === "") {
      setEmailError({status: true, message: "Укажите почту"});
      setErrorExists(true);
    }
    if(!password || password === "") {
      setPasswordError({status: true, message: "Укажите пароль"});
      setErrorExists(true);
    }
    if(!passwordRepeat || passwordRepeat === "") {
      setPasswordRepeatError({status: true, message: "Укажите повтор пароля"});
      setErrorExists(true);
    }
    if(!road || road === "") {
      setRoadError({status: true, message: "Укажите дорогу"});
      setErrorExists(true);
    }
    if(!work || work === "") {
      setWorkError({status: true, message: "Укажите предприятие"});
      setErrorExists(true);
    }

    if(errorExists) return;
    setErrorExists(false);

    if(passwordRepeat !== password) {
      setPasswordError({status: true, message: "Пароли не совпадают"});
      return setPasswordRepeatError({status: true, message: ""});
    }

    AuthService.registration(name, surname, phone, email, password, road, work).then(({data}) => {
      console.log(data);

      if(data.type === "error") {
        return alert("error", "Ошибка", data.data, 15);
      } else if(data.type === "success") {
        store.login(data.data);
        return alert("default", "Успешно!", data.message, 15);
      }
    });

  }

  const navigate = useNavigate();
  useEffect(() => {
    if(store.isAuth) {
      navigate('/');
    }
  }, [navigate, store.isAuth]);

  useEffect(() => {
    setNameError({status: false, message: ""});
  }, [name]);

  useEffect(() => {
    setSurnameError({status: false, message: ""});
  }, [surname]);

  useEffect(() => {
    setPhoneError({status: false, message: ""});
  }, [phone]);

  useEffect(() => {
    setEmailError({status: false, message: ""});
  }, [email]);

  useEffect(() => {
    setPasswordError({status: false, message: ""});
  }, [password]);

  useEffect(() => {
    setPasswordRepeatError({status: false, message: ""});
  }, [passwordRepeat]);

  useEffect(() => {
    setRoadError({status: false, message: ""});
  }, [road]);

  useEffect(() => {
    setWorkError({status: false, message: ""});
  }, [work]);

  return (
    <DefaultLayout title={title}>
      <div className={s.mainRegister}>
        <div className={s.registerForm}>
          <Logo />
          <h1>Регистрация</h1>
          <div className={s.rowTwo}>
            <div>
              <input type="text" placeholder="Ваше имя" className={`${nameError.status && s.error}`} value={name} onChange={({ target }) => setName(target.value)} />
              {
                nameError.status && <p className={s.error}>{nameError.message}</p>
              }
            </div>
            <div>
              <input type="text" placeholder="Ваша фамилия" className={`${surnameError.status && s.error}`} value={surname} onChange={({ target }) => setSurname(target.value)} />
              {
                surnameError.status && <p className={s.error}>{surnameError.message}</p>
              }
            </div>
          </div>
          <input type="phone" placeholder="Ваш телефон" className={`${phoneError.status && s.error}`} value={phone} onChange={({ target }) => setPhone(target.value)} />
          {
            phoneError.status && <p className={s.error}>{phoneError.message}</p>
          }
          <input type="text" placeholder="Ваша почта" className={`${emailError.status && s.error}`} value={email} onChange={({ target }) => setEmail(target.value)} />
          {
            emailError.status && <p className={s.error}>{emailError.message}</p>
          }
          <div className={s.rowTwo}>
            <div>
              <input type="password" placeholder="Ваш пароль" className={`${passwordError.status && s.error}`} value={password} onChange={({ target }) => setPassword(target.value)} />
              {
                passwordError.status && <p className={s.error}>{passwordError.message}</p>
              }
            </div>
            <div>
              <input type="password" placeholder="Повтор пароля" className={`${passwordRepeatError.status && s.error}`} value={passwordRepeat} onChange={({ target }) => setPasswordRepeat(target.value)} />
              {
                passwordRepeatError.status && <p className={s.error}>{passwordRepeatError.message}</p>
              }
            </div>
          </div>

          <select defaultValue={"Выберите дорогу"} onChange={({target}) => setRoad(target.value)} className={`${roadError.status && s.error}`}>
            <option value={"Выберите дорогу"} disabled>Выберите дорогу</option>
            <option value="Восточно-Сибирская железная дорога">Восточно-Сибирская железная дорога</option>
            <option value="Горьковская железная дорога">Горьковская железная дорога</option>
            <option value="Дальневосточная железная дорога">Дальневосточная железная дорога</option>
            <option value="Забайкальская железная дорога">Забайкальская железная дорога</option>
            <option value="Западно-Сибирская железная дорога">Западно-Сибирская железная дорога</option>
            <option value="Калининградская железная дорога">Калининградская железная дорога</option>
            <option value="Куйбышевская железная дорога">Куйбышевская железная дорога</option>
            <option value="Московская железная дорога">Московская железная дорога</option>
            <option value="Октябрьская железная дорога">Октябрьская железная дорога</option>
            <option value="Приволжская железная дорога">Приволжская железная дорога</option>
            <option value="Сахалинская железная дорога">Сахалинская железная дорога</option>
            <option value="Свердловская железная дорога">Свердловская железная дорога</option>
            <option value="Северная железная дорога">Северная железная дорога</option>
            <option value="Северо-Кавказская железная дорога">Северо-Кавказская железная дорога</option>
            <option value="Юго-Восточная железная дорога">Юго-Восточная железная дорога</option>
            <option value="Южно-Уральская железная дорога">Южно-Уральская железная дорога</option>
          </select>

          {
            roadError.status && <p className={s.error}>{roadError.message}</p>
          }

          <input type="text" placeholder="Предприятие" className={`${workError.status && s.error}`} value={work} onChange={({ target }) => setWork(target.value)} />
          {
            workError.status && <p className={s.error}>{workError.message}</p>
          }
          <button onClick={sendData}>Зарегистрироваться</button>
          <Link to={"/recovery"}>Восстановить пароль</Link>
          <Link to={"/login"}>Войти</Link>
        </div>
      </div>
    </DefaultLayout>
  );

});

export default MainRegister;