import { observer } from "mobx-react";
import { PageProps } from "../@types";
import { FC } from "react";
import { MainLayout } from "../@layouts";
import { Container, ContainerTitle } from "../@shared";
import { CreateDecision } from "../@widgets";

const Decision: FC<PageProps> = observer(({ title }) => {
  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>Создание решения</ContainerTitle>
        <CreateDecision />
      </Container>
    </MainLayout>
  );
});

export default Decision;
