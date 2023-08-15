import { FC, useState } from "react";
import { PageProps, JournalMove, Response } from "../../../@types";
import { observer } from "mobx-react";
import { MainLayout } from "../../../@layouts";
import { Button, Container, ContainerTitle, Input } from "../../../@shared";
import { alert } from "../../../@services/alerting.service";
import $api from "../../../@http";

const JournalMoveCreate: FC<PageProps> = observer(({title}) => {

  const [name, setName] = useState<string>("");

  const sendData = () => {
    if(!name) return alert("error", "Заполните форму", "Укажите название", 1.5);
    $api.post<Response<JournalMove>>("/journalmove/create", {title: name}).then(() => {
      alert("default", "Успешно", "Действие добавлено", 1.5);
      setName("");
    })
  }

  return <MainLayout title={title}>
    <Container style={{gap: 20, display: "flex", flexDirection: "column"}}>
      <ContainerTitle>Добавление действия</ContainerTitle>
      <Input placeholder="Укажите действие" value={name} onChange={({target}: any) => setName(target.value)} />
      <Button onClick={sendData}>Сохранить</Button>
    </Container>
  </MainLayout>
});

export default JournalMoveCreate;