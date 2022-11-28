import axios from 'axios';
import { useState, useEffect } from 'react';
import config from '../../config';
import s from './indexdecision.module.scss';

const IndexDecision = ({ children, decision, text }: any) => {

  const [user, setUser] = useState<any>();

  useEffect(() => {
    if(decision) {
      axios.get(`${config.API}/user/get?id=${decision.by}`).then(({ data }) => setUser(data.data));
    }
  }, [decision]);

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