import { useEffect, useState } from "react";
import $api from "../@http";
import MainLayout from "../@layouts/main.layout";
import AuthService from "../@services/auth.service";
import { DefaultPage } from "../@types/pageDefault.interface";
import config from "../config";
import s from './settingspage.module.scss'

const SettingsPage = ({ title }: DefaultPage) => {

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  // const [email, setEmail] = useState<string>("");

  const [backgrounds, setBackgrounds] = useState<any>();

  const [isAuth, setAuth] = useState<boolean>();
  const [selectedBG, setSelectedBG] = useState<string>("");

  const [user, setUser] = useState<any>();
  useEffect(() => {
    $api.get(`${config.API}/background/all`).then(({ data }) => setBackgrounds(data.data));
    if (localStorage.token) {
      AuthService.isAuth().then((r: boolean) => {
        setAuth(r);
      });
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) {
      $api.get(`${config.API}/user/me`).then(({ data }) => { setUser(data.data); });
    }
  }, [isAuth]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setSurname(user.surname);
      setPhone(user.phone);
      setSelectedBG(user.background);
      // setEmail(user.email);
      console.log(user);
    }
  }, [user]);

  const selectBG = (e: any) => {
    setSelectedBG(e);
    $api.post(`${config.API}/user/settings/background`, { background: e }).then(({ data }) => window.location.reload());
  }

  const sendUserData = () => {
    if (name && name !== user.name) {
      $api.post(`${config.API}/user/settings/name`, { name });
    }
    if (surname && surname !== user.surname) {
      $api.post(`${config.API}/user/settings/surname`, { surname });
    }

    if (phone && phone !== user.phone) {
      $api.post(`${config.API}/user/settings/phone`, { phone });
    }

    alert("Изменения применены");
  }

  // const sendSecurityData = () => {

  // }

  return (
    <MainLayout title={title}>
      <div className={s.settingsWrapper}>
        <div className={s.contentBlock}>
          <h1>Настройки пользователя</h1>
          <div className={s.row}>
            <div>
              <p>Имя</p>
              <input placeholder={"Ваше имя"} value={name} onChange={({ target }) => setName(target.value)} />
            </div>
            <div>
              <p>Фамилия</p>
              <input placeholder={"Ваша фамилия"} value={surname} onChange={({ target }) => setSurname(target.value)} />
            </div>
          </div>
          <div>
            <p>Телефон</p>
            <input placeholder={"Ваш телефон"} value={phone} onChange={({ target }) => setPhone(target.value)} />
          </div>
          <button onClick={sendUserData}>Сохранить</button>
        </div>

        <div className={s.contentBlock}>
          <h1>Настройки сайта</h1>
          <p>Выберите фон</p>
          <div className={s.backgrounds}>
            {
              backgrounds && backgrounds.map((e: any) => <div key={e._id} className={e._id === selectedBG ? s.selected : ""} onClick={() => selectBG(e._id)}>
                <div className={s.bgPreview} style={{ background: `${e.type === 'color' ? e.content : `url(${config.API}/public/${e.content})`}` }} />
                <p className={s.titleBG}>{e.title}</p>
              </div>
              )
            }
          </div>

        </div>
        {/* <div className={s.contentBlock}>
          <h1>Настройки безопасности</h1>
          <div className={s.row}>
            <div>
              <p>Почта</p>
              <input placeholder="Ваша почта" value={email} onChange={({ target }) => setEmail(target.value)} />
            </div>
          </div>
          <div className={s.row}>
            <div>
              <p>Старый пароль</p>
              <input placeholder="Старый пароль" />
            </div>
            <div>
              <p>Новый пароль</p>
              <input placeholder="Новый пароль" />
            </div>
          </div>
          <button>Сохранить</button>
        </div> */}
      </div>
    </MainLayout>
  );
}

export default SettingsPage;