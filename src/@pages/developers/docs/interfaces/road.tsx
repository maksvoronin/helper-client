import { observer } from "mobx-react";
import { PageProps } from "../../../../@types";
import { FC } from "react";
import { DevelopersLayout } from "../../../../@layouts";
import { Code, DevTitle, FormText } from "../../../../@shared";

const RoadInterface: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>Интерфейс road</DevTitle>
      <Code>
        {`
        interface Road {
          _id: string;
          name: string;
          link: string;
          visible: boolean;
          created: number;
          events: Event[]
        }
        `}
      </Code>
      <FormText>
        <code>_id</code> - идентификатор дороги, <code>name</code> - название дороги, <code>visible</code> - отображать ли дорогу, <code>created</code> - дата создания, <code>events</code> - события, связанные с объектом
      </FormText>
    </DevelopersLayout>
  );
});

export default RoadInterface;
