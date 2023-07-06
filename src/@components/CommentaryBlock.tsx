import { FC } from "react";
import { Commentary } from "../@types";
import { observer } from "mobx-react";
import { styled } from "styled-components";
import config from "../config";
import { Link } from "react-router-dom";

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

const EditButton = styled.p`
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

const CommentaryBlock: FC<{ comment: Commentary }> = observer(({ comment }) => {
  return (
    <Comment>
      <Avatar src={`${config.fileHost}/${comment.user.avatar}`} alt={"User avatar"} />
      <CommentBody>
        <UserTitle to={`/profile/${comment.user._id}`}>
          {comment.user.name} {comment.user.surname}
        </UserTitle>
        <CommentText>{comment.text}</CommentText>
        <CommentControl>
          <EditButton>Изменить</EditButton>
          <DeleteButton>Удалить</DeleteButton>
        </CommentControl>
      </CommentBody>
    </Comment>
  );
});

export default CommentaryBlock;
