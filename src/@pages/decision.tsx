import { observer } from "mobx-react";
import { PageProps } from "../@types";
import { FC } from "react";
import { MainLayout } from "../@layouts";
import { Container, ContainerTitle } from "../@shared";

const Decision: FC<PageProps> = observer(({ title }) => {
  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>Создание решения</ContainerTitle>
      </Container>
    </MainLayout>
  );
});

export default Decision;
