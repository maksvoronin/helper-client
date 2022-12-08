import {
  mdiCommentQuestionOutline,
  mdiCommentCheckOutline,
  mdiCogOutline,
  mdiCardsHeartOutline,
  mdiDatabase,
  mdiThumbUpOutline,
  mdiSecurity,
  mdiHomeOutline
} from '@mdi/js';
import Icon from '@mdi/react';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../..';
import Logo from '../../@assets/logo';
import $api from '../../@http';
import config from '../../config';
import s from './sidebar.module.scss';

const Sidebar = () => {

  const [searchText, setSearchText] = useState<string>("");
  const [searchedResult, setSearchedResult] = useState<any>({});

  const [counts, setCounts] = useState<{ comments: number, decisions: number }>({ comments: 0, decisions: 0 });
  
  const navigate = useNavigate();
  const {store} = useContext(Context);
  const user = store.user;

  useEffect(() => {
    if(searchText) {
      axios.get(`${config.API}/search/get?text=${searchText}`).then(({ data }) => {
        setSearchedResult(data.data);
      });
    }
  }, [searchText]);

  useEffect(() => {
    if (store.isAuth && store.user) {
      $api.get(`${config.API}/stat/user?id=${store.user.id}&params=count`).then(({ data }) => setCounts({ comments: data.data.countComments, decisions: data.data.countDecisions }));
    }
  }, [store.isAuth, store.user]);

  return (
    <div className={s.sidebar}>
      <div className={s.logo}>
        <Logo />
        <p>Helper</p>
      </div>

      <div className={s.search}>
        <input placeholder="Поиск" value={searchText} onChange={({ target }) => setSearchText(target.value)} />
        <div className={s.someResult}>
          {!searchText ? "Введите свой запрос" :
            <>
              По запросу «{searchText}» {" "}
              {
                !(searchedResult.comments || searchedResult.users || searchedResult.decisions) ? "ничего не найдено" :
                  <>
                    найдено {searchedResult.users.length + searchedResult.comments.length + searchedResult.decisions.length}{" "}
                    результат{((searchedResult.users.length + searchedResult.comments.length + searchedResult.decisions.length > 1 &&
                      searchedResult.users.length + searchedResult.comments.length + searchedResult.decisions.length < 5) ||
                      (searchedResult.users.length + searchedResult.comments.length + searchedResult.decisions.length % 10 > 1 &&
                        searchedResult.users.length + searchedResult.comments.length + searchedResult.decisions.length % 10 < 5)) ? "а" : "ов"}
                    {
                      searchedResult.users.length > 0 && (
                        <>
                          <div className={s.tag}>Пользователи</div>
                          {searchedResult.users.map((e: any) => <Link key={e._id} to={`/profile/${e._id}`}>{e.name} {e.surname}</Link>)}
                        </>
                      )
                    }
                    {
                      searchedResult.comments.length > 0 && (
                        <>
                          <div className={s.tag}>Замечания</div>
                          {searchedResult.comments.map((e: any) => e.visible && <Link key={e._id} to={`/comment/${e._id}`}>{e.content}</Link>)}
                        </>
                      )
                    }
                    {
                      searchedResult.decisions.length > 0 && (
                        <>
                          <div className={s.tag}>Решения</div>
                          {searchedResult.decisions.map((e: any) => e.visible && <Link key={e._id} to={`/decision/${e._id}`}>{e.content}</Link>)}
                        </>
                      )
                    }
                    <Link to={`/search?q=${searchText}`}>Открыть страницу поиска</Link>
                  </>
              }
            </>
          }
        </div>
      </div>

      {!store.isAuth ?
        <div className={s.sidebarAuthPanel}>
          <p>Для использования всех возможностей сервиса Вам необходимо авторизоваться</p>
          <button className={s.join} onClick={() => navigate('/login')}>Войти</button>
          <button className={s.reg} onClick={() => navigate('/register')}>Зарегистрироваться</button>
          <Link to="/recovery" onClick={() => navigate('/recovery')}>Восстановить аккаунт</Link>
        </div> :
        <>
          <div className={s.buttons}>
            <Link to={"/"} className={s.btn}><Icon path={mdiHomeOutline} /> <span>Главная</span></Link>

            {
              user && user.permissions > 0 &&
              <>
                <div className={s.separator} />
                <Link to={"/comment"} className={s.btn}><Icon path={mdiCommentQuestionOutline} /> <span>Добавить замечание</span></Link>
                <Link to={"/decision"} className={s.btn}><Icon path={mdiCommentCheckOutline} /> <span>Добавить решение</span></Link>
              </>
            }
            <div className={s.separator} />
            <Link to={"/liked"} className={s.btn}><Icon path={mdiThumbUpOutline} /> <span>Полезные решения</span></Link>
            <div className={s.secondaryButtons}>
              <Link to={"/my"} className={s.btn}><Icon path={mdiDatabase} /> <span>Мои данные</span></Link>
            </div>
            <Link to={"/subscribed"} className={s.btn}><Icon path={mdiCardsHeartOutline} /> <span>Отслеживаемое</span></Link>
            <div className={s.separator} />
            <Link to={"/settings"} className={s.btn}><Icon path={mdiCogOutline} /> <span>Настройки</span></Link>

            {
              user && user.permissions > 2 &&
              <div className={s.secondaryButtons}>
                <div className={s.separator} />
                <Link to={"/admin"} className={s.btn}><Icon path={mdiSecurity} /> <span>Управление</span></Link>
              </div>
            }
          </div>
          <div className={`${s.secondaryButtons} ${s.userInfo}`}>
            {
              user && <>
                <div className={s.userContent}>
                  <div style={{ backgroundImage: `url(${config.API}/public/${user.avatar})` }} className={s.avatar} />
                  <div className={s.texts}>
                    <b><Link to={`/profile/${user.id}`}>{user.name} {user.surname}</Link></b>
                    <span>{counts.decisions} реш. / {counts.comments} замеч.</span>
                  </div>
                </div>
                <Link to={"/settings"} className={s.settingsBtn}>
                  <Icon path={mdiCogOutline} />
                </Link>
              </>
            }
          </div>
          <div className={`${s.links} ${s.secondaryButtons}`}>
            {/* <a className={`${s.support}`} href="/support">Поддержка</a> */}
            <a className={s.support} href="https://chat.whatsapp.com/LVS4gxkE85HDwCHAA77AJ3" target={"_blank"} rel="noreferrer">Чат WhatsApp</a>
            <a className={s.support} href="https://t.me/tpoksy" target={"_blank"} rel="noreferrer">Telegram</a>
          </div>
        </>
      }

    </div>
  );
}

export default Sidebar;