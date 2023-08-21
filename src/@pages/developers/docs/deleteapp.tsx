import { FC } from "react";
import { PageProps } from "../../../@types";
import { observer } from "mobx-react";
import { DevelopersLayout } from "../../../@layouts";
import { DevTitle, FormText } from "../../../@shared";

const DeleteApp: FC<PageProps> = observer(({title}) => {
  return <DevelopersLayout title={title}>
    <DevTitle>Удаление приложения</DevTitle>
    <FormText>Если Вы захотели удалить приложение по разным причинам, то это можно сделать на странице управления приложением, нажав кнопку «Удалить приложение».</FormText>
  </DevelopersLayout>
});

export default DeleteApp;