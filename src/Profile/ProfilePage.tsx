import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Context } from '..';
import IndexDecision from '../@components/IndexDecision/IndexDecision';
import $api from '../@http';
import MainLayout from '../@layouts/main.layout';
import { alert } from '../@services/alerting.service';
import User from '../@types/user.interface';
import config from '../config';
import s from './profilepage.module.scss';
import { observer } from 'mobx-react';

const ProfilePage = observer(() => {
  const { id } = useParams();
  const { store } = useContext(Context);
  const [user, setUser] = useState<User>({} as User);
  const [counts, setCounts] = useState<any>({});

  const [comments, setComments] = useState<any>();
  const [decisions, setDecisions] = useState<any>();

  useEffect(() => {
    $api.get(`${config.API}/user/get?id=${id}&params=created,permissions,createdDecisions,createdComments`).then(({ data }) => {
      if (data.type === 'error') {
        return alert('error', 'Ошибка', data.message, 15);
      }
      setUser(data.data);
    });

    $api.get(`${config.API}/stat/user?id=${id}&params=count`).then(({ data }) => {
      setCounts(data.data);
    });

    $api.get(`${config.API}/comment/user?id=${id}`).then(({ data }) => {
      setComments(data.data);
    });

    $api.get(`${config.API}/decision/user?id=${id}`).then(({ data }) => {
      setDecisions(data.data);
    });
  }, [id]);

  return (
    <MainLayout title={`Профиль`}>
      <div className={s.profilePageWrapper}>
        <div className={s.contentBlock}>
          <div className={s.profileInfo}>
            <div className={s.avatar} style={{ backgroundImage: user && user.avatar && `url(${config.API}/public/${user.avatar})` }} onClick={() => user && window.open(`${config.API}/public/${user.avatar}`)} />
            <div>
              <h1>{user && `${user.name} ${user.surname}`}</h1>
              <p className={s.description}>{user && `${user.permissions > 2 ? 'Администратор' : 'Пользователь'} / ${new Date(user.created).toLocaleString()}`}</p>
              <p className={s.counts}>{counts && `Замечаний: ${counts.countComments}, решений: ${counts.countDecisions}`}</p>
            </div>
          </div>
        </div>

        {decisions &&
          decisions.map((r: any) => (
            <IndexDecision key={r._id} decision={r} authedUser={store.user}>
              {r.content}
            </IndexDecision>
          ))}
        {comments &&
          comments.map((r: any) => 
            <div className={s.contentBlock} key={r._id}>
              <h2>Замечание от {new Date(r.created).toLocaleString()}</h2>
              <Link to={`/comment/${r._id}`}>{r.content}</Link>
            </div>
          )}
      </div>
    </MainLayout>
  );
});

export default ProfilePage;
