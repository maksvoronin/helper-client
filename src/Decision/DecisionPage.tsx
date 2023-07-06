import MainLayout from "../@layouts/main.layout";
import s from "./decisionpage.module.scss";
import { useState, useEffect, createRef, useContext } from "react";
import axios from "axios";
import config from "../config";
import { Link } from "react-router-dom";
import IndexDecision from "../@components/IndexDecision/IndexDecision";
import $api from "../@http";
import { Context } from "..";
import { observer } from "mobx-react";
import { Response, System } from "../@types";

const DecisionPage = observer(({ title }: DefaultPage) => {
  const [systems, setSystems] = useState<System[]>([]);
  const [selectedSystem, setSelectedSystem] = useState<string>("");

  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState<string>("");

  const [systemError, setSystemError] = useState<{ status: boolean; message: string }>({ status: false, message: "" });
  const [commentError, setCommentError] = useState<{ status: boolean; message: string }>({ status: false, message: "" });
  const [decisionError, setDecisionError] = useState<{ status: boolean; message: string }>({ status: false, message: "" });

  const [content, setContent] = useState<string>("");

  const [fileName, setFileName] = useState<string>("");
  const fileInput: any = createRef();
  const [uploadedFile, setUploadedFile] = useState<string>("");

  const { store } = useContext(Context);
  const user = store.user;

  const [postData, setPostData] = useState<{ status: boolean; message: string }>({ status: false, message: "" });
  let errorExists = false;

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!store.isAuth) {
  //     navigate('/');
  //   }
  // }, [navigate, store.isAuth]);

  useEffect(() => {
    axios.get<Response<System>>(`${config.API}/system/all`).then(({ data }) => setSystems(data.data));
  }, [store.systems]);

  useEffect(() => {
    if (selectedSystem) {
      axios.get(`${config.API}/comment/system?id=${selectedSystem}`).then(({ data }) => setComments(data.data));
    }
  }, [selectedSystem]);

  useEffect(() => {
    if (fileName) {
      const formData = new FormData();
      formData.append("file", fileInput.current.files[0]);
      formData.append("project", "helper");
      formData.append("comment", "decision");
      $api.post(`${config.fileUpload}`, formData, { headers: { "Content-Type": "multipart/form-data" } }).then(({ data }) => setUploadedFile(data.data.file));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileName]);

  const unlinkFile = (e: any) => {
    e.preventDefault();
    setFileName("");
    setUploadedFile("");
  };

  useEffect(() => setSystemError({ status: false, message: "" }), [selectedSystem]);
  useEffect(() => setCommentError({ status: false, message: "" }), [selectedComment]);
  useEffect(() => setDecisionError({ status: false, message: "" }), [content]);

  const sendData = () => {
    if (!selectedSystem) {
      setSystemError({ status: true, message: "Выберите систему" });
      errorExists = true;
    }

    if (!selectedComment) {
      setCommentError({ status: true, message: "Выберите замечание" });
      errorExists = true;
    }

    if (!content) {
      setDecisionError({ status: true, message: "Напишите замечание" });
      errorExists = true;
    }

    if (!errorExists) {
      $api.post(`${config.API}/decision/create`, { comment: selectedComment, content, file: uploadedFile }).then(({ data }) => {
        if (data.type === "error") {
          return setPostData({ status: false, message: data.data });
        } else {
          setContent("");
          setUploadedFile("");
          return setPostData({ status: true, message: "Успешно!" });
        }
      });
    }

    return (errorExists = false);
  };

  return (
    <MainLayout title={title}>
      <div className={s.decisionWrapper}>
        <div className={s.decisionPage}>
          <h1>Добавление решения</h1>
          <p className="required">Выберите систему</p>
          <select defaultValue={"Выберите систему"} onChange={({ target }) => setSelectedSystem(target.value)} className={systemError.status ? `${s.errorInput}` : ""}>
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

          <p className="required">Выберите замечание</p>
          <select
            className={commentError.status ? `${s.errorInput}` : ""}
            defaultValue={selectedSystem.length > 0 ? (comments && comments.length > 0 ? "Выберите замечание" : "Замечания не найдены") : "Выберите систему"}
            onChange={({ target }) => setSelectedComment(target.value)}
          >
            <option disabled value={selectedSystem.length > 0 ? (comments && comments.length > 0 ? "Выберите замечание" : "Замечания не найдены") : "Выберите систему"}>
              {selectedSystem.length > 0 ? (comments && comments.length > 0 ? "Выберите замечание" : "Замечания не найдены") : "Выберите систему"}
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

          <Link to={"/comment"}>Добавить замечание</Link>

          <p className="required">Напишите решение</p>
          <textarea placeholder="Напишите решение" value={content} onChange={({ target }) => setContent(target.value)} className={decisionError.status ? `${s.errorInput}` : ""} />
          <p className={s.errorText}>{decisionError.message}</p>
          <label
            className={s.file}
            htmlFor="file"
            onClick={(e) => {
              fileName && unlinkFile(e);
            }}
          >
            {fileName ? "Открепить файл" : "Прикрепить файл к решению"}
          </label>
          <input type={"file"} id="file" onChange={({ target }) => setFileName(target.value)} ref={fileInput} />
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

export default DecisionPage;
