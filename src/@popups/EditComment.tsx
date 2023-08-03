import { FC, useState } from "react";
import $api from "../@http";
import { observer } from "mobx-react";
import { usePopupStoreContext } from "../@store";
import { Comment, Response } from "../@types";
import { alert } from "../@services";
import { Button, Input } from "../@shared";

const EditComment: FC<{comment: Comment, setComment: any}> = observer(({comment, setComment}) => {
  const [text, setText] = useState<string>(comment.content);
  const { setVisible } = usePopupStoreContext();

  const sendData = () => {
    $api.put<Response<Comment>>("/comment/edit", {id: comment._id, comment: text}).then(({data}) => {
      if(data.type === "error") return alert("error", "Ошибка", String(data.data!), 15);
      setComment(data.data!);
      setVisible(false);
    })
  }

  return <>
    <Input value={text} onChange={({target}: any) => setText(target.value)} />
    <Button onClick={sendData}>Сохранить</Button>
  </>;
});

export default EditComment;