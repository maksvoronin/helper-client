import { FC } from "react";
import { PageProps } from "../../../../../@types";
import { observer } from "mobx-react";
import { DevelopersLayout } from "../../../../../@layouts";
import { Code, DevTitle, FormText } from "../../../../../@shared";
import config from "../../../../../config";

const AllDecision: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>О методе decision / all</DevTitle>
      <FormText>Метод возвращает массив замечаний</FormText>
      <FormText>Пример запроса:</FormText>
      <Code>{config.publicapi}/&lt;TokenApp&gt;/decision/all</Code>
      <FormText>Пример ответа:</FormText>
      <Code>
        {`
          {
            "status": "ok",
            "message": "Решения получены",
            "data": [{ ...Decision }, { ...Decision }]
          }
        `}
      </Code>
    </DevelopersLayout>
  );
});

export default AllDecision;
