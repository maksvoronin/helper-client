import { observer } from "mobx-react";
import { PageProps } from "../../../../@types";
import { FC } from "react";
import { DevelopersLayout } from "../../../../@layouts";
import { Code, DevTitle, FormText } from "../../../../@shared";

const CommentInterface: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>Интерфейс comment</DevTitle>
      <Code>
        {`
        interface Comment {
          _id: string;
          content: string;
          by: User;
          link: string;
          visible: boolean;
          created: number;
          system: System;
          series: Series;
          decisions: Decision[];
          file?: string;
          events: Event[];
        }
        `}
      </Code>
      <FormText>
        <code>_id</code> - уникальный идентификатор замечания, <code>content</code> - содержимое замечания, <code>by</code> - пользователь, добавивший замечание, <code>visible</code> - должно ли отображаться замечание,{" "}
        <code>created</code> - дата создания замечания, <code>system</code> - система, к которой привязано замечание, <code>series</code> - серия, для которой характерно это замечание, <code>decisions</code> - массив
        решений для этого замечания, <code>file</code> - файл, прикрепленный к замечанию (если он существует), <code>events</code> - события этого замечания
      </FormText>
    </DevelopersLayout>
  );
});

export default CommentInterface;
