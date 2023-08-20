import { FC } from "react";
import { observer } from "mobx-react";
import { PageProps } from "../../@types";
import { MainLayout } from "../../@layouts";
import { Container, ContainerTitle, Li, Ul, Link, FormText } from "../../@shared";
import { baseURIs } from "../../config";

const Admin: FC<PageProps> = observer(({ title }) => {
  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>Управление проектом</ContainerTitle>
        <Ul>
          <Li>
            <Link to={`${baseURIs.admin}/series/create`}>Добавить серию локомотива</Link>
          </Li>
          <Li>
            <Link to={`${baseURIs.admin}/road/create`}>Добавить дорогу</Link>
          </Li>
          <Li>
            <Link to={`${baseURIs.admin}/road/edit`}>Изменить дорогу</Link>
          </Li>
          <Li>
            <Link to={`${baseURIs.admin}/ptol/create`}>Добавить ПТОЛ</Link>
          </Li>
          <Li>
            <Link to={`${baseURIs.admin}/ptol/edit`}>Изменить ПТОЛ</Link>
          </Li>
          <Li>
            <Link to={`${baseURIs.admin}/system/create`}>Добавить систему</Link>
          </Li>
          <Li>
            <Link to={`${baseURIs.admin}/system/edit`}>Изменить систему</Link>
          </Li>
          <Li>
            <Link to={`${baseURIs.admin}/background/create`}>Добавить фон</Link>
          </Li>
          <Li>
            <Link to={`${baseURIs.admin}/background/delete`}>Удалить фон</Link>
          </Li>
        </Ul>
      </Container>

      <Container>
        <ContainerTitle>Журналы</ContainerTitle>
        <Ul>
          <Li>
            <Link to={`${baseURIs.admin}/postscript/create`}>Добавить приписку</Link>
          </Li>
          <Li>
            <Link to={`${baseURIs.admin}/lokomotivenumber/create`}>Добавить номер локомотива</Link>
          </Li>
          <Li>
            <Link to={`${baseURIs.admin}/section/create`}>Добавить секцию</Link>
          </Li>
          <Li>
            <Link to={`${baseURIs.admin}/move/create`}>Добавить действие (что сделали)</Link>
          </Li>
          <Li>
            <Link to={`${baseURIs.admin}/blok/create`}>Добавить БЛОК</Link>
          </Li>
          <Li>
            <Link to={`${baseURIs.admin}/postnumber/create`}>Добавить номер поставленного</Link>
          </Li>
        </Ul>
        <FormText>Просмотр журналов</FormText>
        <Ul>
          <Li><Link to={`${baseURIs.admin}/comments`}>Журнал замечаний локомотивов</Link></Li>
        </Ul>
      </Container>

      <Container>
        <ContainerTitle>Статистика</ContainerTitle>
        <Ul>
          <Li>
            <Link to={`${baseURIs.admin}/users`}>Пользователи</Link>
          </Li>
          <Li>
            <Link to={`${baseURIs.admin}/export`}>Экспорт</Link>
          </Li>
          <Li>
            <Link to={`${baseURIs.admin}/stat`}>Статистика посещений</Link>
          </Li>
        </Ul>
      </Container>
    </MainLayout>
  );
});

export default Admin;
