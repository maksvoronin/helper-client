import { FC } from "react";
import { PageProps } from "../../../../../@types";
import { observer } from "mobx-react";
import { DevelopersLayout } from "../../../../../@layouts";
import { Code, DevTitle, FormText } from "../../../../../@shared";
import config from "../../../../../config";

const AllComment: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>О методе comment / all</DevTitle>
      <FormText>Метод возвращает массив замечаний</FormText>
      <FormText>Пример запроса:</FormText>
      <Code>{config.publicapi}/&lt;TokenApp&gt;/comment/all</Code>
      <FormText>Пример ответа:</FormText>
      <Code>
        {`
          {
            "status": "ok",
            "message": "Замечания получены",
            "data": [{ ...Comment }, { ...Comment }]
          }
        `}
      </Code>
    </DevelopersLayout>
  );
});

export default AllComment;
