import { FC } from "react";
import { PageProps } from "../../../../../@types";
import { observer } from "mobx-react";
import { DevelopersLayout } from "../../../../../@layouts";
import { Code, DevTitle, FormText, Li, Ul } from "../../../../../@shared";
import config from "../../../../../config";

const AboutComment: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>О методах comment</DevTitle>
      <FormText>Методы предназначены для взаимодействия с замечаниями на проекте</FormText>
      <FormText>Выбор замечания необходим для поиска решений, на сайте алгоритм реализован следующим образом:</FormText>
      <Ul>
        <Li>Пользователь выбирает систему</Li>
        <Li>После у него появляется список замечаний этой системы</Li>
        <Li>После выбора замечания пользователю показываются решения для этого замечания</Li>
      </Ul>
      <FormText>Пример запроса</FormText>
      <Code>{config.publicapi}/&lt;TokenApp&gt;/comment/&lt;MethodName&gt;</Code>
      <FormText>
        Где <code>TokenApp</code> - токен Вашего приложения, а <code>MethodName</code> - имя метода класса
      </FormText>
      <FormText>Интерфейс класса</FormText>
      <Code>{`interface Comment { _id: string; content: string; by: User; link: string; visible: boolean; created: number; system: System; series: Series; decisions: Decision[]; file?: string; events: Event[]; }`}</Code>
      <FormText>
        <code>_id</code> - уникальный идентификатор замечания, <code>content</code> - содержимое замечания, <code>by</code> - пользователь, создавший это замечание на сайте, <code>visible</code> - должно ли отображаться
        замечание, <code>created</code> - дата создания замечания, <code>system</code> - система, к которой привязано замечание, <code>series</code> - серия, для которой характерно это замечание, <code>decision</code> -
        список решений, <code>file</code> - файл (если он существует), <code>events</code> - события, связанные с этим замечанием
      </FormText>
    </DevelopersLayout>
  );
});

export default AboutComment;
