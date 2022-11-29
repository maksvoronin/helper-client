import MainLayout from "../@layouts/main.layout";
import { DefaultPage } from "../@types/pageDefault.interface";
import s from './commentpage.module.scss';
import {useState, useEffect} from 'react';
import axios from "axios";
import config from "../config";

const CommentPage = ({ title }: DefaultPage) => {

  const [systems, setSystems] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState<string>("");

  const [series, setSeries] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState<string>("");

  useEffect(() => {
    axios.get(`${config.API}/system/all`).then(({data}) => setSystems(data.data));
  }, []);

  useEffect(() => {
    axios.get(`${config.API}/series/all`).then(({data}) => setSeries(data.data));
  }, []);


  return (
    <MainLayout title={title}>
      <div className={s.commentWrapper}>
        <div className={s.commentPage}>
          <h1>Добавление замечания</h1>
          <p>Выберите систему</p>
          <select defaultValue={"Выберите систему"} onChange={({target}) => setSelectedSystem(target.value)}>
            <option value="Выберите систему" disabled>Выберите систему</option>
            {
              systems.length > 0 && systems.map((r: any) => <option value={r._id} key={r._id}>{r.name}</option>)
            }
          </select>

          <p>Выберите серию локомотива</p>
          <select defaultValue={"Выберите серию"} onChange={({target}) => setSelectedSystem(target.value)}>
            <option value="Выберите серию" disabled>Выберите серию</option>
            {
              series.length > 0 && series.map((r: any) => <option value={r._id} key={r._id}>{r.name}</option>)
            }
          </select>

          <p>Напишите замечание</p>
          <textarea placeholder="Напишите текст замечания"></textarea>

          <p>Напишите решение</p>
          <textarea placeholder="Напишите текст решения"></textarea>

          <label className={s.file} htmlFor="file">Прикрепить файл к решению</label>
          <input type={"file"} id="file" accept="image/*" />
          <button>Сохранить</button>
        </div>
      </div>
    </MainLayout>
  );
}

export default CommentPage;