import { observer } from "mobx-react";
import { FC } from "react";
import { StyledSelect } from "../@shared";
import { Comment } from "../@types";

const CommentSelect: FC<{ comments: Comment[]; onChange: Function; fullInfo?: Function }> = observer(({ comments, onChange, fullInfo }) => {
  return (
    <StyledSelect
      defaultValue={0}
      onChange={({ target }: any) => {
        onChange(target.value);
        fullInfo && fullInfo(comments.find(e => e._id === target.value))
      }}
    >
      <option value={0} disabled>
        Выберите систему
      </option>
      {comments?.map((e) => (
        <option value={e._id} key={e._id}>
          {e.content}
        </option>
      ))}
    </StyledSelect>
  );
});

export default CommentSelect;
