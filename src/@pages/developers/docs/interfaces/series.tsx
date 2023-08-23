import { observer } from "mobx-react";
import { PageProps } from "../../../../@types";
import { FC } from "react";
import { DevelopersLayout } from "../../../../@layouts";
import { Code, DevTitle, FormText } from "../../../../@shared";

const SeriesInterface: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>Интерфейс road</DevTitle>
      <Code>
        {`
        interface Series {
          _id: string;
          name: string;
          by: User;
          link: string;
          visible: boolean;
          created: number;
          events: Event[];
        }        
        `}
      </Code>
      <FormText>
        <code>_id</code> - идентификатор серии, <code>name</code> - название серии, <code>visible</code> - отображать ли серию, <code>created</code> - дата создания, <code>events</code> - события, связанные с объектом
      </FormText>
    </DevelopersLayout>
  );
});

export default SeriesInterface;
