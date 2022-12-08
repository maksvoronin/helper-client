import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import $api from '../@http';
import MainLayout from '../@layouts/main.layout';
import { DefaultPage } from '../@types/pageDefault.interface';
import User from '../@types/user.interface';
import config from '../config';
import s from './adminpage.module.scss';

const UsersAdminPage = ({ title }: DefaultPage) => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([{} as User]);

  useEffect(() => {
    if (!store.isAuth || store.user.permissions < 2) {
      navigate('/');
    }
  }, [navigate, store.isAuth, store.user]);

  useEffect(() => {
    $api.get(`${config.API}/user/all`).then(({ data }) => {
      setUsers(data.data);
    });
  }, []);

  return (
    <MainLayout title={title}>
      <div className={s.adminWrapper}>
        <div className={s.contentBlock}>
          <h1>Таблица пользователей</h1>
          <div className={s.table}>
            <div className={s.row}>
              <p>Имя, фамилия</p>
              <p>Дорога</p>
              <p>Предприятие</p>
              <p>Телефон</p>
              <p>Замечания</p>
              <p>Решения</p>
            </div>
            {users &&
              users.map((e: any) => (
                <div className={s.row} key={e._id}>
                  <p className={e && !e.isActivated && s.noActivated}>
                    {e.name} {e.surname}
                  </p>
                  <p>{e.road}</p>
                  <p>{e.work}</p>
                  <p>{e.phone}</p>
                  <p>{e.createdComments && e.createdComments.length}</p>
                  <p>{e.createdDecisions && e.createdDecisions.length}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UsersAdminPage;
