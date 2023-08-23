import { FC } from "react";
import { PageProps } from "../../../../../@types";
import { observer } from "mobx-react";
import { Code, DevTitle, FormText } from "../../../../../@shared";
import { DevelopersLayout } from "../../../../../@layouts";
import config from "../../../../../config";

const SystemComment: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>О методе comment / system</DevTitle>
      <FormText>
        Метод возвращает массив замечаний по системе по идентификатору <code>id</code>
      </FormText>
      <FormText>Пример запроса:</FormText>
      <Code>{config.publicapi}/&lt;TokenApp&gt;/comment/system?id=647b32993c463aa636dbfc5a</Code>
      <FormText>Пример ответа:</FormText>
      <Code>
        {`
        {
          "status": "ok",
          "message": "Замечания по системе получены",
          "data": [
            { ... Comment },
            { ... Comment },
            { ... Comment },
            `}
      </Code>
    </DevelopersLayout>
  );
});

export default SystemComment;