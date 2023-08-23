import { observer } from "mobx-react";
import { DevelopersLayout } from "../../../../../@layouts";
import { PageProps } from "../../../../../@types";
import { FC } from "react";
import { Code, DevTitle, FormText } from "../../../../../@shared";
import config from "../../../../../config";

const SystemGet: FC<PageProps> = observer(({title}) => {
  return <DevelopersLayout title={title}>
    <DevTitle>О методе system / get</DevTitle>
    <FormText>Метод возвращает одну систему по уникальному <code>id</code></FormText>
    <FormText>Пример запроса:</FormText>
    <Code>{config.publicapi}/&lt;TokenApp&gt;/system/get?id=647b36623c463aa636dbfc80</Code>
    <FormText>Пример ответа:</FormText>
    <Code>
      {
        `
        {
          "status": "ok",
          "message": "Система получена",
          "data": {
              ...System
          }
      }`
      }
    </Code>
    <FormText>Возможные ошибки: не указана / не найдена система</FormText>
  </DevelopersLayout>
});

export default SystemGet;