import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Commentary } from "../@types";
import { styled } from "styled-components";
import { CommentaryBlock } from "../@components";
import { Button, Input } from "../@shared";
import $api from "../@http";
import { alert } from "../@services/alerting.service";
import { useAuthStoreContext } from "../@store";

const CommentariesBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 0;
`;

const CommentBlockTitle = styled.h2`
  font-size: 14px;
  font-weight: 500;
`;

const CommentInput = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;
  input {
    width: 100%;
  }
  button {
    width: 50%;
    max-width: 100px;
  }
`;

const Commentaries: FC<{ type: "decision"; postId: string; comments: Commentary[] }> = observer(({ type, postId, comments }) => {
  const { user } = useAuthStoreContext();
  const [currentComments, setCurrentComments] = useState<Commentary[]>(comments);
  const [comment, setComment] = useState<string>("");

  const sendData = () => {
    if (comment.trim() === "") return alert("error", "Ошибка", "Заполните форму", 1.5);
    $api.put(`/${type}/commentary`, { id: postId, text: comment }).then(({ data }) => {
      if (data.type === "error") return alert("error", "Произошла ошибка", data.message, 1.5);
      alert("default", "Успешно", "Комментарий опубликован", 1.5);
      setCurrentComments((prev) => [...prev, { ...data.data.commentary }]);
      setComment("");
    });
  };
  return (
    <CommentariesBlock>
      <CommentBlockTitle>{currentComments.length === 0 ? `Здесь нет комментариев` : `Комментарии: ${currentComments.length}`}</CommentBlockTitle>
      {currentComments && currentComments.map((e) => <CommentaryBlock key={`i${Math.random() * 100}`} comment={e} />)}
      {user && user._id && (
        <CommentInput>
          <Input placeholder="Введите текст" onChange={({ target }: any) => setComment(target.value)} value={comment} />
          <Button onClick={sendData}>Отправить</Button>
        </CommentInput>
      )}
    </CommentariesBlock>
  );
});

export default Commentaries;
