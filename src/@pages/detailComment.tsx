import { observer } from "mobx-react";
import { PageProps, Comment, Response, User } from "../@types";
import { MainLayout } from "../@layouts";
import { FC, useEffect, useState } from "react";
import { Button, Container, ContainerText, ContainerTitle, ControlButton, FormText, Link } from "../@shared";
import $api from "../@http";
import { useParams } from "react-router-dom";
import { DecisionBlock } from "../@components";
import { useAuthStoreContext, usePopupStoreContext } from "../@store";
import { alert } from "../@services/alerting.service";
import { mdiHeart, mdiHeartOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { EditCommentPopup } from "../@popups";
import { baseURIs } from "../config";

const DetailComment: FC<PageProps> = observer(({ title }) => {
  const { id } = useParams();
  const [comment, setComment] = useState<Comment>();
  const { user, setUser, isAuth } = useAuthStoreContext();
  const { setVisible, setTitle, setContent } = usePopupStoreContext();

  const [commentLiked, setCommentLiked] = useState<boolean>(false);

  useEffect(() => {
    $api.get<Response<Comment>>(`/comment/get?id=${id}`).then(({ data }) => {
      setComment(data.data!);
    });
  }, [id]);

  useEffect(() => {
    if (user && user.subscribedComments && comment) {
      user.subscribedComments.find((e) => e._id === comment._id) ? setCommentLiked(true) : setCommentLiked(false);
    }
  }, [user, comment]);

  if (!comment)
    return (
      <MainLayout title="Замечание не найдено">
        <FormText>Замечание не найдено</FormText>
      </MainLayout>
    );
  const newUser = user;

  const subComment = () => {
    $api.post<Response<User>>("/comment/subscribe", { id }).then(({ data }) => {
      if (!data.data) return alert("error", "Ошибка", data.message, 1.5);
      setCommentLiked(true);
      newUser.subscribedComments.push(comment);
      setUser(newUser);
      alert("default", "Успешно", "Замечание отслеживается", 1.5);
    });
  };

  const unSubComment = () => {
    $api.post<Response<User>>("/comment/unsubscribe", { id }).then(({ data }) => {
      if (!data.data) return alert("error", "Ошибка", data.message, 1.5);
      setCommentLiked(false);
      newUser.subscribedComments.splice(
        newUser.subscribedComments.findIndex((e) => e === comment),
        1,
      );
      setUser(newUser);
      alert("default", "Успешно", "Замечание больше не отслеживается", 1.5);
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
          <Link to={`${baseURIs.main}/profile/${comment.by._id}`}>
            {comment.by && comment.by.name} {comment.by && comment.by.surname}
          </Link>
        </ContainerText>
        <ContainerText>Создано: {new Date(comment.created).toLocaleString("ru")}</ContainerText>
        {(user._id === comment.by._id || user.permissions > 4) && (
          <Button
            style={{ marginTop: 10 }}
            onClick={() => {
              setVisible(true);
              setTitle("Изменение замечания");
              setContent(<EditCommentPopup comment={comment} setComment={setComment} />);
            }}
          >
            Изменить замечание
          </Button>
        )}
        {isAuth ? commentLiked ? (
          <ControlButton onClick={unSubComment} style={{marginTop: 15}}>
            <Icon path={mdiHeart} size={"18px"} />
            Не отслеживать замечание
          </ControlButton>
        ) : (
          <ControlButton onClick={subComment} style={{marginTop: 15}}>
            <Icon path={mdiHeartOutline} size={"18px"} />
            Отслеживать замечание
          </ControlButton>
        ) : <></>}
      </Container>
      {comment.decisions && comment.decisions.map((e) => <DecisionBlock decision={e} key={e._id} />)}
    </MainLayout>
  );
});

export default DetailComment;
