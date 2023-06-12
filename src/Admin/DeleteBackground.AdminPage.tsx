import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import $api from '../@http';
import MainLayout from '../@layouts/main.layout';
import { alert } from '../@services/alerting.service';
import { DefaultPage } from '../@types/pageDefault.interface';
import config from '../config';
import s from './adminpage.module.scss';
import { observer } from 'mobx-react';

const DeleteBackgroundAdminPage = observer(({ title }: DefaultPage) => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (!store.isAuth || store.user.permissions < 2) {
      navigate('/');
    }
  }, [store.isAuth, navigate, store.user.permissions]);

  const [backgrounds, setBackgrounds] = useState<any>();
  const [selectedBackground, setSelectedBackground] = useState<string>("");

  useEffect(() => {
    $api.get(`${config.API}/background/all`).then(({ data }) => {
      setBackgrounds(data.data);
    });
  }, []);

  const sendData = () => {
    if(!selectedBackground) return alert("error", "Ошибка", "Выберите фон", 15);

    $api.post(`${config.API}/background/edit`, {id: selectedBackground, visible: false}).then(({data}) => {
      if(data.type === "error") return alert("error", "Ошибка", data.message, 15);

      alert("default", "Успешно", "Вы успешно скрыли фон", 15);
    });
  }

  return (
    <MainLayout title={title}>
      <div className={s.adminWrapper}>
        <div className={s.adminPage}>
          <h1 className={s.title}>Удаление фона</h1>
          <p>Выберите фон</p>
          <select onChange={({target}) => setSelectedBackground(target.value)} value={selectedBackground}>
            <option value="">Выберите фон</option>
            {
              backgrounds && backgrounds.map((e: any) => <option value={e._id} key={e._id}>{e.title}</option>)
            }
          </select>
          <button onClick={sendData}>Скрыть</button>
        </div>
      </div>
    </MainLayout>
  );
});

export default DeleteBackgroundAdminPage;
