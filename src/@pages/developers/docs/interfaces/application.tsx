import { observer } from "mobx-react";
import { PageProps } from "../../../../@types";
import { FC } from "react";
import { DevelopersLayout } from "../../../../@layouts";
import { Code, DevTitle, FormText } from "../../../../@shared";

const ApplicationInterface: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>Интерфейс road</DevTitle>
      <Code>
        {`
        interface Application {
          _id: string;
          name: string;
          description: string;
          owner: User;
          usage: string;
          token: string;
          status: boolean;
          joinURI?: string;
        }
        `}
      </Code>
      <FormText>
        <code>_id</code> - идентификатор приложения, <code>name</code> - название приложения, <code>description</code> - описание приложения, <code>owner</code> - создатель приложения, <code>usage</code> - использование
        приложения, <code>token</code> - токен приложения, <code>status</code> - работает ли приложение, <code>joinURI</code> - ссылка для авторизации пользователей
      </FormText>
    </DevelopersLayout>
  );
});

export default ApplicationInterface;
