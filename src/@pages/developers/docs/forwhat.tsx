import { FC } from "react";
import { PageProps } from "../../../@types";
import { observer } from "mobx-react";
import { DevelopersLayout } from "../../../@layouts";
import { DevTitle, FormText, Link } from "../../../@shared";
import { baseURIs } from "../../../config";

const ForWhat: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>Для чего это нужно?</DevTitle>
      <FormText>Создание приложения нужно для чистоты работы с нашим API: мы видели, что сервис не используется в негативным целях; пользователи видели кому они дают доступ к своим данным; Вы видели статистику по приложению</FormText>
      <FormText>Также <Link to={`${baseURIs.developers}/apps/create`}>создание приложения</Link> даёт Вам возможность разделять разные приложения под своим цели: создание виджета на сайт или в приложении, чат-бота и др.</FormText>
    </DevelopersLayout>
  );
});

export default ForWhat;
