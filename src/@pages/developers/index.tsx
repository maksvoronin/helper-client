import { observer } from "mobx-react";
import { PageProps } from "../../@types";
import { FC } from "react";
import { DevelopersLayout } from "../../@layouts";
import { DevTitle, FormText, Link } from "../../@shared";
import { baseURIs } from "../../config";

const Developers: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>Добро пожаловать на платформу для разработчиков Helper</DevTitle>
      <FormText>
        Здесь Вы можете изучить <Link to={`${baseURIs.developers}/docs/start`}>как начать пользоваться</Link> нашим API в своих проектах, методы и{" "}
        <Link to={`${baseURIs.developers}/interfaces`}>интерфейсы возвращаемых данных</Link>
      </FormText>
      <FormText>Основная навигация находится в сайдбаре слева</FormText>
    </DevelopersLayout>
  );
});

export default Developers;
