import { observer } from "mobx-react";
import { DevelopersLayout } from "../../../../../@layouts";
import { PageProps } from "../../../../../@types";
import { FC } from "react";
import { Code, DevTitle, FormText } from "../../../../../@shared";
import config from "../../../../../config";

const SystemAll: FC<PageProps> = observer(({title}) => {
  return <DevelopersLayout title={title}>
    <DevTitle>О методе system / all</DevTitle>
    <FormText>Метод возвращает полный список систем</FormText>
    <FormText>Пример запроса:</FormText>
    <Code>{config.publicapi}/&lt;TokenApp&gt;/system/all</Code>
    <FormText>Пример ответа:</FormText>
    <Code>
      {
        `{
          "status": "ok",
          "message": "Системы получены",
          "data": [
              { ...System }, { ...System }
          ]
      }`
      }
    </Code>
  </DevelopersLayout>
});

export default SystemAll;