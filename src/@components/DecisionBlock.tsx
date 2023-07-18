import { observer } from "mobx-react";
import { FC, createRef, useEffect, useState } from "react";
import { Button, Container, FileLabel, Input, InputFile } from "../@shared";
import { Decision, Response } from "../@types";
import { styled } from "styled-components";
import Icon from "@mdi/react";
import { mdiHeart, mdiHeartOutline, mdiPencil } from "@mdi/js";
import { Commentaries } from "../@widgets";
import config from "../config";
import { Link } from "react-router-dom";
import { useAuthStoreContext, usePopupStoreContext } from "../@store";
import $api from "../@http";
import { alert } from "../@services/alerting.service";

const DecisionText = styled.p`
  margin: 0;
  padding: 0;
`;

const UserInfo = styled.div`
  display: flex;
  border-top: 1px solid #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-style: italic;
  color: #565656;
  font-weight: 500;
  justify-content: space-between;
  align-items: center;
  p {
    margin: 0;
    padding: 0;
    display: flex;
    gap: 6px;
    a {
      text-decoration: none;
      color: var(--accentColor);
      &:hover {
        text-decoration: underline;
      }
    }
    @media (max-width: 1000px) {
      font-size: 14px;
    }
  }
`;

const DecisionAttachement = styled.div`
  margin-top: 5px;
`;

const LikeButton = styled.button`
  margin: 0;
  background: transparent;
  border: none;
  transition: background 0.2s, transform 0.2s;
  padding: 4px 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(100, 100, 100, 0.1);
  }
  &:active {
    transform: scale(0.94);
  }
`;

const AttachmentVideo = styled.video`
  max-width: 100%;
`;

const AttachmentImage = styled.img`
  max-width: 100%;
`;

const AttachmentLink = styled.a`
  text-decoration: none;
  color: var(--accentColor);
  &:hover {
    text-decoration: underline;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const extname = (filename: string): string => {
  return `.${filename.split(".").pop()}` || "";
};

const EditDecision: FC<{ decision: Decision, setDecision: any }> = observer(({ decision, setDecision }) => {
  const { setVisible } = usePopupStoreContext();
  const [text, setText] = useState<string>(decision.content);
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
    $api.put<Response<Decision>>("/decision/edit", {id: decision._id, content: text, file: uploadedFile}).then(({data}) => {
      if(data.type === "error" || typeof data.data === "string") return alert("error", "Ошибка", String(data.data!), 15);
      alert("default", "Успешно", "Решение изменено", 15);
      setDecision(data.data);
      setVisible(false);
    })
  }

  return (
    <>
      <Input placeholder="Текст решения" value={text} onChange={({ target }: any) => setText(target.value)} />
      <FileLabel
        htmlFor="file"
        onClick={(e: any) => {
          fileName && unlinkFile(e);
        }}
      >
        {fileName ? `Открепить файл ${uploadedFile}` : "Прикрепить другой файл к решению"}
      </FileLabel>
      <InputFile type={"file"} id="file" onChange={({ target }: any) => setFileName(target.value)} ref={fileInput} />
      <Button onClick={sendData}>Сохранить</Button>
    </>
  );
});

const DecisionBlock: FC<{ decision: Decision }> = observer(({ decision }) => {
  const { user, setUser } = useAuthStoreContext();
  const { setTitle, setVisible, setContent } = usePopupStoreContext();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [newDecision, setNewDecision] = useState<Decision>(decision);
  const newUser = user;

  useEffect(() => {
    if (user.likedDecisions) user.likedDecisions.length > 0 && setIsLiked(user.likedDecisions.includes(decision));
  }, [user, decision]);

  const like = () => {
    $api.post<Response>(`/decision/like`, { id: decision._id }).then(({ data }) => {
      if (data.type === "error") return alert("error", "Произошла ошибка", data.message, 15);
      newUser.likedDecisions.push(decision);
      setUser(newUser);
      setIsLiked(true);
    });
  };

  const dislike = () => {
    $api.post<Response>(`/decision/unlike`, { id: decision._id }).then(({ data }) => {
      if (data.type === "error") return alert("error", "Произошла ошибка", data.message, 15);
      newUser.likedDecisions.splice(user.likedDecisions.indexOf(decision), 1);
      setUser(newUser);
      setIsLiked(false);
    });
  };

  return (
    <Container>
      <DecisionText>{newDecision.content}</DecisionText>
      {newDecision.file && (
        <DecisionAttachement>
          {config.imageExt.includes(extname(newDecision.file)) ? (
            <AttachmentImage src={`${config.fileHost}/${newDecision.file}`} />
          ) : config.videoExt.includes(extname(newDecision.file)) ? (
            <AttachmentVideo src={`${config.fileHost}/${newDecision.file}`} controls />
          ) : (
            <AttachmentLink href={`${config.fileHost}/${newDecision.file}`} target="_blank">
              Прикрепленный файл
            </AttachmentLink>
          )}
        </DecisionAttachement>
      )}
      <UserInfo>
        <p>
          <Link to={`/profile/${decision.by && decision.by._id}`}>
            {decision.by && decision.by.name} {decision.by && decision.by.surname}
          </Link>
          • {new Date(newDecision.created).toLocaleString("ru")}
        </p>
        <ButtonContainer>
          {user._id ? (
            (user._id === newDecision.by._id || user.permissions > 4) && (
              <LikeButton
                onClick={() => {
                  setTitle("Изменение решения");
                  setVisible(true);
                  setContent(<EditDecision decision={newDecision} setDecision={setNewDecision} />);
                }}
              >
                <Icon path={mdiPencil} size="16px" />
              </LikeButton>
            )
          ) : (
            <>t</>
          )}
          {user._id ? (
            isLiked ? (
              <LikeButton onClick={dislike}>
                <Icon path={mdiHeart} size={"16px"} />
              </LikeButton>
            ) : (
              <LikeButton onClick={like}>
                <Icon path={mdiHeartOutline} size={"16px"} />
              </LikeButton>
            )
          ) : (
            <></>
          )}
        </ButtonContainer>
      </UserInfo>
      <Commentaries type="decision" postId={newDecision._id} comments={newDecision.comments} />
    </Container>
  );
});

export default DecisionBlock;
