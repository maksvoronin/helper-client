import { Context } from "..";
import MainLayout from "../@layouts/main.layout"
import s from './detailcomment.module.scss';
import { useContext, useState, useEffect } from 'react';
import $api from "../@http";
import config from "../config";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { alert } from "../@services/alerting.service";
import IndexDecision from "../@components/IndexDecision/IndexDecision";
import axios from "axios";

const DetailCommentPage = () => {

  const { id } = useParams();

  const { store } = useContext(Context);

  const [system, setSystem] = useState<any>("");
  const [series, setSeries] = useState<any>("");
  const [comment, setComment] = useState<any>();
  const [decisions, setDecisions] = useState<any>();
  const [user, setUser] = useState<any>();

  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`${config.API}/comment/get?id=${id}`).then(({ data }) => {
      if (data.type === "error") {
        return alert("error", "Ошибка", "Замечание не найдено", 15);
      } else {
        setComment(data.data);
      }
    });
  }, []);

  useEffect(() => {
    if (comment) {
      setVisible(comment.visible);
      axios.get(`${config.API}/system/get?id=${comment.system}`).then(({ data }) => setSystem(data.data));
      axios.get(`${config.API}/series/get?id=${comment.series}`).then(({ data }) => setSeries(data.data));
      axios.get(`${config.API}/user/get?id=${comment.by}`).then(({ data }) => setUser(data.data));
      axios.get(`${config.API}/comment/decisions?id=${comment._id}`).then(({ data }) => setDecisions(data.data));
    }

  }, [comment]);

  const showComment = () => {
    setVisible(true);
    $api.put(`${config.API}/comment/show`, { id: comment._id }).then(({ data }) => {
      if (data.type === "error") {
        alert("error", "Ошибка", data.message, 15);
      } else {
        alert("default", "Успешно", "Замечание показано", 15);
      }
    });
  }

  const hideComment = () => {
    setVisible(false);
    $api.put(`${config.API}/comment/hide`, { id: comment._id }).then(({ data }) => {
      if (data.type === "error") {
        alert("error", "Ошибка", data.message, 15);
      } else {
        alert("default", "Успешно", "Замечание скрыто", 15);
      }
    });
  }

  const editComment = () => {
    const newText = prompt("Укажите новый текст замечания", comment.content);
    $api.put(`${config.API}/comment/edit`, {id: comment._id, comment: newText}).then(({data}) => {
      if(data.type === "error") {
        return alert("error", "Ошибка", data.message, 15);
      } else {
        setComment({...comment, content: newText});
        return alert("default", "Успешно", "Замечание обновлено", 15);
      }
    })
  }

  return (
    <MainLayout title={`Замечание: ${comment && comment.content}`}>
      <div className={s.detailComment}>
        <h1>{comment && comment.content}</h1>
        <p>Система: {system && system.name}</p>
        <p>Серия: {series && series.name}</p>
        <p>Количество решений: {comment && comment.decisions.length}</p>
        <p>Автор: <Link to={`/profile/${user && user.id}`}>{user && user.name} {user && user.surname}</Link></p>
        <p>Создано: {comment && new Date(comment.created).toLocaleString()}</p>
        <div className={s.buttons}>
          {
            store.isAuth ? <>
              {comment && store.user.id === comment.by && <>
                <button className={s.edit} onClick={editComment}>Редактировать</button>
                <button className={`${visible ? s.hide : s.show}`} onClick={visible ? hideComment : showComment}>{visible ? "Скрыть" : "Показать"}</button>
              </>}
            </> : null
          }
        </div>
      </div>
      {
        decisions ? decisions.map((r: any) => r.visible ? <IndexDecision key={r._id} decision={r} authedUser={store.user}>{r.content}</IndexDecision> : <IndexDecision key={r._id} text="Решение скрыто" />) : <IndexDecision text="Решения не найдены" />
      }
    </MainLayout>
  );
}

export default DetailCommentPage;