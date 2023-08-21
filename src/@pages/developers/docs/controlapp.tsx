import { FC } from "react";
import { PageProps } from "../../../@types";
import { observer } from "mobx-react";
import { DevelopersLayout } from "../../../@layouts";
import { DevTitle, FormText, Link } from "../../../@shared";
import { baseURIs } from "../../../config";

const ControlApp: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>Управление приложением</DevTitle>
      <FormText>
        После создания приложения Вам доступно управление им, чтобы перейти к нему - выберите желаемое приложение на странице с <Link to={`${baseURIs.developers}/apps`}>созданными Вами проектами</Link> или в сайдбаре слева в разделе «Приложения» и нажмите кнопку
        «Изменить».
      </FormText>
      <FormText>Там Вы можете изменить все параметры приложения, запустить его или выключить, регенерировать токен, если тот стал доступен в публичном доступе.</FormText>
      <FormText>Чтобы приложение работало, оно обязательно должно быть в статусе «Работает». Изменить это можно так же в настройках приложения.</FormText>
    </DevelopersLayout>
  );
});

export default ControlApp;
