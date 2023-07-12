import { observer } from "mobx-react";
import { FC } from "react";
import { PageProps } from "../@types";
import { MainLayout } from "../@layouts";
import { CreateComment } from "../@widgets";
import { Container, ContainerTitle } from "../@shared";

const Comment: FC<PageProps> = observer(({ title }) => {
  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>Создание замечания</ContainerTitle>
        <CreateComment />
      </Container>
    </MainLayout>
  );
});

export default Comment;
