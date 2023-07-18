import { observer } from "mobx-react";
import { PageProps, Comment, Response } from "../@types";
import { MainLayout } from "../@layouts";
import { FC, useEffect, useState } from "react";
import { Container, ContainerText, ContainerTitle } from "../@shared";
import $api from "../@http";
import { useParams } from "react-router-dom";
import { DecisionBlock } from "../@components";

const DetailComment: FC<PageProps> = observer(({title}) => {

  const {id} = useParams();
  const [comment, setComment] = useState<Comment>();

  useEffect(() => {
    $api.get<Response<Comment>>(`/comment/get?id=${id}`).then(({data}) => {
      setComment(data.data!);
    })
  }, [id]);

  if(!comment) return <></>;

  return <MainLayout title={title}>
    <Container>
      <ContainerTitle>{comment.content}</ContainerTitle>
      <ContainerText>Система: {comment.system && comment.system.name}</ContainerText>
      <ContainerText>Серия: {comment.series && comment.series.name}</ContainerText>
      <ContainerText>Количество решений: {comment.decisions && comment.decisions.length}</ContainerText>
      <ContainerText>Автор: {comment.by && comment.by.name} {comment.by && comment.by.surname}</ContainerText>
      <ContainerText>Создано: {new Date(comment.created).toLocaleString("ru")}</ContainerText>
    </Container>
    {
      comment.decisions && comment.decisions.map(e => <DecisionBlock decision={e} key={e._id} />)
    }
  </MainLayout>
});

export default DetailComment;