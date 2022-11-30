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

  useEffect(() => {
    axios.get(`${config.API}/system/all`).then(({data}) => setSystems(data.data));
  }, []);

  useEffect(() => {
    setSelectedComment("");
    axios.get(`${config.API}/comment/system?id=${selectedSystem}`).then(({data}) => setComments(data.data));
  }, [selectedSystem]);

  useEffect(() => {
    axios.get(`${config.API}/comment/decisions?id=${selectedComment}`).then(({data}) => setDecisions(data.data));
  }, [selectedComment]);

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

  return (
    <MainLayout title={title}>

      <div className={s.indexWrapper}>
        <div className={s.indexContainer}>
          <h1>Помощник поиска неисправностей</h1>

          <p>Система</p>
          <select defaultValue={"Выберите систему"} onChange={({target}) => setSelectedSystem(target.value)}>
            <option value="Выберите систему" disabled>Выберите систему</option>
            {
              systems.length > 0 && systems.map((r: any) => <option value={r._id} key={r._id}>{r.name}</option>)
            }
          </select>

          <p>Замечание</p>
          <select defaultValue={selectedSystem.length > 0 ? ((comments && comments.length > 0) ? "Выберите замечание" : "Замечания не найдены") : "Выберите систему"} onChange={({target}) => setSelectedComment(target.value)}>
            <option disabled value={selectedSystem.length > 0 ? ((comments && comments.length > 0) ? "Выберите замечание" : "Замечания не найдены") : "Выберите систему"}>{selectedSystem.length > 0 ? ((comments && comments.length > 0) ? "Выберите замечание" : "Замечания не найдены") : "Выберите систему"}</option>
            {
              comments && comments.length > 0 && comments.map((r: any) => <option value={r._id} key={r._id}>{r.content}</option>)
            }
          </select>

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