import { FC } from "react";
import { PageProps } from "../../../@types";
import { observer } from "mobx-react";
import { DevelopersLayout } from "../../../@layouts";
import { Code, DevTitle, FormText } from "../../../@shared";

const Response: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>Ответы сервера</DevTitle>
      <FormText>Ответы сервера имеют интерфейс</FormText>
      <Code>{`
    interface PublicAPIResponse<T = {}> {
      status: "ok" | "error";
      message: string;
      data: T;
    }
    `}</Code>
      <FormText>Соответственно, если произошла какая-либо ошибка, то сервер по ключу <code>status</code> вернёт <code>error</code> и укажет сообщение в поле <code>message</code>.</FormText>
      <FormText>Если же запрос выполнен успешно, то <code>status</code> будет <code>ok</code>, в <code>message</code> будет возвращено «Запрос выполнен», а в <code>data</code> будет возвращен объект данных (или массив) в соответствии с запросом. На странице каждого класса указана схема возвращаемых данных</FormText>
    </DevelopersLayout>
  );
});

export default Response;
