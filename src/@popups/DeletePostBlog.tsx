import { observer } from "mobx-react";
import { FC } from "react";
import { Button, ContainerText } from "../@shared";
import styled from "styled-components";
import $api from "../@http";
import { Response } from "../@types";
import { alert } from "../@services";
import { baseURIs } from "../config";
import { useNavigate } from "react-router-dom";
import { usePopupStoreContext } from "../@store";

const DeleteButton = styled(Button)`
  background-color: #ff4747;
  color: white;

  span {
    font-weight: 500;
  }
`;

const DeletePostBlog: FC<{ postId: string }> = observer(({ postId }) => {
  const navigate = useNavigate();
  const { setVisible } = usePopupStoreContext();
  const sendData = () => {
    $api.post<Response>(`/blog/delete`, { id: postId }).then(({ data }) => {
      if (!data.data || data.type === "error") alert("error", "Ошибка", data.message);
      navigate(`${baseURIs.blog}`);
      setVisible(false);
    });
  };
  return (
    <>
      <ContainerText>Вы уверены, что хотите навсегда удалить эту запись?</ContainerText>
      <DeleteButton onClick={sendData}>Да, удалить запись навсегда</DeleteButton>
    </>
  );
});

export default DeletePostBlog;
