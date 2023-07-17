import { FC, useState } from "react";
import { Commentary } from "../@types";
import { observer } from "mobx-react";
import { styled } from "styled-components";
import config from "../config";
import { Link } from "react-router-dom";
import $api from "../@http";
import { alert } from "../@services/alerting.service";
import { useAuthStoreContext } from "../@store";

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

const CommentaryBlock: FC<{ comment: Commentary }> = observer(({ comment }) => {
  const { user } = useAuthStoreContext();
  const [deletedCommentary, setDeletedCommentary] = useState<boolean>(false);

  const deleteCommentary = () => {
    $api.put(`/decision/uncommentary`, { id: comment._id }).then(({ data }) => {
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
          <Avatar src={`${config.fileHost}/${comment.user.avatar}`} alt={"User avatar"} />
          <CommentBody>
            <UserTitle to={`/profile/${comment.user._id}`}>
              {comment.user.name} {comment.user.surname}
            </UserTitle>
            <CommentText>{comment.text}</CommentText>
            {(user._id === comment.user._id || user.permissions > 4) && (
              <CommentControl>
                <EditButton>Изменить</EditButton>
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
