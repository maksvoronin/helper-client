import { Link } from "react-router-dom";
import MainLayout from "../@layouts/main.layout";
import { DefaultPage } from "../@types/pageDefault.interface";
import s from './mypage.module.scss';
import { useState, useEffect } from 'react';
import AuthService from "../@services/auth.service";
import $api from "../@http";
import config from "../config";

const MyPage = ({ title }: DefaultPage) => {

  const [userComments, setUserComments] = useState<any[]>([]);
  const [userDecisions, setUserDecisions] = useState<any[]>([]);
  const [isAuth, setAuth] = useState<boolean>();

  const [user, setUser] = useState<any>();
  useEffect(() => {
    if (localStorage.token) {
      AuthService.isAuth().then((r: boolean) => {
        setAuth(r);
      });
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) {
      $api.get(`${config.API}/user/me`).then(({ data }) => { setUser(data.data); });
    }
  }, [isAuth]);

  useEffect(() => {
    if(user) {
      $api.get(`${config.API}/comment/user?id=${user.id}`).then(({data}) => setUserComments(data.data));
      $api.get(`${config.API}/decision/user?id=${user.id}`).then(({data}) => setUserDecisions(data.data));
    }
  }, [user]);

  return (
    <MainLayout title={title}>
      <div className={s.myWrapper}>
        <div className={s.myPage}>
          <h1>Мои данные</h1>
          <p>То, чем Вы помогли своим коллегам</p>

          <b>Замечания: {userComments && userComments.length}</b>
          <ul>
            {
              userComments ?
              userComments.map((r: any) => <li key={r._id}><Link to={`/comment/${r._id}`}>{r.content}</Link></li>)
              : <li><span>Вы не добавляли замечаний</span></li>
            }
          </ul>

          <b>Решения: {userDecisions && userDecisions.length}</b>
          <ul>
            {
              userComments ?
              userDecisions.map((r: any) => <li key={r._id}><Link to={`/decision/${r._id}`}>{r.content}</Link></li>)
              : <li><span>Вы не добавляли решений</span></li>
            }
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}

export default MyPage;