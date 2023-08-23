import { observer } from "mobx-react";
import { PageProps } from "../../../../@types";
import { FC } from "react";
import { DevelopersLayout } from "../../../../@layouts";
import { Code, DevTitle, FormText } from "../../../../@shared";

const BackgroundInterface: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>Интерфейс background</DevTitle>
      <Code>
        {`
        interface Background {
          _id: string;
          title: string;
          visible: boolean;
          type: "image" | "color";
          content: string;
          author: User;
          events: Event[];
        }        
        `}
      </Code>
      <FormText>
        <code>_id</code> - уникальный идентификатор фона, <code>title</code> - название фона, <code>visible</code> - отображать ли фон, <code>type</code> - тип фона, <code>content</code> - содержимое фона (цвет или
        ссылка на файл), <code>author</code> - автор фона, <code>events</code> - события, связанные с фоном
      </FormText>
    </DevelopersLayout>
  );
});

export default BackgroundInterface;
