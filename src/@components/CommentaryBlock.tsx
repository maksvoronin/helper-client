import { FC, useState } from "react";
import { Commentary, Response } from "../@types";
import { observer } from "mobx-react";
import { styled } from "styled-components";
import config from "../config";
import { Link } from "react-router-dom";
import $api from "../@http";
import { alert } from "../@services/alerting.service";
import { useAuthStoreContext, usePopupStoreContext } from "../@store";
import { Button, Input } from "../@shared";

const Comment = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

const Avatar = styled.img`
  border-radius: 500px;
  width: 40px;
  height: 40px;
`;

const CommentBody = styled.div``;

const CommentText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 14px;
`;

const CommentControl = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 3px;
`;

const UserTitle = styled(Link)`
  font-weight: bold;
  font-size: 14px;
  text-decoration: none;
  color: var(--accentColor);
  &:hover {
    text-decoration: underline;
  }
`;

const EditButton = styled.div`
  margin: 0;
  padding: 0;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: var(--accentColor, blue);
  }
`;

const DeleteButton = styled(EditButton)`
  &:hover {
    color: red;
  }
`;

const DeletedCommentary = styled.div`
  font-style: italic;
  font-weight: 500;
  opacity: 0.3;
`;

const CommentaryEditForm: FC<{comment: Commentary, setComment: any}> = observer(({comment, setComment}) => {
  const [input, setInput] = useState<string>(comment.text || "");
  const { setVisible } = usePopupStoreContext();
  const editCommentary = () => {
    if (!input) {
      alert("error", "Заполните форму", "Укажите текст комментария", 15);
    }
    $api.put<Response<Commentary>>("/commentary/edit", { id: comment._id, text: input }).then(({ data }) => {
      alert("default", "Успешно", "Комментарий изменен", 15);
      setComment(data.data!);
      setVisible(false);
    });
  };
  return (
    <>
      <Input placeholder="Комментарий" value={input} onChange={({ target }: any) => setInput(target.value)} />
      <Button onClick={editCommentary}>Изменить</Button>
    </>
  );
});

const CommentaryBlock: FC<{ comment: Commentary }> = observer(({ comment }) => {
  const { user } = useAuthStoreContext();
  const [commentary, setCommentary] = useState<Commentary>(comment);
  const { setVisible, setTitle, setContent } = usePopupStoreContext();
  const [deletedCommentary, setDeletedCommentary] = useState<boolean>(false);

  const deleteCommentary = () => {
    $api.put(`/decision/uncommentary`, { id: commentary._id }).then(({ data }) => {
      if (data.type === "error") return alert("error", "Произошла ошибка", data.data, 15);
      setDeletedCommentary(true);
      alert("default", "Успешно", "Комментарий удалён", 15);
    });
  };

  return (
    <Comment>
      {deletedCommentary ? (
        <DeletedCommentary>Комментарий был удалён</DeletedCommentary>
      ) : (
        <>
          <Avatar src={`${config.fileHost}/${commentary.user.avatar}`} alt={"User avatar"} />
          <CommentBody>
            <UserTitle to={`/profile/${commentary.user._id}`}>
              {commentary.user.name} {commentary.user.surname}
            </UserTitle>
            <CommentText>{commentary.text}</CommentText>
            {(user._id === commentary.user._id || user.permissions > 4) && (
              <CommentControl>
                <EditButton
                  onClick={() => {
                    setVisible(true);
                    setTitle("Изменение комментария");
                    setContent(<CommentaryEditForm comment={commentary} setComment={setCommentary} />);
                  }}
                >
                  Изменить
                </EditButton>
                <DeleteButton onClick={deleteCommentary}>Удалить</DeleteButton>
              </CommentControl>
            )}
          </CommentBody>
        </>
      )}
    </Comment>
  );
});

export default CommentaryBlock;
