import { FC } from "react";
import { PageProps } from "../../../../../@types";
import { observer } from "mobx-react";
import { DevelopersLayout } from "../../../../../@layouts";
import { Code, DevTitle, FormText, Li, Ul } from "../../../../../@shared";
import config from "../../../../../config";

const AboutDecision: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>О методах decision</DevTitle>
      <FormText>Методы предназначены для взаимодействия с замечаниями на проекте</FormText>
      <FormText>Выбор замечания необходим для поиска решений, на сайте алгоритм реализован следующим образом:</FormText>
      <Ul>
        <Li>Пользователь выбирает систему</Li>
        <Li>После у него появляется список замечаний этой системы</Li>
        <Li>После выбора замечания пользователю показываются решения для этого замечания</Li>
      </Ul>
      <FormText>Пример запроса</FormText>
      <Code>{config.publicapi}/&lt;TokenApp&gt;/decision/&lt;MethodName&gt;</Code>
      <FormText>
        Где <code>TokenApp</code> - токен Вашего приложения, а <code>MethodName</code> - имя метода класса
      </FormText>
      <FormText>Интерфейс класса</FormText>
      <Code>{`Decision {
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
}; }`}</Code>
      <FormText>
        <code>_id</code> - уникальный идентификатор замечания, <code>content</code> - содержимое замечания, <code>by</code> - пользователь, создавший это замечание на сайте, <code>visible</code> - должно ли отображаться
        замечание, <code>created</code> - дата создания замечания, <code>comment</code> - замечание, к которой привязано решение, <code>file</code> - файл (если он существует), <code>events</code> - события, связанные с этим замечанием, <code>comments</code> - список комментариев к этому решению
      </FormText>
    </DevelopersLayout>
  );
});

export default AboutDecision;
