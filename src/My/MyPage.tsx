import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../@layouts/main.layout";
import { DefaultPage } from "../@types/pageprops.interface";
import s from './mypage.module.scss';
import { useState, useEffect, useContext } from 'react';
import $api from "../@http";
import config from "../config";
import { Context } from "..";
import { observer } from "mobx-react";

const MyPage = observer(({ title }: DefaultPage) => {

  const [userComments, setUserComments] = useState<any[]>([]);
  const [userDecisions, setUserDecisions] = useState<any[]>([]);

  
  const {store} = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if(!store.isAuth) {
      navigate('/');
    }
  }, [navigate, store.isAuth]);

  useEffect(() => {
    if(store.user) {
      $api.get(`${config.API}/comment/user?id=${store.user._id}`).then(({data}) => setUserComments(data.data));
      $api.get(`${config.API}/decision/user?id=${store.user._id}`).then(({data}) => setUserDecisions(data.data));
    }
  }, [store.user]);
  

  return (
    <MainLayout title={title}>
      <div className={s.myWrapper}>
        <div className={s.myPage}>
          <h1>Мои данные</h1>
          <p>То, чем Вы помогли своим коллегам</p>
          <p>Нажмите на то, что Вы хотите изменить</p>

          <b>Замечания: {userComments && userComments.length}</b>
          <ul>
            {
              userComments ?
              userComments.map((r: any) => <li key={r._id}><Link to={`/comment/${r._id}`}>{r.content} <i>{!r.visible && '(скрыто)'}</i></Link></li>)
              : <li><span>Вы не добавляли замечаний</span></li>
            }
          </ul>

          <b>Решения: {userDecisions && userDecisions.length}</b>
          <ul>
            {
              userComments ?
              userDecisions.map((r: any) => <li key={r._id}><Link to={`/decision/${r._id}`}>{r.content} <i>{!r.visible && '(скрыто)'}</i></Link></li>)
              : <li><span>Вы не добавляли решений</span></li>
            }
          </ul>
        </div>
      </div>
    </MainLayout>
  );
});

export default MyPage;