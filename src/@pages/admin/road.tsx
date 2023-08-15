import { FC, useState } from "react";
import { PageProps, JournalMove, Response, Road } from "../../@types";
import { observer } from "mobx-react";
import { MainLayout } from "../../@layouts";
import { Button, Container, ContainerTitle, Input } from "../../@shared";
import { alert } from "../../@services/alerting.service";
import $api from "../../@http";
import { RoadSelect } from "../../@components";
import { useRoadStoreContext } from "../../@store";

const RoadCreate: FC<PageProps> = observer(({title}) => {

  const [name, setName] = useState<string>("");

  const sendData = () => {
    if(!name) return alert("error", "Заполните форму", "Укажите название", 1.5);
    $api.post<Response<JournalMove>>("/road/create", {title: name}).then(() => {
      alert("default", "Успешно", "Дорога добавлена", 1.5);
      setName("");
    })
  }

  return <MainLayout title={title}>
    <Container style={{gap: 20, display: "flex", flexDirection: "column"}}>
      <ContainerTitle>Добавление дороги</ContainerTitle>
      <Input placeholder="Укажите название" value={name} onChange={({target}: any) => setName(target.value)} />
      <Button onClick={sendData}>Сохранить</Button>
    </Container>
  </MainLayout>
});

export const RoadEdit: FC<PageProps> = observer(({title}) => {

  const [selectedRoad, setSelectedRoad] = useState<string>();
  const [name, setName] = useState<string>(""); 

  const { setRoads } = useRoadStoreContext();

  const sendData = () => {
    if(selectedRoad && name) {
      $api.put<Response<{road: Road, roads: Road[]}>>("/road/edit", {id: selectedRoad, title: name}).then(({data}) => {
        alert("default", "Успешно", data.message!, 1.5);
        setName("");
        setRoads(data.data!.roads);
      })
    }
  }

  return <MainLayout title={title}>
    <Container style={{gap: 20, display: "flex", flexDirection: "column"}}>
      <ContainerTitle>Изменение дороги</ContainerTitle>
      <RoadSelect onChange={(e) => setSelectedRoad(e)} />
      <Input placeholder="Укажите название" value={name} onChange={({target}: any) => setName(target.value)} />
      <Button onClick={sendData}>Сохранить</Button>
    </Container>
  </MainLayout>

})

export default RoadCreate;