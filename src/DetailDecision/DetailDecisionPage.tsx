import axios from 'axios';
import MainLayout from '../@layouts/main.layout';

import { useState, useEffect, useContext } from 'react';
import { alert } from '../@services/alerting.service';
import config from '../config';
import { Link, useParams } from 'react-router-dom';
import s from './detaildecision.module.scss';
import { Context } from '..';
import $api from '../@http';

const DetailDecisionPage = () => {
  const { store } = useContext(Context);

  const { id } = useParams();
  const [decision, setDecision] = useState<any>();
  const [user, setUser] = useState<any>();
  const [comment, setComment] = useState<any>();

  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`${config.API}/decision/get?id=${id}`).then(({ data }) => {
      if (data.type === 'error') {
        return alert('error', 'Ошибка', 'Решение не найдено', 15);
      } else {
        setDecision(data.data);
      }
    });
  }, [id]);

  useEffect(() => {
    if (decision) {
      setVisible(decision.visible);
      axios.get(`${config.API}/user/get?id=${decision.by}`).then(({ data }) => setUser(data.data));
      axios.get(`${config.API}/comment/get?id=${decision.comment}`).then(({ data }) => setComment(data.data));
    }
  }, [decision]);

  const showDecision = () => {
    setVisible(true);
    $api.put(`${config.API}/decision/show`, { id }).then(({ data }) => {
      if (data.type === 'error') {
        alert('error', 'Ошибка', data.message, 15);
      } else {
        alert('default', 'Успешно', 'Замечание показано', 15);
      }
    });
  };

  const hideDecision = () => {
    setVisible(false);
    $api.put(`${config.API}/decision/hide`, { id }).then(({ data }) => {
      if (data.type === 'error') {
        alert('error', 'Ошибка', data.message, 15);
      } else {
        alert('default', 'Успешно', 'Замечание скрыто', 15);
      }
    });
  };

  const editDecision = () => {
    const newText = prompt('Укажите новый текст решения', decision.content);
    $api.put(`${config.API}/decision/edit`, { id, content: newText }).then(({ data }) => {
      if (data.type === 'error') {
        return alert('error', 'Ошибка', data.message, 15);
      } else {
        setDecision({ ...decision, content: newText });
        return alert('default', 'Успешно', 'Решение обновлено', 15);
      }
    });
  };

  return (
    <MainLayout title={`Решение: ${decision && decision.content}`}>
      <div className={s.detailDecision}>
        <h1>{decision && decision.content}</h1>
        <p>Дата создания: {decision && new Date(decision.created).toLocaleString()}</p>
        <p>
          Автор:{' '}
          {user && (
            <Link to={`/profile/${user.id}`}>
              {user.name} {user.surname}
            </Link>
          )}
        </p>
        <p>Замечание: {comment && <Link to={`/comment/${comment._id}`}>{comment.content}</Link>}</p>
        {decision && decision.file && <img src={`${config.API}/public/${decision.file}`} alt={decision.content} />}
        {store.isAuth && decision && store.user.id === decision.by && (
          <div className={s.buttons}>
            <button className={s.edit} onClick={editDecision}>
              Изменить
            </button>
            <button className={`${visible ? s.hide : s.show}`} onClick={visible ? hideDecision : showDecision}>
              {visible ? 'Скрыть' : 'Показать'}
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DetailDecisionPage;
