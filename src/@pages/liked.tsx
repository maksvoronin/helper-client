import { observer } from "mobx-react";
import { PageProps } from "../@types";
import { FC } from "react";
import { MainLayout } from "../@layouts";
import { Container, ContainerTitle, FormText } from "../@shared";
import { styled } from "styled-components";
import { useAuthStoreContext } from "../@store";
import { DecisionBlock } from "../@components";

const Text = styled(FormText)`
  text-align: center;
`;

const Liked: FC<PageProps> = observer(({ title }) => {
  const { user } = useAuthStoreContext();

  if (!user.likedDecisions) return <MainLayout title={title}></MainLayout>;

  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>Полезные решения</ContainerTitle>

        {user.likedDecisions.length === 0 ? (
          <Text>Здесь хранится 0 решений, потому что Вы ничего не отметили полезным</Text>
        ) : (
          <Text>
            Здесь хранится {user.likedDecisions.length} решен{user.likedDecisions.length < 1 || user.likedDecisions.length > 4 ? "ий" : user.likedDecisions.length === 1 ? "ие" : "ия"}, котор
            {user.likedDecisions.length > 1 ? "ые" : "ое"} Вы отметили полезным{user.likedDecisions.length > 1 && "и"}
          </Text>
        )}
        {user.likedDecisions.length < 1 ? <Text>Чтобы добавить сюда решения, просто нажмите на сердечко в блоке решения</Text> : <Text>Чтобы удалить отсюда решение, нажмите на закрашенное сердце</Text>}
      </Container>
      {user.likedDecisions.map((e) => (
        <DecisionBlock decision={e} key={e._id} />
      ))}
    </MainLayout>
  );
});

export default Liked;
