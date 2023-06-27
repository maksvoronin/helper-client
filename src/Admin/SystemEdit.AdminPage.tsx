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

const SystemEditAdminPage = observer(({ title }: DefaultPage) => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [systems, setSystems] = useState<any>();
  const [system, setSystem] = useState<string>();
  const [visible, setVisible] = useState<any>();

  useEffect(() => {
    $api.get(`${config.API}/system/all`).then(({ data }) => setSystems(data.data));
  }, []);

  useEffect(() => {
    if (!store.isAuth || store.user.permissions < 2) {
      navigate('/');
    }
  }, [store.isAuth, store.user, navigate]);

  useEffect(() => {
    $api.get(`${config.API}/system/get?id=${system}`).then(({ data }) => {
      setName(data.data.name);
      setVisible(data.data.visible);
    });
  }, [system]);

  const sendData = () => {
    if (!name) {
      return alert('error', 'Ошибка', 'Укажите название системы', 15);
    }

    $api.put(`${config.API}/system/edit`, { id: system, name, visible: visible === 'on' ? true : false }).then(({ data }) => (data.type === 'error' ? alert('error', 'Ошибка', data.message, 15) : alert('default', 'Успешно', 'Система изменена', 15)));
  };

  return (
    <MainLayout title={title}>
      <div className={s.adminWrapper}>
        <div className={s.adminPage}>
          <h1 className={s.title}>Изменение системы</h1>
          <p>Выберите систему</p>
          <select onChange={({ target }) => setSystem(target.value)}>
            <option value="Выберите систему">Выберите систему</option>
            {systems &&
              systems.map((r: any) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))}
          </select>
          <p>Название системы</p>
          <input type="text" placeholder="Название системы" value={name} onChange={({ target }) => setName(target.value)} />
          <div className={s.check}>
            <input type="checkbox" checked={visible} id="visible" onChange={({target}) => setVisible(target.value)} />
            <label htmlFor="visible">Показывать систему</label>
          </div>
          <button onClick={sendData}>Сохранить</button>
        </div>
      </div>
    </MainLayout>
  );
});

export default SystemEditAdminPage;
