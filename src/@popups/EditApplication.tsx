import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Application, Response } from "../@types";
import { Button, Checkbox, Input, Textarea } from "../@shared";
import { styled } from "styled-components";
import $api from "../@http";
import { alert } from "../@services";
import { usePopupStoreContext } from "../@store";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EditApplication: FC<{ app: Application; setApp: any }> = observer(({ app, setApp }) => {
  const { setVisible } = usePopupStoreContext();

  const [name, setName] = useState<string>(app.name || "");
  const [description, setDescription] = useState<string>(app.description || "");
  const [usage, setUsage] = useState<string>(app.usage || "");
  const [status, setStatus] = useState<boolean>(app.status);
  const [changeToken, setChangeToken] = useState<boolean>(false);

  const sendData = () => {
    $api.put<Response<Application>>("/application/edit", { id: app._id, name, description, usage, status, changeToken }).then(({ data }) => {
      if (data.type === "error" || !data.data) return alert("error", "Ошибка", String(data.data!));
      setApp(data.data);
      setVisible(false);
      alert("default", "Успешно", "Приложение изменено");
    });
  };

  return (
    <>
      <Input placeholder="Название" value={name} onChange={({ target }: any) => setName(target.value)} />
      <Textarea placeholder="Описание" value={description} onChange={({ target }: any) => setDescription(target.value)} />
      <Textarea placeholder="Использование" value={usage} onChange={({ target }: any) => setUsage(target.value)} />
      <Row>
        <Checkbox defaultValue={status} onChange={(e) => setStatus(e)}>
          Статус
        </Checkbox>
        <Checkbox defaultValue={changeToken} onChange={(e) => setChangeToken(e)}>
          Поменять токен
        </Checkbox>
      </Row>
      <Button onClick={sendData}>Сохранить</Button>
    </>
  );
});

export default EditApplication;
