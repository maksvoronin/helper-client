import { observer } from "mobx-react";
import { PageProps } from "../@types";
import { FC } from "react";
import { MainLayout } from "../@layouts";
import { Container, ContainerText, ContainerTitle } from "../@shared";
import { useAuthStoreContext } from "../@store";
import { DecisionBlock } from "../@components";

const Liked: FC<PageProps> = observer(({ title }) => {
  const { user } = useAuthStoreContext();

  if (!user.likedDecisions) return <MainLayout title={title}></MainLayout>;

  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>Полезные решения</ContainerTitle>

        {user.likedDecisions.length === 0 ? (
          <ContainerText>Здесь хранится 0 решений, потому что Вы ничего не отметили полезным</ContainerText>
        ) : (
          <ContainerText>
            Здесь хранится {user.likedDecisions.length} решен{user.likedDecisions.length < 1 || user.likedDecisions.length > 4 ? "ий" : user.likedDecisions.length === 1 ? "ие" : "ия"}, котор
            {user.likedDecisions.length > 1 ? "ые" : "ое"} Вы отметили полезным{user.likedDecisions.length > 1 && "и"}
          </ContainerText>
        )}
        {user.likedDecisions.length < 1 ? <ContainerText>Чтобы добавить сюда решения, просто нажмите на сердечко в блоке решения</ContainerText> : <ContainerText>Чтобы удалить отсюда решение, нажмите на закрашенное сердце</ContainerText>}
      </Container>
      {user.likedDecisions.map((e) => (
        <DecisionBlock decision={e} key={e._id} />
      ))}
    </MainLayout>
  );
});

export default Liked;
