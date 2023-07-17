import { observer } from "mobx-react";
import { PageProps, Response, System } from "../../@types";
import { FC, useEffect, useState } from "react";
import { MainLayout } from "../../@layouts";
import { AdminContainer, Button, ContainerTitle, Input } from "../../@shared";
import { alert } from "../../@services/alerting.service";
import $api from "../../@http";
import { SystemSelect } from "../../@components";

const CreateSystem: FC<PageProps> = observer(({ title }) => {
  const [system, setSystem] = useState<string>("");

  const sendData = () => {
    if (!system.trim()) return alert("error", "Ошибка", "Укажите название системы", 15);
    $api.post<Response<string>>("/system/create", { name: system }).then(({ data }) => (data.type === "error" ? alert("error", "Ошибка", data.data!, 15) : alert("default", "Успешно", "Система добавлена", 15)));
    setSystem("");
  };

  return (
    <MainLayout title={title}>
      <AdminContainer>
        <ContainerTitle>Создание системы</ContainerTitle>
        <Input placeholder="Название системы" value={system} onChange={({ target }: any) => setSystem(target.value)} />
        <Button onClick={sendData}>Сохранить</Button>
      </AdminContainer>
    </MainLayout>
  );
});

export const EditSystem: FC<PageProps> = observer(({ title }) => {
  const [selectedSystem, setSelectedSystem] = useState<string>();
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if(selectedSystem){
      $api.get<Response<System>>(`/system/get?id=${selectedSystem}`).then(({data}) => {
        setName(data.data!.name);
      });
    }
  }, [selectedSystem]);

  const sendData = () => {
    if (selectedSystem) {
      $api.put<Response<System | string>>("/system/edit", { id: selectedSystem, name }).then(({ data }) => {
        if ((data.type === "error" && typeof data.data === "string") || !data.data) return alert("error", "Ошибка", data.data!, 15);
        alert("default", "Успешно!", "Система изменена", 15);
      });
    }
  };

  return (
    <MainLayout title={title}>
      <AdminContainer>
        <ContainerTitle>Изменение системы</ContainerTitle>
        <SystemSelect onChange={(e: string) => setSelectedSystem(e)} />
        <Input placeholder="Название системы" value={name} onChange={({ target }: any) => setName(target.value)} />
        <Button onClick={sendData}>Сохранить</Button>
      </AdminContainer>
    </MainLayout>
  );
});

export default CreateSystem;
