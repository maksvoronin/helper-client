import { FC } from "react";
import { PageProps } from "../../../../../@types";
import { observer } from "mobx-react";
import { Code, DevTitle, FormText } from "../../../../../@shared";
import { DevelopersLayout } from "../../../../../@layouts";
import config from "../../../../../config";

const UserDecision: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>О методе decision / user</DevTitle>
      <FormText>
        Метод возвращает массив решений от пользователя по идентификатору <code>id</code>
      </FormText>
      <FormText>Пример запроса:</FormText>
      <Code>{config.publicapi}/&lt;TokenApp&gt;/decision/user?id=647b32993c463aa636dbfc5a</Code>
      <FormText>Пример ответа:</FormText>
      <Code>
        {`
        {
          "status": "ok",
          "message": "Решения получены",
          "data": [
            { ... Decision },
            { ... Decision },
            { ... Decision },
            `}
      </Code>
    </DevelopersLayout>
  );
});

export default UserDecision;