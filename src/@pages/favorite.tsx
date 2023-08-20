import { FC } from "react";
import { PageProps } from "../@types";
import { MainLayout } from "../@layouts";
import { Container, ContainerSubTitle, ContainerText, ContainerTitle, Li, Link, Ul } from "../@shared";
import { useAuthStoreContext } from "../@store";
import { observer } from "mobx-react";
import { styled } from "styled-components";
import { baseURIs } from "../config";

const H3 = styled.h3`
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 18px;
  color: #444444;
`;

const Subscribed: FC<PageProps> = observer(({ title }) => {
  const { user } = useAuthStoreContext();

  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>Избранное</ContainerTitle>
        <ContainerText>То, что Вы выделили для себя</ContainerText>
      </Container>
      {user.subscribedSystems && user.subscribedSystems.length > 0 && (
        <Container>
          <ContainerSubTitle>Системы: {user.subscribedSystems.length}</ContainerSubTitle>
          <Ul>
            {user.subscribedSystems.map((e) => (
              <Li key={e._id}>
                <Link to={`${baseURIs.main}/system/${e._id}`}>{e.name}</Link>
              </Li>
            ))}
          </Ul>
        </Container>
      )}
      {user.subscribedComments && user.subscribedComments.length > 0 && (
        <Container>
          <ContainerSubTitle>Замечания: {user.subscribedComments.length}</ContainerSubTitle>
          {user.subscribedComments.map((e) => (
            <div key={e._id}>
              <Link to={`${baseURIs.main}/comment/${e._id}`}>
                <H3>{e.content}</H3>
              </Link>
              <Ul>
                {e.decisions.map((e) => (
                  <Li key={e._id}>
                    <Link to={`${baseURIs.main}/decision/${e._id}`}>{e.content}</Link>
                  </Li>
                ))}
              </Ul>
            </div>
          ))}
        </Container>
      )}
    </MainLayout>
  );
});

export default Subscribed;
