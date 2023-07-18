import { observer } from "mobx-react";
import { PageProps, Comment, Response } from "../@types";
import { MainLayout } from "../@layouts";
import { FC, useEffect, useState } from "react";
import { Button, Container, ContainerText, ContainerTitle, Input, Link } from "../@shared";
import $api from "../@http";
import { useParams } from "react-router-dom";
import { DecisionBlock } from "../@components";
import { useAuthStoreContext, usePopupStoreContext } from "../@store";
import { alert } from "../@services/alerting.service";

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

const DetailComment: FC<PageProps> = observer(({ title }) => {
  const { id } = useParams();
  const [comment, setComment] = useState<Comment>();
  const { user } = useAuthStoreContext();
  const { setVisible, setTitle, setContent} = usePopupStoreContext();

  useEffect(() => {
    $api.get<Response<Comment>>(`/comment/get?id=${id}`).then(({ data }) => {
      setComment(data.data!);
    });
  }, [id]);

  if (!comment) return <></>;

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
      </Container>
      {comment.decisions && comment.decisions.map((e) => <DecisionBlock decision={e} key={e._id} />)}
    </MainLayout>
  );
});

export default DetailComment;
