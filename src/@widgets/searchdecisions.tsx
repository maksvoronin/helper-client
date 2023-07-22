import { observer } from "mobx-react";
import { FC, createRef, useEffect, useState } from "react";
import { Button, Container, ContainerText, ContainerTitle, FileLabel, InputFile, Textarea } from "../@shared";
import { styled } from "styled-components";
import { Comment, Decision, Response, System, User } from "../@types";
import $api from "../@http";
import { CommentSelect, DecisionBlock, SystemSelect } from "../@components";
import Icon from "@mdi/react";
import { mdiHeart, mdiHeartOutline, mdiShareOutline } from "@mdi/js";
import { useNavigate } from "react-router-dom";
import { useAuthStoreContext, usePopupStoreContext } from "../@store";
import { alert } from "../@services/alerting.service";
import config from "../config";

const Text = styled.p`
  margin-bottom: 5px;
`;

const ControlButton = styled.button`
  height: 36px;
  border: none;
  background: transparent;
  width: 100%;
  border-radius: 8px;
  font-size: 14px;
  transition: background 0.2s, transform 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  &:hover {
    background-color: rgba(100, 100, 100, 0.1);
  }
  &:active {
    transform: scale(0.98);
  }
`;

const ControlRow = styled.div`
  display: flex;
  margin-top: 14px;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const CreateDecisionPopup: FC<{selectedComment: string}> = observer(({selectedComment}) => {
  const navigate = useNavigate();
  const { setVisible } = usePopupStoreContext();
  const [text, setText] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const fileInput: any = createRef();

  const [uploadedFile, setUploadedFile] = useState<string>("");

  useEffect(() => {
    if (fileName) {
      const formData = new FormData();
      formData.append("file", fileInput.current.files[0]);
      formData.append("project", "helper");
      formData.append("comment", "Comment");
      $api.post(`${config.fileUpload}`, formData, { headers: { "Content-Type": "multipart/form-data" } }).then(({ data }) => setUploadedFile(data.data.file));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileName]);

  const unlinkFile = (e?: any) => {
    setFileName("");
    setUploadedFile("");
    e && e.preventDefault();
  };

  const sendData = () => {
    $api.post<Response<Decision>>("/decision/create", { comment: selectedComment, content: text, file: uploadedFile }).then(({ data }) => {
      if (data.type === "error" || typeof data.data === "string") return alert("error", "Ошибка", String(data.data!), 15);
      alert("default", "Успешно", "Решение создано", 15);
      setVisible(false);
      navigate(`/decision/${data.data?._id}`);
    });
  };
  return (
    <>
      <Textarea placeholder="Текст решения" onChange={({target}: any) => setText(target.value)} value={text} />
      <FileLabel
        htmlFor="file"
        onClick={(e: any) => {
          fileName && unlinkFile(e);
        }}
      >
        {fileName ? `Открепить файл ${uploadedFile}` : "Прикрепить другой файл к решению"}
      </FileLabel>
      <InputFile type={"file"} id="file" onChange={({ target }: any) => setFileName(target.value)} ref={fileInput} />
      <Button onClick={sendData}>Создать</Button>
    </>
  );
});

const SearchDecisions: FC = observer(() => {
  const { user, setUser, isAuth } = useAuthStoreContext();
  const { setVisible, setTitle, setContent } = usePopupStoreContext();

  const [selectedSystem, setSelectedSystem] = useState<string>();
  const [selectedFullSystem, setSelectedFullSystem] = useState<System>({} as System);
  const [systemLiked, setSystemLiked] = useState<boolean>(false);

  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedComment, setSelectedComment] = useState<string>();
  const [selectedFullComment, setSelectedFullComment] = useState<Comment>({} as Comment);
  const [commentLiked, setCommentLiked] = useState<boolean>(false);

  const [decisions, setDecisions] = useState<Decision[]>([]);

  const navigate = useNavigate();
  const newUser = user;

  const popupCreateDecision = () => {
    setVisible(true);
    setTitle("Добавление решения");
    setContent(<CreateDecisionPopup selectedComment={selectedComment!} />);
  };

  useEffect(() => {
    if (selectedSystem) {
      $api.get<Response<Comment[]>>(`/comment/system?id=${selectedSystem}`).then(({ data }) => {
        setComments(data.data!);
      });
      user._id && user.subscribedSystems.find((e) => e._id === selectedSystem) ? setSystemLiked(true) : setSystemLiked(false);
    }
  }, [selectedSystem, user.subscribedSystems, user._id]);

  useEffect(() => {
    if (selectedComment) {
      $api.get<Response<Decision[]>>(`/comment/decisions?id=${selectedComment}`).then(({ data }) => {
        setDecisions(data.data!);
      });
      user._id && user.subscribedComments.find((e) => e._id === selectedComment) ? setCommentLiked(true) : setCommentLiked(false);
    }
  }, [selectedComment, user.subscribedComments, user._id]);

  const subSystem = () => {
    $api.post<Response<User>>("/system/subscribe", { id: selectedSystem }).then(({ data }) => {
      if (!data.data) return alert("error", "Ошибка", data.message, 15);
      setSystemLiked(true);
      newUser.subscribedSystems.push(selectedFullSystem);
      setUser(newUser);
    });
  };

  const unSubSystem = () => {
    $api.post<Response<User>>("/system/unsubscribe", { id: selectedSystem }).then(({ data }) => {
      if (!data.data) return alert("error", "Ошибка", data.message, 15);
      setSystemLiked(false);
      newUser.subscribedSystems.splice(
        newUser.subscribedSystems.findIndex((e) => e === selectedFullSystem),
        1,
      );
      setUser(newUser);
    });
  };

  const subComment = () => {
    $api.post<Response<User>>("/comment/subscribe", { id: selectedComment }).then(({ data }) => {
      if (!data.data) return alert("error", "Ошибка", data.message, 15);
      setCommentLiked(true);
      newUser.subscribedComments.push(selectedFullComment);
      setUser(newUser);
    });
  };

  const unSubComment = () => {
    $api.post<Response<User>>("/comment/unsubscribe", { id: selectedComment }).then(({ data }) => {
      if (!data.data) return alert("error", "Ошибка", data.message, 15);
      setCommentLiked(false);
      newUser.subscribedComments.splice(
        newUser.subscribedComments.findIndex((e) => e === selectedFullComment),
        1,
      );
      setUser(newUser);
    });
  };

  return (
    <>
      <Container>
        <ContainerTitle>Помощник поиска неисправностей</ContainerTitle>
        <Text>Система</Text>
        <SystemSelect
          onChange={(e: string) => setSelectedSystem(e)}
          fullInfo={(e: System) => {
            setSelectedFullSystem(e);
          }}
        />
        <Text>Замечание</Text>
        <CommentSelect
          comments={comments}
          onChange={(e: string) => setSelectedComment(e)}
          fullInfo={(e: Comment) => {
            setSelectedFullComment(e);
          }}
        />
        {user.name && (
          <ControlRow>
            {selectedSystem ? (
              systemLiked ? (
                <ControlButton onClick={unSubSystem}>
                  <Icon path={mdiHeart} size={"18px"} />
                  Не отслеживать систему
                </ControlButton>
              ) : (
                <ControlButton onClick={subSystem}>
                  <Icon path={mdiHeartOutline} size={"18px"} />
                  Отслеживать систему
                </ControlButton>
              )
            ) : (
              <></>
            )}
            {selectedComment ? (
              commentLiked ? (
                <ControlButton onClick={unSubComment}>
                  <Icon path={mdiHeart} size={"18px"} />
                  Не отслеживать замечание
                </ControlButton>
              ) : (
                <ControlButton onClick={subComment}>
                  <Icon path={mdiHeartOutline} size={"18px"} />
                  Отслеживать замечание
                </ControlButton>
              )
            ) : (
              <></>
            )}
            {selectedSystem && (
              <ControlButton onClick={() => navigate(`/system/${selectedSystem}`)}>
                <Icon path={mdiShareOutline} size={"18px"} />
                Страница системы
              </ControlButton>
            )}
          </ControlRow>
        )}
      </Container>
      {selectedComment ? (
        decisions.length > 0 ? (
          decisions.map((e) => <DecisionBlock key={e._id} decision={e} />)
        ) : (
          <Container>
            <ContainerText style={{ margin: 0 }}>Решений для этой системы ещё нет</ContainerText>
          </Container>
        )
      ) : (
        <></>
      )}
      {selectedComment && isAuth && (
        <Container>
          <Button onClick={popupCreateDecision}>Добавить решение</Button>
        </Container>
      )}
    </>
  );
});

export default SearchDecisions;
