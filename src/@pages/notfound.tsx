import { observer } from "mobx-react";
import { FC } from "react";
import { MainLayout } from "../@layouts";
import { Container, ContainerTitle } from "../@shared";

const NotFound: FC = observer(() => {
  return (
    <MainLayout title="Страница не найдена">
      <Container>
        <ContainerTitle>Страница не найдена</ContainerTitle>
      </Container>
    </MainLayout>
  );
});

export default NotFound;
