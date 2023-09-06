import { FC, useState } from "react";
import $api from "../@http";
import { usePopupStoreContext } from "../@store";
import { Commentary, Response } from "../@types";
import { observer } from "mobx-react";
import { Input, Button } from "../@shared";
import { alert } from "../@services";

const CommentaryEditForm: FC<{comment: Commentary, setComment: any}> = observer(({comment, setComment}) => {
  const [input, setInput] = useState<string>(comment.text || "");
  const { setVisible } = usePopupStoreContext();
  const editCommentary = () => {
    if (!input) {
      alert("error", "Заполните форму", "Укажите текст комментария", 1.5);
    }
    $api.put<Response<Commentary>>("/commentary/edit", { id: comment._id, text: input }).then(({ data }) => {
      alert("default", "Успешно", "Комментарий изменен", 1.5);
      setComment(data.data!);
      setVisible(false);
      alert("default", "Успешно", "Комментарий изменен");
    });
  };
  return (
    <>
      <Input placeholder="Комментарий" value={input} onChange={({ target }: any) => setInput(target.value)} />
      <Button onClick={editCommentary}>Изменить</Button>
    </>
  );
});

export default CommentaryEditForm;