import { observer } from "mobx-react";
import { PageProps } from "../../../../@types";
import { FC } from "react";
import { DevelopersLayout } from "../../../../@layouts";
import { Code, DevTitle, FormText } from "../../../../@shared";

const DecisionInterface: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>Интерфейс decision</DevTitle>
      <Code>
        {`
        interface Decision {
          _id: string;
          content: string,
          by: User,
          link: string,
          visible: boolean,
          created: number,
          comment: Comment,
          file?: string,
          events: Event[],
          comments: Commentary[]
        };
        `}
      </Code>
      <FormText>
        <code>_id</code> - уникальный идентификатор решения, <code>content</code> - содержимое решения, <code>by</code> - пользователь, добавивший решение, <code>visible</code> - должно ли отображаться решение,{" "}
        <code>created</code> - дата создания решения, <code>comment</code> - замечание, к которой привязано решение, <code>file</code> - файл, прикрепленный к решению (если он существует), <code>events</code> - события этого замечания, <code>comments</code> - массив
        комментариев этого решения
      </FormText>
    </DevelopersLayout>
  );
});

export default DecisionInterface;
