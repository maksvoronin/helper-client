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
  const [verifyUsers, setVerifyUsers] = useState<number>(0);

  useEffect(() => {
    if (!store.isAuth || store.user.permissions < 2) {
      navigate('/');
    }
  }, [navigate, store.isAuth, store.user]);

  useEffect(() => {
    $api.get(`${config.API}/user/all`).then(({ data }) => {
      data.data.sort((a: any, b: any) => {
        if (a.road.toLowerCase() < b.road.toLowerCase()) {
          return -1;
        }
        if (a.road.toLowerCase() > b.road.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      setUsers(data.data);
    });
  }, []);

  useEffect(() => {
    if (users) {
      users.forEach((e) => e.isActivated && setVerifyUsers((prev) => (prev += 1)));
    }
  }, [users]);

  return (
    <MainLayout title={title}>
      <div className={s.adminWrapper}>
        <div className={s.contentBlock}>
          <h1>
            Таблица пользователей ({verifyUsers} / {users.length})
          </h1>
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
                <div className={s.row} key={`i${(Math.random() * 100000).toFixed(0)}`}>
                  <p className={`${e && !e.isActivated && s.noActivated}`}>
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
