import {
  mdiAccountCircleOutline,
  mdiCommentQuestionOutline,
  mdiCommentCheckOutline,
  mdiCogOutline,
  mdiCardsHeartOutline,
  mdiDatabase,
  mdiThumbUpOutline,
  mdiSecurity
} from '@mdi/js';
import Icon from '@mdi/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../@assets/logo';
import $api from '../../@http';
import AuthService from '../../@services/auth.service';
import config from '../../config';
import s from './sidebar.module.scss';

const Sidebar = () => {

  const [searchText, setSearchText] = useState<string>("");
  const [searchedResult, setSearchedResult] = useState<any>({});
  const [isAuth, setAuth] = useState<boolean>();

  const [user, setUser] = useState<any>();

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.token) {
      AuthService.isAuth().then((r: boolean) => {
        setAuth(r);
        console.log(r);
      });
    }
  }, [isAuth]);

  useEffect(() => {
    axios.get(`${config.API}/search/get?text=${searchText}`).then(({ data }) => {
      setSearchedResult(data.data);
    });
  }, [searchText]);

  useEffect(() => {
    if (isAuth) {
      $api.get(`${config.API}/user/me`).then(({data}) => {setUser(data.data);});
    }
  }, [isAuth]);

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
                          {searchedResult.users.map((e: any) => <Link key={e._id} to={`/user/${e._id}`}>{e.name} {e.surname}</Link>)}
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

      {!isAuth ?
        <div className={s.sidebarAuthPanel}>
          <p>Для использования всех возможностей сервиса Вам необходимо авторизоваться</p>
          <button className={s.join} onClick={() => navigate('/login')}>Войти</button>
          <button className={s.reg} onClick={() => navigate('/register')}>Зарегистрироваться</button>
          <Link to="/recovery" onClick={() => navigate('/recovery')}>Восстановить аккаунт</Link>
        </div> :
        <div className={s.buttons}>
          <div className={s.secondaryButtons}>
            <Link to={"/profile"} className={s.btn}><Icon path={mdiAccountCircleOutline} /> <span>Мой профиль</span></Link>
          </div>
          <div className={s.separator} />
          <Link to={"/comment"} className={s.btn}><Icon path={mdiCommentQuestionOutline} /> <span>Добавить замечание</span></Link>
          <Link to={"/decision"} className={s.btn}><Icon path={mdiCommentCheckOutline} /> <span>Добавить решение</span></Link>
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
      }

    </div>
  );
}

export default Sidebar;