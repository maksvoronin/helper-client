import { useEffect, useState, useContext, createRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import $api from "../@http";
import MainLayout from "../@layouts/main.layout";
import { alert } from "../@services/alerting.service";
import { DefaultPage } from "../@types/pageDefault.interface";
import config from "../config";
import s from './settingspage.module.scss'

const SettingsPage = ({ title }: DefaultPage) => {

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const inputFile: any = createRef();

  const [backgrounds, setBackgrounds] = useState<any[]>([]);

  const [selectedBG, setSelectedBG] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const [avatar, setAvatar] = useState<string>("");

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const { store } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (!store.isAuth) {
      navigate('/');
    }
  }, [navigate, store.isAuth]);
  
  useEffect(() => {
    $api.get(`${config.API}/background/all`).then(({ data }) => setBackgrounds(data.data));
  }, []);

  useEffect(() => {
    if (store.user) {
      setName(store.user.name);
      setSurname(store.user.surname);
      setPhone(store.user.phone);
      setSelectedBG(store.user.background);
      setEmail(store.user.email);
      setAvatar(store.user.avatar);
    }
  }, [store.user]);

  const selectBG = (e: any) => {
    setSelectedBG(e);
    store.changeBG(e);
    alert("default", "Настройки", "Фон успешно обновлен", 15);
  }

  const sendUserData = () => {
    if (name && name !== store.user.name) {
      store.changeName(name);
    }
    if (surname && surname !== store.user.surname) {
      store.changeSurname(surname);
    }

    if (phone && phone !== store.user.phone) {
      store.changePhone(phone);
    }

    alert("default", "Настройки", "Данные пользователя успешно изменены", 15);

  }

  const sendSecurityData = () => {
    if (email && email !== store.user.email) {
      $api.post(`${config.API}/user/security/email`, { email }).then(({ data }) => console.log(data));
      alert("default", "Смена почты", "Код подтверждения отправлен на почту", 15);
    }

    if(oldPassword || newPassword) {
      if(!oldPassword) {
        return alert("error", "Смена пароля", "Укажите текущий пароль", 15);
      }

      if(!newPassword) {
        return alert("error", "Смена пароля", "Укажите новый пароль", 15);
      }

      $api.post(`${config.API}/user/security/password`, {prev: oldPassword, password: newPassword}).then(({data}) => {
        if(data.type === "error") {
          alert("error", "Смена пароля", data.message, 15);
        } else {
          alert("default", "Смена пароля", data.message, 15);
        }
      });

    }
  }

  useEffect(() => {
    if (fileName) {
      const formData = new FormData();
      formData.append('file', inputFile.current.files[0]);
      $api.post(`${config.API}/file/upload`, formData, { headers: { "Content-Type": "multipart/form-data" } }).then(({ data }) => {
        console.log(data.data.file);
        store.changeAvatar(data.data.file);
        setAvatar(data.data.file);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileName]);

  return (
    <MainLayout title={title}>
      <div className={s.settingsWrapper}>
        <div className={s.contentBlock}>
          <h1>Настройки пользователя</h1>
          <p>Фотография</p>
          {avatar && <label className={s.avatar} htmlFor="avatar" style={{ backgroundImage: `url(${config.API}/public/${avatar})` }} />}
          <input type="file" id="avatar" accept="image/*" ref={inputFile} value={fileName} onChange={({ target }) => setFileName(target.value)} />
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
        <div className={s.contentBlock}>
          <h1>Настройки безопасности</h1>
          <div className={s.row}>
            <div>
              <p>Почта</p>
              <input placeholder="Ваша почта" value={email} onChange={({ target }) => setEmail(target.value)} />
            </div>
          </div>
          <div className={s.row}>
            <div>
              <p>Текущий пароль</p>
              <input type="password" placeholder="Текущий пароль" value={oldPassword} onChange={({target}) => setOldPassword(target.value)} />
            </div>
            <div>
              <p>Новый пароль</p>
              <input type="password" placeholder="Новый пароль" value={newPassword} onChange={({target}) => setNewPassword(target.value)} />
            </div>
          </div>
          <button onClick={sendSecurityData}>Сохранить</button>
          <button className={s.bgRed} onClick={() => { store.logout(); window.location.reload(); }}>Выйти</button>
        </div>
      </div>
    </MainLayout>
  );
}

export default SettingsPage;