import { observer } from "mobx-react";
import { PageProps } from "../../../../../@types";
import { FC } from "react";
import { DevelopersLayout } from "../../../../../@layouts";
import { Code, DevTitle, FormText, Li, Ul } from "../../../../../@shared";
import config from "../../../../../config";

const AboutSystem: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>О методах system</DevTitle>
      <FormText>Методы предназначены для взаимодействия с системами на проекте.</FormText>
      <FormText>Выбор системы необходим для поиска замечаний и решений, на сайте алгоритм реализован следующим образом:</FormText>
      <Ul>
        <Li>Пользователь выбирает систему</Li>
        <Li>После у него появляется список замечаний у этой системы</Li>
        <Li>И после выбора замечания пользователю показываются решения для этого замечания</Li>
      </Ul>
      <FormText>Пример запроса:</FormText>
      <Code>{config.publicapi}/&lt;TokenApp&gt;/system/&lt;MethodName&gt;</Code>
      <FormText>
        Где <code>TokenApp</code> - токен Вашего приложения, а <code>MethodName</code> - имя метода класса
      </FormText>
      <FormText>Интерфейс класса</FormText>
      <Code>{`interface System { _id: string, name: string, by: User, link: string, visible: boolean, created: number, usingJournals: boolean, events: Event[]}`}</Code>
      <FormText>
        <code>_id</code> - уникальный идентификатор системы, <code>name</code> - название системы, <code>by</code> - пользователь, создавший эту систему на сайте, <code>visible</code> - должна ли отображаться система,{" "}
        <code>created</code> - дата создания системы, <code>usingJournals</code> - показывать ли систему в списке для журналов, <code>events</code> - всяческие изменения, связанные с системой
      </FormText>
    </DevelopersLayout>
  );
});

export default AboutSystem;
