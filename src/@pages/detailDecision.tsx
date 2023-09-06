import { FC, useEffect, useState } from "react";
import { PageProps, Decision, Response, Comment, User } from "../@types";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { MainLayout } from "../@layouts";
import $api from "../@http";
import { DecisionBlock } from "../@components";
import { Button, Container, ContainerText, ContainerTitle, ControlButton, Link } from "../@shared";
import { useAuthStoreContext, usePopupStoreContext } from "../@store";
import { EditCommentPopup } from "../@popups";
import { alert } from "../@services";
import { mdiHeart, mdiHeartOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { baseURIs } from "../config";
import NotFound from "./notfound";

const DetailDecision: FC<PageProps> = observer(({ title }) => {
  const { id } = useParams();
  const [decision, setDecision] = useState<Decision>({} as Decision);
  const [comment, setComment] = useState<Comment>();

  const { user, setUser, isAuth } = useAuthStoreContext();
  const { setVisible, setTitle, setContent } = usePopupStoreContext();

  const [commentLiked, setCommentLiked] = useState<boolean>(false);
  const newUser = user;

  useEffect(() => {
    if (id) {
      $api.get<Response<Decision>>(`/decision/get?id=${id}`).then(({ data }) => {
        setDecision(data.data!);
        setComment(data.data!.comment);
      });
    }
  }, [id]);

  useEffect(() => {
    if (user && user.subscribedComments && comment) {
      user.subscribedComments && user.subscribedComments.find((e) => e._id === comment._id) ? setCommentLiked(true) : setCommentLiked(false);
    }
  }, [user, comment]);

  if (!decision || !comment) return <NotFound />;

  const subComment = () => {
    $api.post<Response<User>>("/comment/subscribe", { id: decision.comment._id }).then(({ data }) => {
      if (!data.data) return alert("error", "Ошибка", data.message, 1.5);
      setCommentLiked(true);
      newUser.subscribedComments.push(comment);
      setUser(newUser);
    });
  };

  const unSubComment = () => {
    $api.post<Response<User>>("/comment/unsubscribe", { id: decision.comment._id }).then(({ data }) => {
      if (!data.data) return alert("error", "Ошибка", data.message, 1.5);
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
          <Link to={comment.by && `${baseURIs.main}/profile/${comment.by._id}`}>
            {comment.by && comment.by.name} {comment.by && comment.by.surname}
          </Link>
        </ContainerText>
        <ContainerText>Создано: {new Date(comment.created).toLocaleString("ru")}</ContainerText>
        {user && comment.by && (user._id === comment.by._id || user.permissions > 4) && (
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
        {isAuth ? (
          commentLiked ? (
            <ControlButton onClick={unSubComment} style={{marginTop: 15}}>
              <Icon path={mdiHeart} size={"18px"} />
              Не отслеживать замечание
            </ControlButton>
          ) : (
            <ControlButton onClick={subComment} style={{marginTop: 15}}>
              <Icon path={mdiHeartOutline} size={"18px"} />
              Отслеживать замечание
            </ControlButton>
          )
        ) : (
          <></>
        )}
      </Container>
      {decision && decision._id && <DecisionBlock decision={decision} />}
    </MainLayout>
  );
});

export default DetailDecision;
