import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import $api from '../@http';
import MainLayout from '../@layouts/main.layout';
import { alert } from '../@services/alerting.service';
import { DefaultPage } from '../@types/pageDefault.interface';
import config from '../config';
import s from './adminpage.module.scss';
import { observer } from 'mobx-react';

const ExportAdminPage = observer(({ title }: DefaultPage) => {

  const {store} = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.isAuth || store.user.permissions < 2) {
      navigate('/');
    }
  }, [navigate, store.isAuth, store.user]);

  const exportToday = () => {
    $api.get(`${config.API}/stat/export?params=mini`).then(({data}) => {
      console.log(data);
      alert("default", "Успешно", "Экспорт за день отправлен на почту", 15);
    });
  }

  const exportFull = () => {
    $api.get(`${config.API}/stat/export`).then(({data}) => {
      console.log(data);
      alert("default", "Успешно", "Полный экспорт отправлен на почту", 15);
    });
  }

  return <MainLayout title={title}>
    <div className={s.adminWrapper}>
      <div className={s.adminPage}>
        <h1 className={s.title}>Экспорт данных</h1>
        <button onClick={exportToday}>Экспортировать за сегодня</button>
        <button onClick={exportFull}>Экспортировать полностью</button>
      </div>
    </div>
  </MainLayout>;
});

export default ExportAdminPage;
