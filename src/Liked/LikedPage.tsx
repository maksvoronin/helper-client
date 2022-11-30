import MainLayout from "../@layouts/main.layout";
import { DefaultPage } from "../@types/pageDefault.interface";
import s from './likedpage.module.scss';
import { useState, useEffect } from 'react';
import AuthService from "../@services/auth.service";
import config from "../config";
import $api from "../@http";
import IndexDecision from "../@components/IndexDecision/IndexDecision";

const LikedPage = ({ title }: DefaultPage) => {

  const [user, setUser] = useState<any>();
  const [isAuth, setAuth] = useState<boolean>();
  const [decisions, setDecisions] = useState<any[]>([]);

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
    user && user.likedDecisions.forEach((e: any) => {
      $api.get(`${config.API}/decision/get?id=${e}`).then(({ data }) => setDecisions(prev => [...prev, data.data]));
    });

    console.log(decisions);
  }, [user]);

  return (
    <MainLayout title={title}>
      <div className={s.likedWrapper}>
        <div className={s.likedPage}>
          <h1>Полезные решения</h1>
        </div>
        {decisions && decisions.length > 0 ? decisions.map((e: any) => <IndexDecision decision={e} key={e._id} authedUser={user}>{e.content}</IndexDecision>) : <IndexDecision text="Вы ещё не отметили ни одно решение полезным" />}
      </div>
    </MainLayout>
  );
}

export default LikedPage;