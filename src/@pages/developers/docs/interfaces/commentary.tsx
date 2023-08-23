import { observer } from "mobx-react";
import { PageProps } from "../../../../@types";
import { FC } from "react";
import { DevelopersLayout } from "../../../../@layouts";
import { Code, DevTitle, FormText } from "../../../../@shared";

const CommentaryInterface: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>Интерфейс commentary</DevTitle>
      <Code>
        {`
        interface Commentary {
          _id: string;
          text: string;
          user: User;
          comment: Decision;
        }        
        `}
      </Code>
      <FormText>
        <code>_id</code> - уникальный идентификатор комментария, <code>text</code> - текст комментария, <code>user</code> - автор комментария, <code>comment</code> - решение, к которому привязан комментарий
      </FormText>
    </DevelopersLayout>
  );
});

export default CommentaryInterface;
