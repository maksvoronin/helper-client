import { FC, useState } from "react";
import { PageProps, LokomotiveNumber, Response } from "../../../@types";
import { observer } from "mobx-react";
import { MainLayout } from "../../../@layouts";
import { Button, Container, ContainerTitle, Input } from "../../../@shared";
import { alert } from "../../../@services/alerting.service";
import $api from "../../../@http";

const LokomotivenumberCreate: FC<PageProps> = observer(({title}) => {

  const [name, setName] = useState<string>("");

  const sendData = () => {
    if(!name) return alert("error", "Заполните форму", "Укажите название", 15);
    $api.post<Response<LokomotiveNumber>>("/lokomotivenumber/create", {title: name}).then(() => {
      alert("default", "Успешно", "Номер локомотива добавлен", 15);
      setName("");
    })
  }

  return <MainLayout title={title}>
    <Container style={{gap: 20, display: "flex", flexDirection: "column"}}>
      <ContainerTitle>Добавление номера локомотива</ContainerTitle>
      <Input placeholder="Укажите номер локомотива" value={name} onChange={({target}: any) => setName(target.value)} />
      <Button onClick={sendData}>Сохранить</Button>
    </Container>
  </MainLayout>
});

export default LokomotivenumberCreate;