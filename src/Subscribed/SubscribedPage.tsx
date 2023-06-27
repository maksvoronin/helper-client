import MainLayout from '../@layouts/main.layout';
import { DefaultPage } from '../@types/pageprops.interface';
import s from './subscribedpage.module.scss';
import { useState, useEffect, useContext } from 'react';
import $api from '../@http';
import config from '../config';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { observer } from 'mobx-react';

const SubscribedPage = observer(({ title }: DefaultPage) => {
  const [userSystems, setUserSystems] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [userComments, setUserComments] = useState<any[]>([]);
  const [decisions, setDecisions] = useState<any[]>([]);

  const { store } = useContext(Context);

  useEffect(() => {
    if (store.user) {
      $api.get(`${config.API}/comment/all`).then(({ data }) => setComments(data.data));
      $api.get(`${config.API}/decision/all`).then(({ data }) => setDecisions(data.data));
      store.user &&
        store.user.subscribedSystems &&
        store.user.subscribedSystems.forEach((e: any) => {
          $api.get(`${config.API}/system/get?id=${e}`).then(({ data }) => setUserSystems((prev) => [...prev, data.data]));
        });

      store.user &&
        store.user.subscribedSystems &&
        store.user.subscribedComments.forEach((e: any) => {
          $api.get(`${config.API}/comment/get?id=${e}`).then(({ data }) => setUserComments((prev) => [...prev, data.data]));
        });
    }
  }, [store.user]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!store.isAuth) {
      navigate('/');
    }
  }, [navigate, store.isAuth]);

  return (
    <MainLayout title={title}>
      <div className={s.subscribedWrapper}>
        <div className={s.subscribedPage}>
          <h1 className={s.title}>Отслеживаемое</h1>
        </div>
        <div className={s.contentBlock}>
          <h1>Системы</h1>
          {userSystems.length > 0 &&
            userSystems.map((e: any) => (
              <div key={e._id}>
                <b>{e.name}</b>
                <ul>
                  {comments.map(
                    (r) =>
                      r.system === e._id &&
                      r.visible && (
                        <li key={r._id}>
                          <Link to={`/comment/${r._id}`}>{r.content}</Link>
                        </li>
                      ),
                  )}
                </ul>
              </div>
            ))}
        </div>

        <div className={s.contentBlock}>
          <h1>Замечания</h1>
          {userComments.length > 0 &&
            userComments.map((e: any) => (
              <div key={e._id}>
                <b>{e.content}</b>
                <ul>
                  {decisions.map(
                    (r) =>
                      r.comment === e._id &&
                      r.visible && (
                        <li key={r._id}>
                          <Link to={`/decision/${r._id}`}>{r.content}</Link>
                        </li>
                      ),
                  )}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </MainLayout>
  );
});

export default SubscribedPage;
