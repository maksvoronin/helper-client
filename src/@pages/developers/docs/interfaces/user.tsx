import { observer } from "mobx-react";
import { PageProps } from "../../../../@types";
import { FC } from "react";
import { DevelopersLayout } from "../../../../@layouts";
import { Code, DevTitle, FormText } from "../../../../@shared";

const UserInterface: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>Интерфейс user</DevTitle>
      <Code>
        {`
        interface User {
          _id: string;
          name: string;
          surname: string;
          email: string;
          permissions: number;
          isActivated: boolean;
          avatar: string;
          likedDecisions: Decision[];
          subscribedSystems: System[];
          subscribedComments: Comment[];
          createdSystems: System[];
          createdComments: Comment[];
          createdDecisions: Decision[];
          phone: string;
          background: Background;
          created: number;
          road: Road;
          work: string;
          rating: number;
          createdapps: Application[];
        }
        `}
      </Code>
      <FormText>
        <code>_id</code> - уникальный идентификатор пользователя, <code>name</code> - имя пользователя, <code>surname</code> - фамилия пользователя, <code>email</code> - почта пользователя, <code>permissions</code> -
        права пользователя (1 обычный пользователь - 5 администратор), <code>isActivated</code> - подтверждена ли почта у пользователя, <code>avatar</code> - ссылка на аватарку пользователя, <code>likedDecisions</code> -
        решения, которые пользователь отметил полезными, <code>subscribedSystem</code> - системы, которые пользователь выбрал отслеживать, <code>subscribedComments</code> - замечания, которые пользователь выбрал
        отслеживать, <code>createdSystems</code> - системы, созданные пользователем, <code>createdComments</code> - замечания, созданные пользователем, <code>createdDecisions</code> - решения, созданные пользователем,{" "}
        <code>phone</code> - номер телефона пользователя, <code>background</code> - фон, установленный у пользователя, <code>created</code> - дата создания аккаунта, <code>road</code> - дорога пользователя,{" "}
        <code>work</code> - предприятие пользователя, <code>rating</code> - количество рейтинга у пользователя, <code>createdapps</code> - приложения, созданные пользователем
      </FormText>
    </DevelopersLayout>
  );
});

export default UserInterface;
