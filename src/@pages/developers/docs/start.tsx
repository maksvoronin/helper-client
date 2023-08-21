import { observer } from "mobx-react";
import { PageProps } from "../../../@types";
import { FC } from "react";
import { DevelopersLayout } from "../../../@layouts";
import { Code, DevTitle, FormText, Li, Link, Ul } from "../../../@shared";
import config, { baseURIs } from "../../../config";

const Start: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>Начало работы с API</DevTitle>
      <FormText>
        Чтобы начать работу с нашим API, Вам необходимо <Link to={`${baseURIs.developers}/apps/create`}>создать приложение</Link>. После, Вы получите токен, который должны будете указывать при работе с API.
      </FormText>
      <FormText>Для работы с HTTP API Вашим основным инструментом будет URI нашего API</FormText>
      <Code>{config.publicapi}/&lt;TokenApp&gt;/&lt;MethodName&gt;?&lt;params&gt;</Code>
      <FormText>
        Где <code>TokenApp</code> - токен вашего приложения, <code>MethodName</code> - метод из перечня методов ниже и <code>params</code> - параметры метода
      </FormText>
      <FormText>Список методов:</FormText>
      <Ul>
        <Li>
          <Link to={`${baseURIs.developers}/docs/methods/system`}>system</Link>
        </Li>
        <Li>
          <Link to={`${baseURIs.developers}/docs/methods/series`}>series</Link>
        </Li>
        <Li>
          <Link to={`${baseURIs.developers}/docs/methods/search`}>search</Link>
        </Li>
        <Li>
          <Link to={`${baseURIs.developers}/docs/methods/decision`}>decision</Link>
        </Li>
        <Li>
          <Link to={`${baseURIs.developers}/docs/methods/comment`}>comment</Link>
        </Li>
        <Li>
          <Link to={`${baseURIs.developers}/docs/methods/user`}>user</Link>
        </Li>
      </Ul>
    </DevelopersLayout>
  );
});

export default Start;
