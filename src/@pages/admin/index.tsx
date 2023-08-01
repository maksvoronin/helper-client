import { FC } from "react";
import { observer } from "mobx-react";
import { PageProps } from "../../@types";
import { MainLayout } from "../../@layouts";
import { Container, ContainerTitle, Li, Ul, Link } from "../../@shared";

const Admin: FC<PageProps> = observer(({ title }) => {
  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>Управление проектом</ContainerTitle>
        <Ul>
          <Li>
            <Link to={"/admin/series/create"}>Добавить серию локомотива</Link>
          </Li>
          <Li>
            <Link to={"/admin/road/create"}>Добавить дорогу</Link>
          </Li>
          <Li>
            <Link to={"/admin/system/create"}>Добавить систему</Link>
          </Li>
          <Li>
            <Link to={"/admin/system/edit"}>Изменить систему</Link>
          </Li>
          <Li>
            <Link to={"/admin/background/create"}>Добавить фон</Link>
          </Li>
          <Li>
            <Link to={"/admin/background/delete"}>Удалить фон</Link>
          </Li>
        </Ul>
      </Container>

      <Container>
        <ContainerTitle>Журналы</ContainerTitle>
        <Ul>
          <Li>
            <Link to={"/admin/journals/ptol"}>Добавить ПТОЛ</Link>
          </Li>
          <Li>
            <Link to={"/admin/journals/postscript"}>Добавить приписку</Link>
          </Li>
          <Li>
            <Link to={"/admin/journals/lokomotivenumber"}>Добавить номер локомотива</Link>
          </Li>
          <Li>
            <Link to={"/admin/journals/section"}>Добавить секцию</Link>
          </Li>
          <Li>
            <Link to={"/admin/journals/move"}>Добавить действие (что сделали)</Link>
          </Li>
          <Li>
            <Link to={"/admin/journals/blok"}>Добавить БЛОК</Link>
          </Li>
          <Li>
            <Link to={"/admin/journals/snyatnumber"}>Добавить номер снятия</Link>
          </Li>
          <Li>
            <Link to={"/admin/journals/postnumber"}>Добавить номер снятия</Link>
          </Li>
        </Ul>
      </Container>

      <Container>
        <ContainerTitle>Статистика</ContainerTitle>
        <Ul>
          <Li>
            <Link to={"/admin/users"}>Пользователи</Link>
          </Li>
          <Li>
            <Link to={"/admin/export"}>Экспорт</Link>
          </Li>
        </Ul>
      </Container>
    </MainLayout>
  );
});

export default Admin;
