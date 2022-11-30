import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IndexDecision from "../@components/IndexDecision/IndexDecision";
import $api from "../@http";
import MainLayout from "../@layouts/main.layout";
import AuthService from "../@services/auth.service";
import { DefaultPage } from "../@types/pageDefault.interface";
import config from "../config";
import s from './index.module.scss';

const IndexPage = ({ title }: DefaultPage) => {

  const [systems, setSystems] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState<string>("");

  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState<string>("");

  const [decisions, setDecisions] = useState([]);
  const [isAuth, setAuth] = useState<boolean>();

  const [user, setUser] = useState<any>();

  const [systemSubscribed, setSystemSubscribed] = useState<boolean>();
  const [commentSubscribed, setCommentSubscribed] = useState<boolean>();

  useEffect(() => {
    axios.get(`${config.API}/system/all`).then(({ data }) => setSystems(data.data));
  }, []);

  useEffect(() => {
    setSelectedComment("");
    axios.get(`${config.API}/comment/system?id=${selectedSystem}`).then(({ data }) => setComments(data.data));
    if (user) {
      setSystemSubscribed(user.subscribedSystems.indexOf(selectedSystem) > -1);
    }
  }, [selectedSystem, user]);

  useEffect(() => {
    axios.get(`${config.API}/comment/decisions?id=${selectedComment}`).then(({ data }) => setDecisions(data.data));
    if(user) {
      setCommentSubscribed(user.subscribedComments.indexOf(selectedComment) > -1);
    }
  }, [selectedComment, user]);

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

  const unsubSystem = () => {
    $api.post(`${config.API}/system/unsubscribe`, { id: selectedSystem }).then(() => {
      setSystemSubscribed(false);
    });
  }

  const subSystem = () => {
    $api.post(`${config.API}/system/subscribe`, { id: selectedSystem }).then(() => {
      setSystemSubscribed(true);
    });
  }

  const unsubComment = () => {
    $api.post(`${config.API}/comment/unsubscribe`, { id: selectedComment }).then(() => {
      setCommentSubscribed(false);
    });
  }

  const subComment = () => {
    $api.post(`${config.API}/comment/subscribe`, { id: selectedComment }).then(() => {
      setCommentSubscribed(true);
    });
  }

  return (
    <MainLayout title={title}>

      <div className={s.indexWrapper}>
        <div className={s.indexContainer}>
          <h1>Помощник поиска неисправностей</h1>

          <p>Система</p>
          <select defaultValue={"Выберите систему"} onChange={({ target }) => setSelectedSystem(target.value)}>
            <option value="Выберите систему" disabled>Выберите систему</option>
            {
              systems.length > 0 && systems.map((r: any) => <option value={r._id} key={r._id}>{r.name}</option>)
            }
          </select>
          {selectedSystem && (user && systemSubscribed ? <p className={`${s.sub} ${s.unsub}`} onClick={unsubSystem}>Перестать отслеживать систему</p> : <p className={s.sub} onClick={subSystem}>Отслеживать систему</p>)}

          <p>Замечание</p>
          <select defaultValue={selectedSystem.length > 0 ? ((comments && comments.length > 0) ? "Выберите замечание" : "Замечания не найдены") : "Выберите систему"} onChange={({ target }) => setSelectedComment(target.value)}>
            <option disabled value={selectedSystem.length > 0 ? ((comments && comments.length > 0) ? "Выберите замечание" : "Замечания не найдены") : "Выберите систему"}>{selectedSystem.length > 0 ? ((comments && comments.length > 0) ? "Выберите замечание" : "Замечания не найдены") : "Выберите систему"}</option>
            {
              comments && comments.length > 0 && comments.map((r: any) => <option value={r._id} key={r._id}>{r.content}</option>)
            }
          </select>
          {selectedComment && (user && commentSubscribed ? <p className={`${s.sub} ${s.unsub}`} onClick={unsubComment}>Перестать отслеживать замечание</p> : <p className={s.sub} onClick={subComment}>Отслеживать замечание</p>)}

          <Link to="/search">Поиск</Link>
        </div>

        <div className={`${s.decisions}`}>
          {
            selectedComment && decisions && (decisions.length > 0 ? decisions.map((r: any) => <IndexDecision key={r._id} decision={r} authedUser={user}>{r.content}</IndexDecision>) : <IndexDecision text="Решения не найдены" />)
          }
        </div>
      </div>

    </MainLayout>
  );
}

export default IndexPage;