import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import IndexDecision from '../@components/IndexDecision/IndexDecision';
import $api from '../@http';
import MainLayout from '../@layouts/main.layout';
import { DefaultPage } from '../@types/pageDefault.interface';
import config from '../config';
import s from './index.module.scss';

const IndexPage = ({ title }: DefaultPage) => {
  const [systems, setSystems] = useState<any>([]);
  const [selectedSystem, setSelectedSystem] = useState<string>('');

  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState<string>('');

  const [decisions, setDecisions] = useState([]);

  const { store } = useContext(Context);
  const user = store.user;

  const [systemSubscribed, setSystemSubscribed] = useState<boolean>();
  const [commentSubscribed, setCommentSubscribed] = useState<boolean>();

  useEffect(() => {
    if(!store.systems.length) {
      axios.get(`${config.API}/system/all`).then(({ data }) => {
        setSystems(data.data);
        store.setSystems(data.data);
      });
    } else {
      setSystems(store.systems);
      console.log(store.systems.length);
    }
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (store.isAuth) {
      if (!store.user.isActivated) {
        navigate('/activate');
      }
    }
  }, [store.user, store.isAuth, store.user.isActivated, navigate]);

  useEffect(() => {
    if (selectedSystem) {
      setSelectedComment('');
      axios.get(`${config.API}/comment/system?id=${selectedSystem}`).then(({ data }) => setComments(data.data));
      if (store.isAuth && store.user) {
        setSystemSubscribed(store.user.subscribedSystems.indexOf(selectedSystem) > -1);
      }
    }
  }, [selectedSystem, store.user, store.isAuth]);

  useEffect(() => {
    if (selectedComment) {
      axios.get(`${config.API}/comment/decisions?id=${selectedComment}`).then(({ data }) => setDecisions(data.data));
      if (store.isAuth && store.user) {
        setCommentSubscribed(store.user.subscribedComments.indexOf(selectedComment) > -1);
      }
    }
  }, [selectedComment, store.user, store.isAuth]);

  const subSystem = () => {
    store.subscribeSystem(selectedSystem);
    setSystemSubscribed(true);
  };

  const unsubSystem = () => {
    $api.post(`${config.API}/system/unsubscribe`, { id: selectedSystem }).then(() => {
      setSystemSubscribed(false);
    });
  };

  const subComment = () => {
    $api.post(`${config.API}/comment/subscribe`, { id: selectedComment }).then(() => {
      setCommentSubscribed(true);
    });
  };

  const unsubComment = () => {
    $api.post(`${config.API}/comment/unsubscribe`, { id: selectedComment }).then(() => {
      setCommentSubscribed(false);
    });
  };

  return (
    <MainLayout title={title}>
      <div className={s.indexWrapper}>
        <div className={s.indexContainer}>
          <h1>Помощник поиска неисправностей</h1>

          <p>Система</p>
          <select defaultValue={'Выберите систему'} onChange={({ target }) => setSelectedSystem(target.value)}>
            <option value="Выберите систему" disabled>
              Выберите систему
            </option>
            {systems.length > 0 &&
              systems.map(
                (r: any) =>
                  r.visible && (
                    <option value={r._id} key={r._id}>
                      {r.name}
                    </option>
                  ),
              )}
          </select>
          {store.isAuth &&
            selectedSystem &&
            (user && systemSubscribed ? (
              <p className={`${s.sub} ${s.unsub}`} onClick={unsubSystem}>
                Перестать отслеживать систему
              </p>
            ) : (
              <p className={s.sub} onClick={subSystem}>
                Отслеживать систему
              </p>
            ))}

          <p>Замечание</p>
          <select
            defaultValue={selectedSystem.length > 0 ? (comments && comments.length > 0 ? 'Выберите замечание' : 'Замечания не найдены') : 'Выберите систему'}
            onChange={({ target }) => setSelectedComment(target.value)}
          >
            <option disabled value={selectedSystem.length > 0 ? (comments && comments.length > 0 ? 'Выберите замечание' : 'Замечания не найдены') : 'Выберите систему'}>
              {selectedSystem.length > 0 ? (comments && comments.length > 0 ? 'Выберите замечание' : 'Замечания не найдены') : 'Выберите систему'}
            </option>
            {comments &&
              comments.length > 0 &&
              comments.map(
                (r: any) =>
                  r.visible && (
                    <option value={r._id} key={r._id}>
                      {r.content}
                    </option>
                  ),
              )}
          </select>
          {store.isAuth &&
            selectedComment &&
            (user && commentSubscribed ? (
              <p className={`${s.sub} ${s.unsub}`} onClick={unsubComment}>
                Перестать отслеживать замечание
              </p>
            ) : (
              <p className={s.sub} onClick={subComment}>
                Отслеживать замечание
              </p>
            ))}

          {/* <Link to="/search">Поиск</Link> */}
        </div>

        <div className={`${s.decisions}`}>
          {selectedComment &&
            decisions &&
            (decisions.length > 0 ? (
              decisions.map((r: any) =>
                !r.visile ? (
                  <IndexDecision key={r._id} decision={r} authedUser={store.isAuth && store.user}>
                    {r.content}
                  </IndexDecision>
                ) : (
                  <IndexDecision key={r._id} text="Решение скрыто" />
                ),
              )
            ) : (
              <IndexDecision text="Решения не найдены" />
            ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default IndexPage;
