import { FC, useEffect, useState } from "react";
import { CommentsJournal, PageProps, Response } from "../../../@types";
import { observer } from "mobx-react";
import { MainLayout } from "../../../@layouts";
import { Container, ContainerTitle } from "../../../@shared";
import $api from "../../../@http";
import { styled } from "styled-components";

const Table = styled.table`
  tbody {
    @media (max-width: 1400px) {
      tr {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #ccc;
      }
    }
  }
`;

const CheckCommentsJournal: FC<PageProps> = observer(({ title }) => {
  const [list, setList] = useState<CommentsJournal[]>([]);
  useEffect(() => {
    $api.get<Response<CommentsJournal[]>>("/commentsjournal/all").then(({ data }) => {
      setList(data.data!);
      console.log(data.data!);
    });
  }, [setList]);

  return (
    <MainLayout title={title}>
      <Container style={{ gap: 20, display: "flex", flexDirection: "column" }}>
        <ContainerTitle>Журнал замечаний локомотива</ContainerTitle>
        <Table>
          <tbody>
            <tr>
              <td>Начало</td>
              <td>Конец</td>
              <td>ПТОЛ</td>
              <td>Приписка</td>
              <td>Серия</td>
              <td>Номер ЛОК-ВА</td>
              <td>Секция</td>
              <td>Зам. в жур. ТУ-152</td>
              <td>Что сделали</td>
              <td>Система</td>
              <td>БЛОК</td>
              <td>Номер бирки снятия</td>
              <td>Снят №</td>
              <td>Срок ремонта снятого</td>
              <td>Пост №</td>
              <td>Примечание ПТОЛ</td>
              <td>ФИО</td>
            </tr>
            {list &&
              list.map(
                (e) =>
                  e && (
                    <tr key={e._id}>
                      <td>{e.start}</td>
                      <td>{e.finish}</td>
                      <td>{e.ptol.name}</td>
                      <td>{e.postscript.name}</td>
                      <td>{e.series.name}</td>
                      <td>{e.lokomotivenumber.name}</td>
                      <td>{e.section.name}</td>
                      <td>{e.replacement}</td>
                      <td>{e.journalmove.name}</td>
                      <td>{e.system.name}</td>
                      <td>{e.blok.name}</td>
                      <td>{e.numbermark}</td>
                      <td>{e.numberwithdraw}</td>
                      <td>{e.time}</td>
                      <td>{e.postnumber.name}</td>
                      <td>{e.noteptol}</td>
                      <td>
                        {e.user.name} {e.user.surname}
                      </td>
                    </tr>
                  ),
              )}
          </tbody>
        </Table>
      </Container>
    </MainLayout>
  );
});

export default CheckCommentsJournal;
