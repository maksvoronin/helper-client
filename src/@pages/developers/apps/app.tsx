import { observer } from "mobx-react";
import { Application, PageProps, Response } from "../../../@types";
import { DevelopersLayout } from "../../../@layouts";
import { FC, useEffect, useState } from "react";
import $api from "../../../@http";
import { useParams } from "react-router-dom";
import { alert } from "../../../@services";
import { Button, DevTitle, FormText, Input } from "../../../@shared";
import { styled } from "styled-components";

const AppText = styled.p`
  margin-top: 0px;
  font-size: 14px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
`;

const DeleteButton = styled(Button)`
  background: #ff4747;
`;

const EnableText = styled(AppText)`
  color: green;
`

const DisableText = styled(AppText)`
  color: #ff4747;
`

const App: FC<PageProps> = observer(({ title }) => {
  const { id } = useParams();
  const [app, setApp] = useState<Application>();
  const [visibleToken, setVisibleToken] = useState<boolean>(false);

  useEffect(() => {
    $api.get<Response<Application>>(`/application/get?id=${id}`).then(({ data }) => {
      if (!data.data) return alert("error", "Ошибка", data.message);
      setApp(data.data);
    });
  }, [id]);

  if (!app) return <></>;

  return (
    <DevelopersLayout title={`${title} ${app.name}`}>
      <DevTitle>{app.name}</DevTitle>
      <FormText>Описание</FormText>
      <AppText>{app.description}</AppText>
      <FormText>Статус</FormText>
      {app.status ? <EnableText>Работает</EnableText> : <DisableText>Не работает</DisableText>}
      <FormText>Использование</FormText>
      <AppText>{app.usage}</AppText>
      <FormText>Токен</FormText>
      <Row>
        <Input type={visibleToken ? "text" : "password"} value={app.token} readOnly />
        <Button onClick={() => setVisibleToken((prev) => !prev)}>{visibleToken ? "Скрыть" : "Показать"}</Button>
      </Row>
      <Button style={{ marginTop: 10 }}>Изменить приложение</Button>
      <DeleteButton style={{ marginTop: 10 }}>Удалить приложение</DeleteButton>
    </DevelopersLayout>
  );
});

export default App;
