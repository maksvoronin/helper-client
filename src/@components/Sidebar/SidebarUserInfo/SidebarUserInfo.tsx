import { mdiCogOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../..';
import $api from '../../../@http';
import config from '../../../config';
import s from './sidebaruserinfo.module.scss';

const SidebarUserInfo = () => {
  const { store } = useContext(Context);
  const user = store.user;

  const [comments, setComments] = useState<number>(0);
  const [decisions, setDecisions] = useState<number>(0);

  useEffect(() => {
    if (!store.stat.comments || !store.stat.decisions) {
      $api.get(`${config.API}/stat/user?id=${store.user.id}&params=count`).then(({ data }) => {
        store.setStat(data.data.countComments, data.data.countDecisions);
        setComments(data.data.countComments);
        setDecisions(data.data.countDecisions);
      });
    } else {
      setComments(store.stat.comments);
      setDecisions(store.stat.decisions);
    }
  }, [store]);

  return (
    <div className={`${s.userInfo}`}>
      {user && (
        <>
          <div className={s.userContent}>
            <div style={{ backgroundImage: `url(${config.API}/public/${user.avatar})` }} className={s.avatar} />
            <div className={s.texts}>
              <b>
                <Link to={`/profile/${user.id}`}>
                  {user.name} {user.surname}
                </Link>
              </b>
              <span>
                {decisions} реш. / {comments} замеч.
              </span>
            </div>
          </div>
          <Link to={'/settings'} className={s.settingsBtn}>
            <Icon path={mdiCogOutline} />
          </Link>
        </>
      )}
    </div>
  );
};

export default SidebarUserInfo;
