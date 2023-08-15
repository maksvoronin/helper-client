import { observer } from "mobx-react";
import { Comment, Decision, PageProps, User } from "../@types";
import { FC, useEffect, useState } from "react";
import { MainLayout } from "../@layouts";
import { Container, ContainerSubTitle, Li, Link, Ul } from "../@shared";
import { useParams } from "react-router-dom";
import $api from "../@http";
import { alert } from "../@services/alerting.service";
import { styled } from "styled-components";
import config from "../config";
import { DecisionBlock } from "../@components";

const UserGrid = styled.div`
  display: flex;
  align-items: center;

  @media(max-width: 500px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
  }
`;

const Avatar = styled.div`
  width: 128px;
  height: 128px;
  background-color: #999;
  border-radius: 500px;
  background-position: center;
  background-size: cover;
  display: block;
  position: relative;
  margin-right: 20px;
  cursor: pointer;
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: var(--primaryText);

  h1 {
    font-size: 24px;
    margin: 0;
    padding: 0;
  }
  p {
    margin: 0;
    padding: 0;
  }
`;

const Profile: FC<PageProps> = observer(({ title }) => {
  const { id } = useParams();
  const [user, setUser] = useState<User>({} as User);

  const [comments, setComments] = useState<any>();
  const [decisions, setDecisions] = useState<any>();

  useEffect(() => {
    $api.get(`/user/get?id=${id}&params=created,permissions,createdDecisions,createdComments`).then(({ data }) => {
      if (data.type === "error") {
        return alert("error", "Ошибка", data.message, 1.5);
      }
      setUser(data.data);
    });

    $api.get(`/comment/user?id=${id}`).then(({ data }) => {
      setComments(data.data);
      console.log(data.data);
    });

    $api.get(`/decision/user?id=${id}`).then(({ data }) => {
      setDecisions(data.data);
    });
  }, [id]);

  return (
    <MainLayout title={title}>
      <Container>
        <UserGrid>
          <Avatar style={{ backgroundImage: user && user.avatar && `url(${config.fileHost}/${user.avatar})` }} onClick={() => user && window.open(`${config.fileHost}/${user.avatar}`)} />
          <Texts>
            <h1>
              {user.name} {user.surname}
            </h1>
            <p>{user && `${user.permissions > 2 ? "Администратор" : "Пользователь"} / ${new Date(user.created).toLocaleString()}`}</p>
            <p>{comments && decisions && `Замечаний: ${comments.length}, решений: ${decisions.length}`}</p>
          </Texts>
        </UserGrid>
      </Container>
      {comments && comments.length > 0 && (
        <Container>
          <ContainerSubTitle>Замечания</ContainerSubTitle>
          <Ul>
            {comments &&
              comments.map((e: Comment) => (
                <Li key={e._id}>
                  <Link to={`/comment/${e._id}`}>{e.content}</Link>
                </Li>
              ))}
          </Ul>
        </Container>
      )}
      {decisions && decisions.map((e: Decision) => <DecisionBlock key={e._id} decision={e} />)}
    </MainLayout>
  );
});

export default Profile;
