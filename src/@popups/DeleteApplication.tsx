import { observer } from "mobx-react";
import { FC } from "react";
import { Button, ContainerText } from "../@shared";
import { styled } from "styled-components";
import { usePopupStoreContext } from "../@store";
import $api from "../@http";
import { Response } from "../@types";
import { alert } from "../@services";
import { useNavigate } from "react-router-dom";
import { baseURIs } from "../config";

const DeleteButton = styled(Button)`
  background-color: #ff4747;

  span {
    font-weight: 500;
  }
`;

const DeleteApplication: FC<{ appId: string; appTitle: string }> = observer(({ appId, appTitle }) => {
  const { setVisible } = usePopupStoreContext();
  const navigate = useNavigate();

  const sendData = () => {
    $api.post<Response>("/application/delete", { id: appId }).then(({ data }) => {
      if (data.type === "error") alert("error", "Ошибка", data.message);
      alert("default", "Успешно", "Приложение удалено");
      navigate(`${baseURIs.developers}/apps`);
      setVisible(false);
    });
  };

  return (
    <>
      <ContainerText>Вы уверены, что хотите навсегда удалить приложение {appTitle}?</ContainerText>
      <DeleteButton onClick={sendData}>Да, удалить приложение навсегда</DeleteButton>
    </>
  );
});

export default DeleteApplication;
