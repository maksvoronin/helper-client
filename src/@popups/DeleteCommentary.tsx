import { styled } from "styled-components";
import { Button, CancelButton, ContainerText } from "../@shared";
import { observer } from "mobx-react";
import { FC } from "react";
import { usePopupStoreContext } from "../@store";
import $api from "../@http";
import { Response } from "../@types";
import { alert } from "../@services";

const DeleteButton = styled(Button)`
  background-color: #ff4747;

  span {
    font-weight: 500;
  }
`;

const DeleteCommentary: FC<{ commentaryId: string; action?: (b: boolean) => void }> = observer(({ commentaryId, action }) => {
  const { setVisible } = usePopupStoreContext();

  const sendData = () => {
    $api.post<Response>(`/decision/uncommentary`, { id: commentaryId }).then(({ data }) => {
      if (data.type === "error") return alert("error", "Ошибка", data.message);
      alert("default", "Успешно", "Комментарий удалён");
      setVisible(false);
      action && action(true);
    });
  };

  return (
    <>
      <ContainerText>Вы уверены, что хотите удалить комментарий?</ContainerText>
      <DeleteButton onClick={sendData}>Да, удалить комментарий</DeleteButton>
      <CancelButton onClick={() => setVisible(false)}>Отмена</CancelButton>
    </>
  );
});

export default DeleteCommentary;
