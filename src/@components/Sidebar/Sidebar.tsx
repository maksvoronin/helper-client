import { mdiCommentQuestionOutline, mdiCommentCheckOutline, mdiCogOutline, mdiCardsHeartOutline, mdiDatabase, mdiThumbUpOutline, mdiSecurity, mdiHomeOutline } from '@mdi/js';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../..';
import Logo from '../../@assets/logo';
import SearchPanel from '../SearchPanel/SearchPanel';
import s from './sidebar.module.scss';
import SidebarButton from './SidebarButton/SidebarButton';
import SidebarUserInfo from './SidebarUserInfo/SidebarUserInfo';

const Sidebar = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const user = store.user;

  if (!user || !store.isAuth) {
    return (
      <div className={s.sidebar}>
        <div className={s.logo}>
          <Logo />
          <p>Helper</p>
        </div>
        <SearchPanel />
        <div className={s.sidebarAuthPanel}>
          <p>Для использования всех возможностей сервиса Вам необходимо авторизоваться</p>
          <button className={s.join} onClick={() => navigate('/login')}>
            Войти
          </button>
          <button className={s.reg} onClick={() => navigate('/register')}>
            Зарегистрироваться
          </button>
          <Link to="/recovery" onClick={() => navigate('/recovery')}>
            Восстановить аккаунт
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={s.sidebar}>
      <div className={s.logo}>
        <Logo />
        <p>Helper</p>
      </div>

      <SearchPanel />

      <>
        <div className={s.buttons}>
          <SidebarButton icon={mdiHomeOutline} link={'/'} permission={0}>
            Главная
          </SidebarButton>
          <div className={s.separator} />
          <SidebarButton icon={mdiCommentQuestionOutline} link={'/comment'} permission={1}>
            Добавить замечание
          </SidebarButton>
          <SidebarButton icon={mdiCommentCheckOutline} link={'/decision'} permission={1}>
            Добавить решение
          </SidebarButton>
          <div className={s.separator} />
          <SidebarButton icon={mdiThumbUpOutline} link={'/liked'} permission={0}>
            Полезные решения
          </SidebarButton>
          <SidebarButton icon={mdiDatabase} link={'/my'} permission={0} secondary={false}>
            Мои данные
          </SidebarButton>
          <SidebarButton icon={mdiCardsHeartOutline} link={'/subscribed'} permission={0}>
            Отслеживаемое
          </SidebarButton>
          <div className={s.separator} />
          <SidebarButton icon={mdiCogOutline} link={'/settings'} permission={0}>
            Настройки
          </SidebarButton>
          <div className={`${user.permissions > 2 && s.separator}`} />
          <SidebarButton icon={mdiSecurity} link={'/admin'} permission={2}>
            Управление
          </SidebarButton>
        </div>
        <SidebarUserInfo />
        <div className={`${s.links} ${s.secondaryButtons}`}>
          {/* <Link className={`${s.support}`} to="/support">
            Поддержка
          </Link> */}
          <a className={s.support} href="https://chat.whatsapp.com/LVS4gxkE85HDwCHAA77AJ3" target={'_blank'} rel="noreferrer">
            Чат WhatsApp
          </a>
          <a className={s.support} href="https://t.me/voroninme" target={'_blank'} rel="noreferrer">
            Telegram
          </a>
        </div>
      </>
    </div>
  );
};

export default Sidebar;
