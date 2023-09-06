import { FC, useState } from "react";
import { Commentary } from "../@types";
import { observer } from "mobx-react";
import { styled } from "styled-components";
import config, { baseURIs } from "../config";
import { Link } from "react-router-dom";
import { useAuthStoreContext, usePopupStoreContext } from "../@store";
import { DeleteCommentary, EditCommentaryPopup } from "../@popups";

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
  color: var(--primaryText);
`;

const CommentControl = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 3px;
  color: var(--primaryText);
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
    color: #ff3535;
  }
`;

const DeletedCommentary = styled.div`
  font-style: italic;
  font-weight: 500;
  opacity: 0.3;
`;

const CommentaryBlock: FC<{ comment: Commentary }> = observer(({ comment }) => {
  const { user } = useAuthStoreContext();
  const [commentary, setCommentary] = useState<Commentary>(comment);
  const { setVisible, setTitle, setContent } = usePopupStoreContext();
  const [deletedCommentary, setDeletedCommentary] = useState<boolean>(false);

  const deleteCommentary = () => {
    setVisible(true);
    setTitle("Удаление комментария");
    setContent(<DeleteCommentary commentaryId={commentary._id} action={(e) => setDeletedCommentary(e)} />)
  };

  return (
    <Comment>
      {deletedCommentary ? (
        <DeletedCommentary>Комментарий был удалён</DeletedCommentary>
      ) : (
        <>
          <Avatar src={`${config.fileHost}/${commentary.user.avatar}`} alt={"User avatar"} />
          <CommentBody>
            <UserTitle to={`${baseURIs.main}/profile/${commentary.user._id}`}>
              {commentary.user.name} {commentary.user.surname}
            </UserTitle>
            <CommentText>{commentary.text}</CommentText>
            {(user._id === commentary.user._id || user.permissions > 4) && (
              <CommentControl>
                <EditButton
                  onClick={() => {
                    setVisible(true);
                    setTitle("Изменение комментария");
                    setContent(<EditCommentaryPopup comment={commentary} setComment={setCommentary} />);
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
