import MainLayout from '../@layouts/main.layout';
import { DefaultPage } from '../@types/pageDefault.interface';
import s from './decisionpage.module.scss';
import { useState, useEffect, createRef, useContext } from 'react';
import axios from 'axios';
import config from '../config';
import { Link, useNavigate } from 'react-router-dom';
import IndexDecision from '../@components/IndexDecision/IndexDecision';
import $api from '../@http';
import { Context } from '..';

const DecisionPage = ({ title }: DefaultPage) => {
  const [systems, setSystems] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState<string>('');

  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState<string>('');

  const [systemError, setSystemError] = useState<{ status: boolean; message: string }>({ status: false, message: '' });
  const [commentError, setCommentError] = useState<{ status: boolean; message: string }>({ status: false, message: '' });
  const [decisionError, setDecisionError] = useState<{ status: boolean; message: string }>({ status: false, message: '' });

  const [fileName, setFileName] = useState<string>('');
  const fileInput: any = createRef();
  const [content, setContent] = useState<string>('');

  const [uploadedFile, setUploadedFile] = useState<string>('');

  const { store } = useContext(Context);
  const user = store.user;

  const [postData, setPostData] = useState<{ status: boolean; message: string }>({ status: false, message: '' });
  let errorExists = false;

  const navigate = useNavigate();
  useEffect(() => {
    if (!store.isAuth) {
      navigate('/');
    }
  }, [navigate, store.isAuth]);

  useEffect(() => {
    setSystems(store.systems);
  }, [store.systems]);

  useEffect(() => {
    if (selectedSystem) {
      axios.get(`${config.API}/comment/system?id=${selectedSystem}`).then(({ data }) => setComments(data.data));
    }
  }, [selectedSystem]);

  useEffect(() => {
    if (fileName) {
      const formData = new FormData();
      formData.append('file', fileInput.current.files[0]);
      $api.post(`${config.API}/file/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(({ data }) => setUploadedFile(data.data.file));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileName]);

  const unlinkFile = (e: any) => {
    e.preventDefault();
    setFileName('');
    setUploadedFile('');
  };

  useEffect(() => setSystemError({ status: false, message: '' }), [selectedSystem]);
  useEffect(() => setCommentError({ status: false, message: '' }), [selectedComment]);
  useEffect(() => setDecisionError({ status: false, message: '' }), [content]);

  const sendData = () => {
    if (!selectedSystem) {
      setSystemError({ status: true, message: '???????????????? ??????????????' });
      errorExists = true;
    }

    if (!selectedComment) {
      setCommentError({ status: true, message: '???????????????? ??????????????????' });
      errorExists = true;
    }

    if (!content) {
      setDecisionError({ status: true, message: '???????????????? ??????????????????' });
      errorExists = true;
    }

    if (!errorExists) {
      $api.post(`${config.API}/decision/create`, { comment: selectedComment, content, file: uploadedFile }).then(({ data }) => {
        if (data.type === 'error') {
          return setPostData({ status: false, message: data.data });
        } else {
          return setPostData({ status: true, message: '??????????????!' });
        }
      });
    }

    return (errorExists = false);
  };

  return (
    <MainLayout title={title}>
      <div className={s.decisionWrapper}>
        <div className={s.decisionPage}>
          <h1>???????????????????? ??????????????</h1>
          <p className="required">???????????????? ??????????????</p>
          <select defaultValue={'???????????????? ??????????????'} onChange={({ target }) => setSelectedSystem(target.value)} className={systemError.status ? `${s.errorInput}` : ''}>
            <option value="???????????????? ??????????????" disabled>
              ???????????????? ??????????????
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

          <p className="required">???????????????? ??????????????????</p>
          <select
            className={commentError.status ? `${s.errorInput}` : ''}
            defaultValue={selectedSystem.length > 0 ? (comments && comments.length > 0 ? '???????????????? ??????????????????' : '?????????????????? ???? ??????????????') : '???????????????? ??????????????'}
            onChange={({ target }) => setSelectedComment(target.value)}
          >
            <option disabled value={selectedSystem.length > 0 ? (comments && comments.length > 0 ? '???????????????? ??????????????????' : '?????????????????? ???? ??????????????') : '???????????????? ??????????????'}>
              {selectedSystem.length > 0 ? (comments && comments.length > 0 ? '???????????????? ??????????????????' : '?????????????????? ???? ??????????????') : '???????????????? ??????????????'}
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
          <p className={s.errorText}>{commentError.message}</p>

          <Link to={'/comment'}>???????????????? ??????????????????</Link>

          <p className="required">???????????????? ??????????????</p>
          <textarea placeholder="???????????????? ??????????????" value={content} onChange={({ target }) => setContent(target.value)} className={decisionError.status ? `${s.errorInput}` : ''} />
          <p className={s.errorText}>{decisionError.message}</p>
          <label
            className={s.file}
            htmlFor="file"
            onClick={(e) => {
              fileName && unlinkFile(e);
            }}
          >
            {fileName ? '?????????????????? ????????' : '???????????????????? ???????? ?? ??????????????'}
          </label>
          <input type={'file'} id="file" accept="image/*" onChange={({ target }) => setFileName(target.value)} ref={fileInput} />
          <button onClick={sendData}>??????????????????</button>
          {<p className={`${s.postData} ${postData.status ? s.successText : s.errorText}`}>{postData.message}</p>}
        </div>
        <div className={s.previewDecision}>
          <b>?????????????? ?????????? ?????????????????? ??????:</b>
          {user && (
            <IndexDecision decision={{ by: user.id, visible: true, created: Date.now(), file: uploadedFile }} userData={user}>
              {content}
            </IndexDecision>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default DecisionPage;
