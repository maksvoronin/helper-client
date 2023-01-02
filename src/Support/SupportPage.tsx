import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import SupportMessage, { SupportData } from '../@components/SupportMessage/SupportMessage';
import $api from '../@http';
import MainLayout from '../@layouts/main.layout';
import { alert } from '../@services/alerting.service';
import { DefaultPage } from '../@types/pageDefault.interface';
import config from '../config';
import s from './supportpage.module.scss';

const SupportPage = ({ title }: DefaultPage) => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (!store.isAuth) {
      navigate('/');
    }
  }, [store.isAuth, navigate]);

  const [question, setQuestion] = useState<string>('');
  const [requests, setRequests] = useState<any>();

  useEffect(() => {
    $api.get(`${config.API}/support/user`).then(({ data }) => {
      setRequests(data.message);
    });
  }, []);

  const sendData = () => {
    if (!question) return alert('error', 'Ошибка', 'Напишите вопрос', 15);

    $api.post(`${config.API}/support/create`, { content: question }).then(() => {
      alert('default', 'Успешно', `Вопрос отправлен!`, 15);
      setQuestion('');
    });
  };

  return (
    <MainLayout title={title}>
      <div className={s.supportPage}>
        <h1>Поддержка сайта</h1>
        <p>Напишите максимально четко с чем Вы столкнулись или что хотели бы уточнить</p>
        <textarea
          placeholder="Ваш вопрос"
          value={question}
          onChange={({ target }) => setQuestion(target.value)}
        ></textarea>
        <button onClick={sendData}>Отправить</button>
        <div className={s.links}>
          <p>Также можете воспользоваться мессенджерами:</p>
          <a
            className={s.support}
            href="https://chat.whatsapp.com/LVS4gxkE85HDwCHAA77AJ3"
            target={'_blank'}
            rel="noreferrer"
          >
            Чат WhatsApp
          </a>
          <a className={s.support} href="https://t.me/voroninme" target={'_blank'} rel="noreferrer">
            Telegram
          </a>
        </div>
      </div>
      {requests &&
        requests.map((e: SupportData) => {
          return (
            <SupportMessage
              key={e.sid}
              sid={e.sid}
              content={e.content}
              responsed={e.responsed}
              response={e.response}
            />
          );
        })}
    </MainLayout>
  );
};

export default SupportPage;
