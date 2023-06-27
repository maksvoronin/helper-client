import { DefaultPage } from '../@types/pageprops.interface';
import { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../@layouts/main.layout';
import s from './adminpage.module.scss';
import { alert } from '../@services/alerting.service';
import $api from '../@http';
import config from '../config';
import { observer } from 'mobx-react';

const SystemAdminPage = observer(({ title }: DefaultPage) => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  useEffect(() => {
    if (!store.isAuth || store.user.permissions < 2) {
      navigate('/');
    }
  }, [store.isAuth, store.user, navigate]);

  const sendData = () => {
    if(!name) {
      return alert("error", "Ошибка", "Укажите название системы", 15);
    }

    $api.post(`${config.API}/system/create`, {name}).then(({data}) => data.type === "error" ? alert("error", "Ошибка", data.data, 15) : alert("default", "Успешно", "Система добавлена", 15));
    setName("");
  }

  return (
    <MainLayout title={title}>
      <div className={s.adminWrapper}>
        <div className={s.adminPage}>
          <h1 className={s.title}>Добавление системы</h1>
          <p>Название системы</p>
          <input type="text" placeholder="Название системы" value={name} onChange={({target}) => setName(target.value)} />
          <button onClick={sendData}>Сохранить</button>
        </div>
      </div>
    </MainLayout>
  );
});

export default SystemAdminPage;
