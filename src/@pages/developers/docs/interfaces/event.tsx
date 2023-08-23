import { observer } from "mobx-react";
import { PageProps } from "../../../../@types";
import { FC } from "react";
import { DevelopersLayout } from "../../../../@layouts";
import { Code, DevTitle, FormText } from "../../../../@shared";

const EventInterface: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>Интерфейс event</DevTitle>
      <Code>
        {`
        interface Event {
          type: string;
          prev: any;
          new: any;
        }
        `}
      </Code>
      <FormText>
        <code>type</code> - тип события, <code>prev</code> - предыдущее значение, <code>new</code> - новое значение
      </FormText>
    </DevelopersLayout>
  );
});

export default EventInterface;
