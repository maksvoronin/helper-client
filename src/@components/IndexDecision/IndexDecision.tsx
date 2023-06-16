import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../..';
import config from '../../config';
import s from './indexdecision.module.scss';
import { observer } from 'mobx-react';
import $api from '../../@http';
import { alert } from '../../@services/alerting.service';
import Icon from '@mdi/react';
import { mdiTrashCanOutline } from '@mdi/js';

const IndexDecision = observer(({ children, decision, text, userData, authedUser }: any) => {
  const { store } = useContext(Context);
  const [user, setUser] = useState<any>();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    if (decision && !userData) {
      setComments(decision.comments);
      store.isAuth && axios.get(`${config.API}/user/get?id=${decision.by}`).then(({ data }) => setUser(data.data));
    } else {
      setUser(userData);
    }
  }, [decision, userData, store.isAuth]);

  useEffect(() => {
    store.isAuth && decision && authedUser && setIsLiked(authedUser.likedDecisions.indexOf(decision._id) > -1);
  }, [authedUser, decision, store.isAuth]);

  const like = (id: string) => {
    if (isLiked) {
      store.dislikeDecision(id);
      setIsLiked(false);
    } else {
      store.likeDecision(id);
      setIsLiked(true);
    }
  };

  const [commentary, setCommentary] = useState('');
  const sendCommentary = () => {
    if(commentary.trim() === "") return alert("error", "Ошибка", "Заполните форму", 15);
    $api.put(`${config.API}/decision/commentary`, { id: decision._id, text: commentary }).then(({ data }) => {
      if (data.type === 'error') return alert('error', 'Произошла ошибка', data.message, 15);
      alert('default', 'Успешно', 'Комментарий опубликован', 15);
      setComments((prev) => [...prev, { ...data.data.commentary }]);
      setCommentary('');
    });
  };

  const deleteCommentary = (id: string) => {
    $api.put(`${config.API}/decision/uncommentary`, {id}).then(({data}) => {
      if (data.type === 'error') return alert('error', 'Произошла ошибка', data.data, 15);
      setComments((prev) => prev.filter(e => e._id !== id));
      alert('default', 'Успешно', 'Комментарий удалён', 15);
    })
  }

  if (decision && decision.visible) {
    return (
      <div className={s.indexDecision}>
        {children}
        {decision.file && <img src={`${config.fileHost}/${decision.file}`} alt="Дополнение к решению" onClick={() => window.open(`${config.fileHost}/${decision.file}`)} />}
        <div className={s.bottom}>
          <div className={s.info}>
            {user && `${user.name} ${user.surname}`} • {new Date(decision.created).toLocaleString()}
          </div>
          <div>
            {store.isAuth && authedUser && (
              <button className={isLiked ? s.active : ''} onClick={() => like(decision._id)}>
                Полезно
              </button>
            )}
          </div>
        </div>
        <div>
          <h1>
            Комментарии <span>({comments && comments.length})</span>
          </h1>
          {comments &&
            comments.map((e: any) => {
              return (
                <div className={s.comment}>
                  <p key={e._id}>
                    {e.user.name} {e.user.surname}: {e.text}
                  </p>
                  <button onClick={() => deleteCommentary(e._id)}><Icon path={mdiTrashCanOutline} size={"16px"}/></button>
                </div>
              );
            })}
          <div className={s.commentContainer}>
            <input placeholder="Оставьте комментарий" value={commentary} onChange={({ target }) => setCommentary(target.value)} />
            <button onClick={sendCommentary}>Отправить</button>
          </div>
        </div>
      </div>
    );
  } else if (!decision) {
    return <div className={s.indexDecision}>{text}</div>;
  } else {
    return <div className={s.indexDecision}>Решение скрыто</div>;
  }
});

export default IndexDecision;
