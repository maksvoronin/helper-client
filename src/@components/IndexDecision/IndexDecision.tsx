import axios from 'axios';
import { useState, useEffect } from 'react';
import $api from '../../@http';
import config from '../../config';
import s from './indexdecision.module.scss';

const IndexDecision = ({ children, decision, text, userData, authedUser }: any) => {

  const [user, setUser] = useState<any>();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if(decision && !userData) {
      axios.get(`${config.API}/user/get?id=${decision.by}`).then(({ data }) => setUser(data.data));
    } else  {
      setUser(userData);
    }
  }, [decision]);

  useEffect(() => {
    decision && authedUser && setIsLiked(authedUser.likedDecisions.indexOf(decision._id) > -1);
  }, [authedUser]);

  const like = (id: string) => {
    if(isLiked) {
      $api.post(`${config.API}/decision/unlike`, {id}).then(({data}) => console.log(data));
      setIsLiked(false);
    } else {
      $api.post(`${config.API}/decision/like`, {id}).then(({data}) => console.log(data));
      setIsLiked(true);
    }
  }

  if (decision && decision.visible) {
    return (
      <div className={s.indexDecision}>
        {children}
        {
          decision.file && <img src={`${config.API}/public/${decision.file}`} alt="Дополнение к решению" onClick={() => window.open(`${config.API}/public/${decision.file}`)} />
        }
        <div className={s.bottom}>
          <div className={s.info}>
            {user && `${user.name} ${user.surname}`} • {new Date(decision.created).toLocaleString()}
          </div>
          <div>
            {authedUser && <button className={isLiked ? s.active : ""} onClick={() => like(decision._id)}>Полезно</button>}
          </div>
        </div>
      </div>
    );
  } else if(!decision) {
    return (<div className={s.indexDecision}>{text}</div>);
  } else {
    return(<div className={s.indexDecision}>Решение скрыто</div>);
  }
}

export default IndexDecision;