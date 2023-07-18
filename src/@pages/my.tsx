import { observer } from "mobx-react";
import { PageProps } from "../@types";
import { MainLayout } from "../@layouts";
import { FC } from "react";
import { Container, ContainerSubTitle, ContainerText, ContainerTitle, Li, Ul } from "../@shared";
import { useAuthStoreContext } from "../@store";
import { Link } from "../@shared";

const My: FC<PageProps> = observer(({ title }) => {
  const { user } = useAuthStoreContext();

  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>Мои данные</ContainerTitle>
        <ContainerText>То, чем Вы помогли своим коллегам</ContainerText>
      </Container>
      {user.createdSystems && user.createdSystems.length > 0 && (
        <Container>
          <ContainerSubTitle>Системы: {user.createdSystems.length}</ContainerSubTitle>
          <Ul>
            {user.createdSystems.map((e) => (
              <Li key={e._id}>
                <Link to={`/system/${e._id}`}>
                  {e.name}
                </Link>
              </Li>
            ))}
          </Ul>
        </Container>
      )}
      {user.createdComments && user.createdComments.length > 0 && (
        <Container>
          <ContainerSubTitle>Замечания: {user.createdComments.length}</ContainerSubTitle>
          <Ul>
            {user.createdComments.map((e) => (
              <Li key={e._id}>
                <Link to={`/comment/${e._id}`}>
                  {e.content}
                </Link>
              </Li>
            ))}
          </Ul>
        </Container>
      )}
      {user.createdDecisions && user.createdDecisions.length > 0 && (
        <Container>
          <ContainerSubTitle>Решения: {user.createdDecisions.length}</ContainerSubTitle>
          <Ul>
            {user.createdDecisions.map((e) => (
              <Li key={e._id}>
                <Link to={`/decision/${e._id}`}>
                  {e.content}
                </Link>
              </Li>
            ))}
          </Ul>
        </Container>
      )}
    </MainLayout>
  );
});

export default My;
