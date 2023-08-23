import { FC } from "react";
import { PageProps } from "../../../../../@types";
import { observer } from "mobx-react";
import { DevelopersLayout } from "../../../../../@layouts";
import { Code, DevTitle, FormText } from "../../../../../@shared";
import config from "../../../../../config";

const GetDecision: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>О методе decision / get</DevTitle>
      <FormText>Метод возвращает одно решение по уникальному <code>id</code></FormText>
      <FormText>Пример запроса:</FormText>
      <Code>{config.publicapi}/&lt;TokenApp&gt;/decision/get?id=647b36883c463aa636dbfca3</Code>
      <FormText>Пример ответа:</FormText>
      <Code>
        {`
        {
          "status": "ok",
          "message": "Решение получено",
          "data": { ... Decision } } `}
      </Code>
    </DevelopersLayout>
  );
});

export default GetDecision;
