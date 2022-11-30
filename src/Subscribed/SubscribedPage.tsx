import MainLayout from "../@layouts/main.layout";
import { DefaultPage } from "../@types/pageDefault.interface";
import s from './subscribedpage.module.scss'
import { useState, useEffect } from 'react';
import AuthService from "../@services/auth.service";
import $api from "../@http";
import config from "../config";
import { Link } from "react-router-dom";

const SubscribedPage = ({ title }: DefaultPage) => {


  const [userSystems, setUserSystems] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [isAuth, setAuth] = useState<boolean>();
  const [userComments, setUserComments] = useState<any[]>([]);
  const [decisions, setDecisions] = useState<any[]>([]);

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
      $api.get(`${config.API}/user/me`).then(({ data }) => { setUser(data.data); console.log(data.data) });
    }
  }, [isAuth]);

  useEffect(() => {
    if (user) {
      $api.get(`${config.API}/comment/all`).then(({ data }) => setComments(data.data));
      $api.get(`${config.API}/decision/all`).then(({ data }) => setDecisions(data.data));
      user && user.subscribedSystems.forEach((e: any) => {
        $api.get(`${config.API}/system/get?id=${e}`).then(({ data }) => setUserSystems(prev => [...prev, data.data]));
      });

      user && user.subscribedComments.forEach((e: any) => {
        $api.get(`${config.API}/comment/get?id=${e}`).then(({ data }) => setUserComments(prev => [...prev, data.data]));
      });
    }
  }, [user]);

  return (
    <MainLayout title={title}>
      <div className={s.subscribedWrapper}>
        <div className={s.subscribedPage}>
          <h1 className={s.title}>Отслеживаемое</h1>

        </div>
        <div className={s.contentBlock}>
          <h1>Системы</h1>
          {
            userSystems && userSystems.map((e: any) =>
              <div key={e._id}>
                <b>{e.name}</b>
                <ul>
                  {comments.map(r => r.system === e._id && <li key={r._id}><Link to={`/comment/${r._id}`}>{r.content}</Link></li>)}
                </ul>
              </div>
            )
          }
        </div>

        <div className={s.contentBlock}>
          <h1>Замечания</h1>
          {
            userComments && userComments.map((e: any) =>
              <div key={e._id}>
                <b>{e.content}</b>
                <ul>
                  {decisions.map(r => r.comment === e._id && <li key={r._id}><Link to={`/decision/${r._id}`}>{r.content}</Link></li>)}
                </ul>
              </div>
            )
          }
        </div>
      </div>
    </MainLayout>
  )
}

export default SubscribedPage;