import { FC } from "react";
import { PageProps } from "../@types";
import { MainLayout } from "../@layouts";
import { Container, ContainerTitle } from "../@shared";

const Subscribed: FC<PageProps> = ({ title }) => {
  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>Отслеживаемое</ContainerTitle>
      </Container>
    </MainLayout>
  );
};

export default Subscribed;
