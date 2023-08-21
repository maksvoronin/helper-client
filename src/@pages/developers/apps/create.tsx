import { FC, useState } from "react";
import { Application, PageProps, Response } from "../../../@types";
import { observer } from "mobx-react";
import { DevelopersLayout } from "../../../@layouts";
import { Button, DevTitle, FormText, Input, Textarea } from "../../../@shared";
import $api from "../../../@http";
import { alert } from "../../../@services";
import { useNavigate } from "react-router-dom";
import { baseURIs } from "../../../config";
import { useAuthStoreContext } from "../../../@store";

const CreateAPIApplication: FC<PageProps> = observer(({ title }) => {
  const { user, setUser } = useAuthStoreContext();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [usage, setUsage] = useState<string>("");

  const navigate = useNavigate();

  const sendData = () => {
    $api.post<Response<Application>>("/application/create", { name, description, usage }).then(({ data }) => {
      if(data.type === "error" || !data.data) return alert("error", "Ошибка", data.message);
      alert("default", "Успешно", `Приложение ${name} создано`);
      const newUser = user;
      newUser.createdapps.push(data.data);
      setUser(newUser);
      navigate(`${baseURIs.developers}/apps/${data.data._id}`);
    });
  };

  return (
    <DevelopersLayout title={title}>
      <DevTitle>Создание приложения</DevTitle>
      <FormText>Название приложения</FormText>
      <Input placeholder="Название" value={name} onChange={({ target }: any) => setName(target.value)} />
      <FormText>Описание</FormText>
      <Textarea placeholder="Приложение / виджет для..." value={description} onChange={({ target }: any) => setDescription(target.value)} />
      <FormText>Где и как им можно воспользоваться, краткий алгоритм работы</FormText>
      <Textarea placeholder="Открыть что-то, заполнить то-то" value={usage} onChange={({ target }: any) => setUsage(target.value)} />
      <Button onClick={sendData} style={{marginTop: 10}}>Создать</Button>
    </DevelopersLayout>
  );
});

export default CreateAPIApplication;
