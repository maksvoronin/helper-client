import MainLayout from '../@layouts/main.layout';
import { DefaultPage } from '../@types/pageDefault.interface';
import s from './commentpage.module.scss';
import { useState, useEffect, createRef, useContext } from 'react';
import config from '../config';
import IndexDecision from '../@components/IndexDecision/IndexDecision';
import $api from '../@http';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { observer } from 'mobx-react';

const CommentPage = observer(({ title }: DefaultPage) => {
  const [systems, setSystems] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState<string>('');

  const [series, setSeries] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState<string>('');

  const { store } = useContext(Context);
  const user = store.user;

  const [comment, setComment] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const fileInput: any = createRef();

  const [uploadedFile, setUploadedFile] = useState<string>('');

  const [systemError, setSystemError] = useState<{ status: boolean; message: string }>({ status: false, message: '' });
  const [seriesError, setSeriesError] = useState<{ status: boolean; message: string }>({ status: false, message: '' });
  const [commentError, setCommentError] = useState<{ status: boolean; message: string }>({ status: false, message: '' });
  const [decisionError, setDecisionError] = useState<{ status: boolean; message: string }>({ status: false, message: '' });
  const [postData, setPostData] = useState<{ status: boolean; message: string }>({ status: false, message: '' });
  let errorExists = false;

  const navigate = useNavigate();
  useEffect(() => {
    if (!store.isAuth) {
      navigate('/');
    }
  }, [navigate, store.isAuth]);

  useEffect(() => {
    if (!store.systems.length) {
      axios.get(`${config.API}/system/all`).then(({ data }) => {
        setSystems(data.data);
        store.setSystems(data.data);
      });
    } else {
      setSystems(store.systems);
    }

    if (!store.series.length) {
      axios.get(`${config.API}/series/all`).then(({ data }) => {
        setSeries(data.data);
        store.setSeries(data.data);
      });
    } else {
      setSeries(store.series);
    }
  }, [store, store.systems, store.series]);

  useEffect(() => {
    if (fileName) {
      const formData = new FormData();
      formData.append('file', fileInput.current.files[0]);
      formData.append('project', 'helper');
      formData.append('comment', 'Comment');
      $api.post(`${config.fileUpload}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(({ data }) => setUploadedFile(data.data.file));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileName]);

  const unlinkFile = (e: any) => {
    e.preventDefault();
    setFileName('');
    setUploadedFile('');
  };

  useEffect(() => setSystemError({ status: false, message: '' }), [selectedSystem]);
  useEffect(() => setSeriesError({ status: false, message: '' }), [selectedSeries]);
  useEffect(() => setCommentError({ status: false, message: '' }), [comment]);
  useEffect(() => setDecisionError({ status: false, message: '' }), [content]);

  const sendData = () => {
    if (!selectedSystem) {
      setSystemError({ status: true, message: 'Выберите систему' });
      errorExists = true;
    }

    if (!selectedSeries) {
      setSeriesError({ status: true, message: 'Выберите серию' });
      errorExists = true;
    }

    if (!comment) {
      setCommentError({ status: true, message: 'Напишите замечание' });
      errorExists = true;
    }

    if (!content) {
      setDecisionError({ status: true, message: 'Напишите решение' });
      errorExists = true;
    }

    if (!errorExists) {
      $api.post(`${config.API}/comment/create`, { system: selectedSystem, series: selectedSeries, comment }).then(({ data }) => {
        if (data.type === 'error') {
          return setPostData({ status: false, message: data.data });
        }
        $api.post(`${config.API}/decision/create`, { comment: data.data._id, content, file: uploadedFile }).then(({ data }) => {
          if (data.type === 'error') {
            return setPostData({ status: false, message: data.data });
          } else {
            navigate(`/comment/${data.data._id}`);
            return setPostData({ status: true, message: 'Успешно!' });
          }
        });
      });
    }

    return (errorExists = false);
  };

  return (
    <MainLayout title={title}>
      <div className={s.commentWrapper}>
        <div className={s.commentPage}>
          <h1>Добавление замечания</h1>
          <p className="required">Выберите систему</p>
          <select defaultValue={'Выберите систему'} onChange={({ target }) => setSelectedSystem(target.value)} className={systemError.status ? `${s.errorInput}` : ''}>
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
          <p className={s.errorText}>{systemError.message}</p>

          <p className="required">Выберите серию локомотива</p>
          <select defaultValue={'Выберите серию'} onChange={({ target }) => setSelectedSeries(target.value)} className={seriesError.status ? `${s.errorInput}` : ''}>
            <option value="Выберите серию" disabled>
              Выберите серию
            </option>
            {series.length > 0 &&
              series.map(
                (r: any) =>
                  r.visible && (
                    <option value={r._id} key={r._id}>
                      {r.name}
                    </option>
                  ),
              )}
          </select>
          <p className={s.errorText}>{seriesError.message}</p>

          <p className="required">Напишите замечание</p>
          <textarea placeholder="Напишите текст замечания" onChange={({ target }) => setComment(target.value)} value={comment} className={commentError.status ? `${s.errorInput}` : ''} />
          <p className={s.errorText}>{commentError.message}</p>

          <p className="required">Напишите решение</p>
          <textarea placeholder="Напишите текст решения" onChange={({ target }) => setContent(target.value)} value={content} className={decisionError.status ? `${s.errorInput}` : ''} />
          <p className={s.errorText}>{decisionError.message}</p>

          <label
            className={s.file}
            htmlFor="file"
            onClick={(e) => {
              fileName && unlinkFile(e);
            }}
          >
            {fileName ? 'Открепить файл' : 'Прикрепить файл к решению'}
          </label>
          <input type={'file'} id="file" accept="image/*" onChange={({ target }) => setFileName(target.value)} ref={fileInput} />
          <button onClick={sendData}>Сохранить</button>
          {<p className={`${s.postData} ${postData.status ? s.successText : s.errorText}`}>{postData.message}</p>}
        </div>

        <div className={s.previewDecision}>
          <b>Решение будет выглядеть так:</b>
          {user && (
            <IndexDecision decision={{ by: user.id, visible: true, created: Date.now(), file: uploadedFile }} userData={user}>
              {content}
            </IndexDecision>
          )}
        </div>
      </div>
    </MainLayout>
  );
});

export default CommentPage;
