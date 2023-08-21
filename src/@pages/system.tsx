import { observer } from "mobx-react";
import { Comment, PageProps, Response, System } from "../@types";
import { FC, useEffect, useState } from "react";
import { MainLayout } from "../@layouts";
import { Container, ContainerSubTitle, ContainerText, ContainerTitle, FormText, Li, Link, Ul } from "../@shared";
import { useParams } from "react-router-dom";
import $api from "../@http";
import { baseURIs } from "../config";

const SystemPage: FC<PageProps> = observer(({ title }) => {
  const { id } = useParams();

  const [system, setSystem] = useState<System>();

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    $api.get<Response<System>>(`/system/get?id=${id}`).then(({ data }) => {
      setSystem(data.data);
    });
  }, [id]);

  useEffect(() => {
    if (system) {
      $api.get<Response<Comment[]>>(`/comment/system?id=${system?._id}`).then(({ data }) => {
        setComments(data.data!);
      });
    }
  }, [system]);

  if (!system) return (
    <MainLayout title="Система не найдена">
      <FormText>Система не найдена</FormText>
    </MainLayout>
  );;

  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>{system.name}</ContainerTitle>
        <ContainerText>
          {system.by.name} {system.by.surname}
        </ContainerText>
        <ContainerText>Дата создания: {new Date(system.created).toLocaleString("ru")}</ContainerText>
      </Container>
      {comments.map((e) => (
        <Container key={e._id}>
          <ContainerSubTitle>{e.content}</ContainerSubTitle>
          <Ul>
            {e.decisions.map((c) => (
              <Li key={c._id}>
                <Link to={`${baseURIs.main}/decision/${c._id}`}>
                  {c.content}
                </Link>
              </Li>
            ))}
          </Ul>
        </Container>
      ))}
    </MainLayout>
  );
});

export default SystemPage;
