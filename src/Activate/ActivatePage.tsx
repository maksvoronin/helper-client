import { Context } from '..';
import Logo from '../@assets/logo';
import DefaultLayout from '../@layouts/default.layout';
import { DefaultPage } from '../@types/pageDefault.interface';
import s from './activatepage.module.scss';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import $api from '../@http';
import config from '../config';
import { alert } from '../@services/alerting.service';

const ActivatePage = ({ title }: DefaultPage) => {
  const [email, setEmail] = useState<string>('');
  const { store } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (!store.isAuth || store.user.isActivated) {
      navigate('/');
    } else {
      setEmail(store.user.email);
    }
  }, [navigate, store, store.isAuth, store.user.email]);

  const sendData = () => {
    $api.post(`${config.API}/user/security/email`, { email }).then(({ data }) => {
      if (data.type === 'error') {
        return alert('error', 'Укажите почту', data.data, 15);
      } 
      alert("default", "Успешно", "Письмо отправлено, почта изменена", 15)
    });
  };

  return (
    <DefaultLayout title={title}>
      <div className={s.activateLogin}>
        <div className={s.activateForm}>
          <Logo />
          <h1>Подтвердите свою почту</h1>
          <p>
            Благодарим за пользование нашим сервисом, но для корректной работы Вам необходимо подтвердить свой аккаунт, перейдя по ссылке в письме, которое мы отправим на <b>Вашу почту</b>.
          </p>
          <p>
            Если вы уже перешли по ссылке, то <a href="/">обновите страницу</a>
          </p>
          <input type="text" placeholder="Напишите Вашу почту" value={email} onChange={({ target }) => setEmail(target.value)} />
          <button onClick={sendData}>Отправить письмо</button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ActivatePage;
