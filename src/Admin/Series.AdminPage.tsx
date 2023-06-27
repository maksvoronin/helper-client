import { Context } from "..";
import {useEffect, useState, useContext} from 'react';
import MainLayout from "../@layouts/main.layout"
import { DefaultPage } from "../@types/pageprops.interface"

import s from './adminpage.module.scss';
import { useNavigate } from "react-router-dom";
import $api from "../@http";
import config from "../config";
import { alert } from "../@services/alerting.service";
import { observer } from "mobx-react";

const SeriesAdminPage = observer(({ title }: DefaultPage) => {

  const [series, setSeries] = useState<any[]>([]);
  const [seriesName, setSeriesName] = useState<string>("");

  const {store} = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    $api.get(`${config.API}/series/all`).then(({data}) => setSeries(data.data));
    if(!store.isAuth || store.user.permissions < 2) {
      navigate('/');
    }
  }, [store.isAuth, navigate, store.user.permissions]);

  const sendData = () => {
    $api.post(`${config.API}/series/create`, {name: seriesName}).then(({data}) => {
      console.log(data);
      if(data.type === "error") {
        return alert("error", "Создание серии", data.message, 15);
      }
      setSeriesName("");
      return alert("default", "Серия создана!", "Вы успешно добавили новую серию", 15);
    });
  }

  return(
    <MainLayout title={title}>
      <div className={s.adminWrapper}>
        <div className={s.adminPage}>
          <h1 className={s.title}>Добавление серии</h1>
          <p>Название серии</p>
          <input type="text" placeholder="Название серии локомотива" value={seriesName} onChange={({target}) => setSeriesName(target.value)} />
          <button onClick={sendData}>Сохранить</button>
          <p style={{textAlign: 'center', marginBottom: 8}}>Существующие серии:</p>
          {
            series && series.map(e => <div key={e._id} className={s.series}>{e.name} {!e.visible && <i>скрыто</i>}</div>)
          }
        </div>
      </div>
    </MainLayout>
  );
});

export default SeriesAdminPage;