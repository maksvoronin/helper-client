import MainLayout from "../@layouts/main.layout";
import { DefaultPage } from "../@types/pageDefault.interface";
import s from './likedpage.module.scss';
import { useState, useEffect, useContext } from 'react';
import config from "../config";
import $api from "../@http";
import IndexDecision from "../@components/IndexDecision/IndexDecision";
import { Context } from "..";
import { useNavigate } from "react-router-dom";

const LikedPage = ({ title }: DefaultPage) => {

  const { store } = useContext(Context);

  const [decisions, setDecisions] = useState<any[]>([]);

  useEffect(() => {
    store.user && store.user.likedDecisions && store.user.likedDecisions.forEach((e: any) => {
      $api.get(`${config.API}/decision/get?id=${e}`).then(({ data }) => setDecisions(prev => [...prev, data.data]));
      console.log(decisions)
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const navigate = useNavigate();
  useEffect(() => {
    if(!store.isAuth) {
      navigate('/');
    }
  }, [navigate, store.isAuth]);

  return (
    <MainLayout title={title}>
      <div className={s.likedWrapper}>
        <div className={s.likedPage}>
          <h1>Полезные решения</h1>
        </div>
        {decisions && decisions.length > 0 ? decisions.map((e: any, i: number) => <IndexDecision decision={e} key={i} authedUser={store.user}>{e.content}</IndexDecision>) : <IndexDecision text="Вы ещё не отметили ни одно решение полезным" />}
      </div>
    </MainLayout>
  );
}

export default LikedPage;