import { observer } from "mobx-react";
import { PageProps, Comment, Response, User } from "../@types";
import { MainLayout } from "../@layouts";
import { FC, useEffect, useState } from "react";
import { Button, Container, ContainerText, ContainerTitle, Input, Link } from "../@shared";
import $api from "../@http";
import { useParams } from "react-router-dom";
import { DecisionBlock } from "../@components";
import { useAuthStoreContext, usePopupStoreContext } from "../@store";
import { alert } from "../@services/alerting.service";
import { mdiHeart, mdiHeartOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { styled } from "styled-components";

const EditComment: FC<{comment: Comment, setComment: any}> = observer(({comment, setComment}) => {
  const [text, setText] = useState<string>(comment.content);
  const { setVisible } = usePopupStoreContext();

  const sendData = () => {
    $api.put<Response<Comment>>("/comment/edit", {id: comment._id, comment: text}).then(({data}) => {
      if(data.type === "error") return alert("error", "Ошибка", String(data.data!), 15);
      setComment(data.data!);
      setVisible(false);
    })
  }

  return <>
    <Input value={text} onChange={({target}: any) => setText(target.value)} />
    <Button onClick={sendData}>Сохранить</Button>
  </>;
});

const ControlButton = styled.button`
  height: 40px;
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
  margin-top: 10px;
  &:hover {
    background-color: rgba(100, 100, 100, 0.1);
  }
  &:active {
    transform: scale(0.98);
  }
`;

const DetailComment: FC<PageProps> = observer(({ title }) => {
  const { id } = useParams();
  const [comment, setComment] = useState<Comment>();
  const { user, setUser } = useAuthStoreContext();
  const { setVisible, setTitle, setContent} = usePopupStoreContext();

  const [commentLiked, setCommentLiked] = useState<boolean>(false);

  useEffect(() => {
    $api.get<Response<Comment>>(`/comment/get?id=${id}`).then(({ data }) => {
      setComment(data.data!);
    });
    user._id && user.subscribedComments.find((e) => e._id === id) ? setCommentLiked(true) : setCommentLiked(false);
  }, [id]);

  if (!comment) return <></>;
  const newUser = user;

  const subComment = () => {
    $api.post<Response<User>>("/comment/subscribe", { id }).then(({ data }) => {
      if (!data.data) return alert("error", "Ошибка", data.message, 15);
      setCommentLiked(true);
      newUser.subscribedComments.push(comment);
      setUser(newUser);
    });
  };

  const unSubComment = () => {
    $api.post<Response<User>>("/comment/unsubscribe", { id }).then(({ data }) => {
      if (!data.data) return alert("error", "Ошибка", data.message, 15);
      setCommentLiked(false);
      newUser.subscribedComments.splice(
        newUser.subscribedComments.findIndex((e) => e === comment),
        1,
      );
      setUser(newUser);
    });
  };

  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>{comment.content}</ContainerTitle>
        <ContainerText>Система: {comment.system && comment.system.name}</ContainerText>
        <ContainerText>Серия: {comment.series && comment.series.name}</ContainerText>
        <ContainerText>Количество решений: {comment.decisions && comment.decisions.length}</ContainerText>
        <ContainerText>
          Автор:{" "}
          <Link to={`/profile/${comment.by._id}`}>
            {comment.by && comment.by.name} {comment.by && comment.by.surname}
          </Link>
        </ContainerText>
        <ContainerText>Создано: {new Date(comment.created).toLocaleString("ru")}</ContainerText>
        {(user._id === comment.by._id || user.permissions > 4) && <Button style={{ marginTop: 10 }} onClick={() => {
          setVisible(true);
          setTitle("Изменение замечания");
          setContent(<EditComment comment={comment} setComment={setComment} />)
        }}>Изменить замечание</Button>}
        {
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
        }
      </Container>
      {comment.decisions && comment.decisions.map((e) => <DecisionBlock decision={e} key={e._id} />)}
    </MainLayout>
  );
});

export default DetailComment;
