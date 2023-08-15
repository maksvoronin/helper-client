import { FC, useState } from "react";
import { PageProps, Ptol, Response } from "../../../@types";
import { observer } from "mobx-react";
import { MainLayout } from "../../../@layouts";
import { Button, Container, ContainerTitle, Input } from "../../../@shared";
import { alert } from "../../../@services/alerting.service";
import $api from "../../../@http";
import { RoadSelect } from "../../../@components";

const PtolCreate: FC<PageProps> = observer(({title}) => {

  const [name, setName] = useState<string>("");
  const [road, setRoad] = useState<string>("");

  const sendData = () => {
    if(!name) return alert("error", "Заполните форму", "Укажите название", 1.5);
    $api.post<Response<Ptol>>("/ptol/create", {title: name, road}).then(({data}) => {
      alert("default", "Успешно", "ПТОЛ добавлен", 1.5);
      setName("");
    })
  }

  return <MainLayout title={title}>
    <Container style={{gap: 20, display: "flex", flexDirection: "column"}}>
      <ContainerTitle>Добавление ПТОЛа</ContainerTitle>
      <RoadSelect onChange={(e) => setRoad(e)} />
      <Input placeholder="Укажите название" value={name} onChange={({target}: any) => setName(target.value)} />
      <Button onClick={sendData}>Сохранить</Button>
    </Container>
  </MainLayout>
});

export default PtolCreate;