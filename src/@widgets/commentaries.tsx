import { observer } from "mobx-react";
import { FC } from "react";
import { Commentary } from "../@types";
import { styled } from "styled-components";
import { CommentaryBlock } from "../@components";
import { Button, Input } from "../@shared";

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

const Commentaries: FC<{ type: "decision"; comments: Commentary[] }> = observer(({ type, comments }) => {
  return (
    <CommentariesBlock>
      <CommentBlockTitle>{comments.length === 0 ? `Будьте первым, кто оставит комментарий!` : `Комментарии: ${comments.length}`}</CommentBlockTitle>
      {comments && comments.map((e) => <CommentaryBlock key={e._id} comment={e} />)}
      <CommentInput>
        <Input placeholder="Введите текст" />
        <Button>Отправить</Button>
      </CommentInput>
    </CommentariesBlock>
  );
});

export default Commentaries;
