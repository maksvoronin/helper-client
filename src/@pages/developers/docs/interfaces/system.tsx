import { observer } from "mobx-react";
import { PageProps } from "../../../../@types";
import { FC } from "react";
import { DevelopersLayout } from "../../../../@layouts";
import { Code, DevTitle, FormText } from "../../../../@shared";

const SystemInterface: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>Интерфейс system</DevTitle>
      <Code>
        {`
        interface System {
          _id: string,
          name: string,
          by: User,
          link: string,
          visible: boolean,
          created: number,
          usingJournals: boolean,
          events: Event[];
        }
        `}
      </Code>
      <FormText>
        <code>_id</code> - уникальный идентификатор системы, <code>name</code> - название системы, <code>by</code> - пользователь, создавший систему, <code>visible</code> - должна ли оторбражаться система,{" "}
        <code>created</code> - дата создания системы, <code>usingJournals</code> - должна ли отображаться система в списке для журналов, <code>events</code> - события данной системы
      </FormText>
    </DevelopersLayout>
  );
});

export default SystemInterface;
