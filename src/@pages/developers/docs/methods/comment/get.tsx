import { FC } from "react";
import { PageProps } from "../../../../../@types";
import { observer } from "mobx-react";
import { DevelopersLayout } from "../../../../../@layouts";
import { Code, DevTitle, FormText } from "../../../../../@shared";
import config from "../../../../../config";

const GetComment: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>О методе comment / get</DevTitle>
      <FormText>Метод возвращает одно замечание по уникальному <code>id</code></FormText>
      <FormText>Пример запроса:</FormText>
      <Code>{config.publicapi}/&lt;TokenApp&gt;/comment/get?id=647b36883c463aa636dbfc9c</Code>
      <FormText>Пример ответа:</FormText>
      <Code>
        {`
        {
          "status": "ok",
          "message": "Замечание получено",
          "data": { ... Comment } } `}
      </Code>
    </DevelopersLayout>
  );
});

export default GetComment;
