import { FC, useEffect, useState } from "react";
import { PageProps, Ptol, Response } from "../../../@types";
import { observer } from "mobx-react";
import { MainLayout } from "../../../@layouts";
import { Button, Container, ContainerTitle, Input } from "../../../@shared";
import { alert } from "../../../@services/alerting.service";
import $api from "../../../@http";
import { PtolSelect, RoadSelect } from "../../../@components";

const PtolEdit: FC<PageProps> = observer(({ title }) => {
  const [name, setName] = useState<string>("");
  const [ptol, setPtol] = useState<string>("");
  const [road, setRoad] = useState<string>("");

  const [selectedPtol , setSelectedPtol] = useState<Ptol>();

  const sendData = () => {
    if (!name) return alert("error", "Заполните форму", "Укажите название", 1.5);
    $api.put<Response<Ptol>>("/ptol/edit", { id: ptol, title: name, road }).then(({ data }) => {
      alert("default", "Успешно", data.message, 1.5);
      setPtol("");
      setRoad("");
      setSelectedPtol(undefined);
      setName("");
    });
  };

  useEffect(() => {
    if(ptol) {
      $api.get<Response<Ptol>>(`/ptol/get?id=${ptol}`).then(({data}) => {
        setSelectedPtol(data.data!);
        setName(data.data!.name);
      });
    }
  }, [ptol]);

  useEffect(() => {
    if(selectedPtol && selectedPtol.road) {
      setRoad(selectedPtol.road._id);
    } else {
      setRoad("0");
    }
  }, [selectedPtol]);

  return (
    <MainLayout title={title}>
      <Container style={{ gap: 20, display: "flex", flexDirection: "column" }}>
        <ContainerTitle>Изменение ПТОЛа</ContainerTitle>
        <PtolSelect onChange={(e) => setPtol(e)} />
        <RoadSelect onChange={(e) => setRoad(e)} value={road} />
        <Input placeholder="Укажите название" value={name} onChange={({ target }: any) => setName(target.value)} />
        <Button onClick={sendData}>Сохранить</Button>
      </Container>
    </MainLayout>
  );
});

export default PtolEdit;
